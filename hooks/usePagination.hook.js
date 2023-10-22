import { useMemo } from 'react';
import useRange from '@/hooks/useRange.hook';

/*
 * Hook for pagination
 */
export default function usePagination(props) {
  const { current, total, sibling, showAll } = props;

  const getPages = useMemo(() => {
    let pageArr = useRange(1, total);
    const leftSibling = Math.max(current - sibling, 1);
    const rightSibling = Math.min(current + sibling, total);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 2;
    const itemCount = 2 * sibling + 3;

    if (showAll) {
      return pageArr;
    }

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = useRange(1, itemCount);

      pageArr = [...leftRange, -1, total];
    } else if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = useRange(total - itemCount + 1, total);

      pageArr = [1, -1, ...rightRange];
    } else if (showLeftEllipsis && showRightEllipsis) {
      let middleRange = useRange(leftSibling, rightSibling);

      pageArr = [1, -1, ...middleRange, -1, total];
    }

    return pageArr;
  }, [current, total, sibling]);

  return getPages;
}
