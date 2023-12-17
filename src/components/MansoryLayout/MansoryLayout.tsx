import { useWindowWidth } from '@/hooks/useWindowWidth';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { StyledHiddenSection, StyledMansoryColumn, StyledMansoryLayout } from './styled';
import ReactDOM from 'react-dom';

interface Props {
  totalColumns: number;
  gap: number; // px
  // enable this to arrange items properly. Otherwise, just put item to columns by default order of props.
  optimizeItemOrders?: boolean;
  // we will use mobile first approach to responsive mansory layout.
  breakpoints?: Record<number /*window width*/, number /*total columns*/>;
  children: ReactNode;
}

const MansoryLayout = ({ totalColumns, optimizeItemOrders, gap, breakpoints, children }: Props) => {
  const [columnsCount, setColumnsCount] = useState<number>(totalColumns);
  const windowWidth = useWindowWidth();
  const [childrenHeights, setChildrenHeights] = useState<number[]>([]);

  useEffect(() => {
    Promise.all(
      React.Children.map(children, async (child: any) => {
        const tempDiv = document.createElement('div');
        document.body.appendChild(tempDiv);

        await new Promise((resolve) => {
          ReactDOM.render(
            <StyledHiddenSection>
              {React.cloneElement(child as any, {
                ...(child?.type === 'img' // with img element, we cant measure height until it fully loaded
                  ? { onLoad: (e) => resolve(e.currentTarget.clientHeight) }
                  : {}),
                ...(child?.type !== 'img' ? { ref: (ref: any) => resolve(ref) } : {}),
              })}
            </StyledHiddenSection>,
            tempDiv,
          );
        });

        // After the promise resolves, the child is fully rendered
        const height: number = (tempDiv?.firstChild as any)?.clientHeight || 0;

        document.body.removeChild(tempDiv);

        return height;
      }) as Promise<number>[],
    ).then((values) => setChildrenHeights(values));
  }, [children]);

  useEffect(() => {
    if (breakpoints) {
      const acsBreakpointWidths = Object.keys(breakpoints)
        .map((w) => Number(w))
        .sort((a, b) => a - b);
      for (const breakpointWidth of acsBreakpointWidths) {
        if (windowWidth >= breakpointWidth) {
          setColumnsCount(breakpoints[breakpointWidth]);
        } else break;
      }
    }
  }, [windowWidth, breakpoints]);

  const findIndexOfShortestColumn = (columnHeights: number[]) => {
    let minHeight = 99999;
    let minIndex = 0;
    for (let columnIndex = 0; columnIndex < columnHeights.length; columnIndex++) {
      if (columnHeights[columnIndex] <= minHeight) {
        minHeight = columnHeights[columnIndex];
        minIndex = columnIndex;
      }
    }
    console.log(columnHeights, minIndex);
    return minIndex;
  };

  const unsortedColumns = useMemo(() => {
    const columns: Array<any> = Array.from({ length: columnsCount }, () => []);
    React.Children.forEach(children, (child, index) => {
      if (child && React.isValidElement(child)) {
        columns[index % columnsCount].push(child);
      }
    });
    return columns.map((column, index) => (
      <StyledMansoryColumn
        gap={gap}
        key={index}
      >
        {column.map((item: any) => item)}
      </StyledMansoryColumn>
    ));
  }, [columnsCount, children]);

  const sortedColumns = useMemo(() => {
    if (!optimizeItemOrders) return null;
    if (!childrenHeights.every((height) => Boolean(height))) return null;

    // Prepare data for arranging column's items
    const columns: Array<any> = Array.from({ length: columnsCount }, () => []);
    const columnHeights: Array<number> = Array(columnsCount).fill(0);
    const childArr = React.Children.toArray(children);

    // assign item index to columns by Longest Process - Time First algo
    let shortestColumnIndex = findIndexOfShortestColumn(columnHeights);
    for (let i = 0; i < childrenHeights.length; i++) {
      const height = childrenHeights[i];
      columns[shortestColumnIndex].push(childArr[i]);
      columnHeights[shortestColumnIndex] = columnHeights[shortestColumnIndex] + height;
      // re-find shortest column
      shortestColumnIndex = findIndexOfShortestColumn(columnHeights);
    }

    // shuffle column's items for aesthetic reason
    for (const column of columns) {
      for (let k = 1; k < column.length; ++k) {
        const i = Math.floor((k + 1) * Math.random());
        let temp = column[i];
        column[i] = column[k];
        column[k] = temp;
      }
    }

    return columns.map((column, index) => (
      <StyledMansoryColumn
        gap={gap}
        key={index}
      >
        {column.map((item: any) => item)}
      </StyledMansoryColumn>
    ));
  }, [columnsCount, optimizeItemOrders, children, childrenHeights]);

  return (
    <StyledMansoryLayout gap={gap}>
      {optimizeItemOrders ? sortedColumns || unsortedColumns : unsortedColumns}
    </StyledMansoryLayout>
  );
};

export default MansoryLayout;
