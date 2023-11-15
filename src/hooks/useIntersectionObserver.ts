import { ReactNode, useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  rootMargin: string,
  elementSelector: string,
  setActiveId: (id: string) => void,
) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if ((headingElement as any).isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          Number(getIndexFromId(a.target.id) > getIndexFromId(b.target.id)),
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin,
    });

    const headingElements = Array.from(document.querySelectorAll(elementSelector));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
};
