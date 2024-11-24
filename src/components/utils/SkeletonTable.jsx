import React from 'react';
import { Skeleton } from '../ui/skeleton';

const SkeletonTable = ({ headers }) => {
  // Number of rows to show in the skeleton loader
  const rows = 10;

  return (
    <div className='w-full h-full overflow-y-auto'>
      <table className='w-full h-full overflow-y-auto border-collapse'>
        <thead>
          <tr className=''>
            {headers.map((header, index) => (
              <th className='border-b-2   border-gray-50 p-2' key={index}>
                <Skeleton className='w-full h-5 bg-gray-100' />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Generate 10 rows of skeleton data */}
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className='border-b-2 border-gray-100 text-gray-500 p-3 relative text-center font-semibold text-sm'
                  >
                    <Skeleton className='w-full h-6 bg-gray-100' />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
