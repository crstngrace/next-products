import TableRow from '@/components/Datatable/TableRow';

export default function TableContent(props) {
  const {
    headers,
    data,
    search,
    numItems,
    handleRowClick,
    isFetching,
    isSearching,
    isLoading
  } = props;

  return (
    <div className='min-h-96'>
      <table className='custom-table'>
        <thead className='max-sm:hidden'>
          <tr className='bg-gray-300'>
            {headers?.length > 0 &&
              headers.map(({ key, title, width }, i) => (
                <th width={width} key={key}>
                  {title}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {!isFetching &&
            data?.length > 0 &&
            data.map((rowData, i) => (
              <TableRow
                headers={headers}
                rowData={rowData}
                handleRowClick={handleRowClick}
                key={'product-' + rowData.id}
              />
            ))}

          {!isFetching && data?.length === 0 && (
            <tr>
              <td colSpan={3}>
                {search
                  ? 'No products matched your search keyword.'
                  : 'No results found'}
              </td>
            </tr>
          )}

          {isSearching && (
            <tr>
              <td colSpan={3}>Searching...</td>
            </tr>
          )}

          {isLoading &&
            Array.from(Array(numItems), (el, i) => (
              <tr key={'loader-' + i} className='max-sm:flex max-sm:flex-col'>
                <td>
                  <div className='flex items-center h-48 sm:h-20 justify-center bg-gray-300  dark:bg-gray-700'>
                    <svg
                      className='w-10 h-20 max-sm:h-48 text-gray-200 dark:text-gray-600'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 18'
                    >
                      <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                    </svg>
                  </div>
                </td>
                <td>
                  <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4 mb-4'></div>
                  <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5'></div>
                  <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px]  mb-2.5'></div>
                </td>
                <td>
                  <div className='w-full'>
                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4'></div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
