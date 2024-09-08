import { useCallback, useEffect, useRef, useState } from "react";

export const useInfiniteScroll = (itemsPerPage = 50, totalCount) => {
  const [itemsCount, setItemsCount] = useState(itemsPerPage);
  const [hasMore, setHasMore] = useState(true);

  if (!totalCount) throw Error("Error: totalCount can't be undefined");

  useEffect(() => {
    if (itemsCount < totalCount) return;

    setHasMore(false);
  }, [itemsCount]);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !hasMore) return;
          setItemsCount((prev) => prev + 50);
        });
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, itemsCount]
  );

  return { lastElementRef, itemsCount };
};
