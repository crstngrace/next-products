import { useState } from 'react';
import classNames from 'classnames';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import usePagination from '@/hooks/usePagination.hook';

export default function Pagination(props) {
  const {
    current,
    total,
    showAll = false,
    handleTablePageUpdate = () => {},
    isLoading
  } = props;

  const [sibling, setSibling] = useState(2);
  const pages = usePagination({ current, total, sibling, showAll });

  // Handles page click
  const handlePageNavigation = (pageNum) => {
    handleTablePageUpdate(pageNum);
  };

  // Handles previous page action
  const handlePrevPage = () => {
    handleTablePageUpdate(current - 1);
  };

  // Handles next page action
  const handleNextPage = () => {
    handleTablePageUpdate(current + 1);
  };

  return (
    <div
      className={classNames('flex gap-2 w-fit my-5 overflow-x-scroll', {
        'cursor-progress pointer-events-none': isLoading
      })}
    >
      <button
        onClick={handlePrevPage}
        disabled={current === 1 || total === 0}
        className='me-2'
      >
        <FaChevronLeft />
      </button>

      {pages?.length > 0 &&
        pages.map((pageNum, i) => {
          if (pageNum === -1) {
            return (
              <div key={'page-' + i} className='page-item pointer-events-none'>
                ...
              </div>
            );
          }

          return (
            <button
              key={'page-' + i}
              className={classNames('page-item', {
                'bg-blue-500 text-white': pageNum == current
              })}
              onClick={() => handlePageNavigation(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

      <button
        onClick={handleNextPage}
        disabled={current === total || total === 0}
        className='ms-2'
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
