import Pagination from '@/components/Pagination';

export default function TableFooter(props) {
  const {
    limit,
    handleLimitChange,
    totalPages,
    currentPage,
    handleTablePageUpdate,
    isFetching
  } = props;

  return (
    <div className='md:flex items-center justify-between'>
      <div>
        <label className='mr-3'>Limit</label>
        <select
          onChange={handleLimitChange}
          className='border rounded pl-2 py-1'
          value={limit}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={0}>All</option>
        </select>
      </div>

      <Pagination
        total={totalPages}
        current={currentPage}
        handleTablePageUpdate={handleTablePageUpdate}
        isLoading={isFetching}
      />
    </div>
  );
}
