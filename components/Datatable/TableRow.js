import React from 'react';

export default function TableRow(props) {
  const { rowData, headers, handleRowClick } = props;

  return (
    <tr
      className='hover:bg-gray-50 max-sm:flex max-sm:flex-col min-h-52 cursor-pointer'
      onClick={() => {
        handleRowClick(rowData);
      }}
    >
      {headers?.length > 0 &&
        headers.map(({ key, value }, i) => (
          <td key={key}>{value ? value(rowData, i + 1) : rowData[key]}</td>
        ))}
    </tr>
  );
}
