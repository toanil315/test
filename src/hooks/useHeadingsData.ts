import { useCallback, useEffect, useState } from 'react';

export interface NestedHeading {
  id: string;
  title: string;
  items: { id: string; title: string }[];
}

export const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('#content h2'));
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  const getNestedHeadings = useCallback((headingElements: Element[]) => {
    const nestedHeadings: NestedHeading[] = [];

    headingElements.forEach((heading, index) => {
      const { textContent: title, id } = heading;

      if (heading.nodeName === 'H2') {
        nestedHeadings.push({ id, title: title || '', items: [] });
      } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title: title || '',
        });
      }
    }, []);

    return nestedHeadings;
  }, []);

  return { nestedHeadings };
};
