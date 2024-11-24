// import * as XLSX from 'xlsx';
// export const exportToExcel = (data, filename) => {
//   console.log('Data from Download:', data);
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Electricity');
//   XLSX.writeFile(workbook, `${filename}.xlsx`);
// };

// export default function DownloadButton({ data, fileName }) {
//   const handleClick = () => {
//     exportToExcel(data, fileName);
//   };

//   return (
//     <button
//       onClick={() => {
//         handleClick();
//       }}
//       className='flex self-end border border-black p-2 items-center gap-1 rounded-lg'
//     >
//       {/* <Icons.GoDownload /> */}
//       <h1 className='text-sm'>Download Sheet</h1>
//     </button>
//   );
// }

import * as XLSX from 'xlsx';

const exportToCSV = (data, fileName) => {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `${fileName}.csv`);
  a.click();
};

export const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default function Download({ data, fileName }) {
  const handleCSVDownload = () => {
    exportToCSV(data, fileName || 'data');
  };

  const handleExcelDownload = () => {
    exportToExcel(data, fileName || 'data');
  };

  return (
    <div className='flex gap-3'>
      <button
        className='font-normal text-[14px] flex items-center gap-2'
        onClick={handleCSVDownload}
      >
        {' '}
        Export as CSV
      </button>
      <button
        className='font-normal text-[14px] flex items-center gap-2'
        onClick={handleExcelDownload}
      >
        {' '}
        Export as Excel
      </button>
    </div>
  );
}
