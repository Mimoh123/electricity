import { useState, useEffect } from 'react';
import { Icons } from '../data/Icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { axiosInstance } from '@/pages/auth/config';
import { exportToExcel } from '@/Excel/ExportToExcel';

const EmployeeTable = ({ TableData, headers, getSelectedEmail, handleDiv }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [data, setData] = useState();
  useEffect(() => {
    if (TableData) {
      const formattedData = TableData.map((item) => ({
        Name: item.name,
        'Assigned Region': item.assignedRegion,
        Status: item.status,
        Readings: item.totalReading,
        'Cash collected': item.cashCollected ? item.cashCollected : '',
      }));

      setData(formattedData);
    }
  }, [TableData]);

  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/employee-management/view-employee-details/${id}`, {
      state: { id: id },
    });
  };
  const handleThreeDots = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const [selectedItemEmail, setSelectedItemEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  return (
    <div className='flex flex-col items-center flex-1 gap-4'>
      <table className='  w-full h-full overflow-y-auto'>
        <thead>
          <tr>
            {headers.map((data, index) => (
              <th className=' border-b-2 border-gray-100 p-2' key={index}>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TableData.map((data, index) => (
            <tr key={data.id}>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.name}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.assignedRegion}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.status}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.totalReading}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.cashCollected ? data.cashCollected : 0}
              </td>
              <td
                className='border-b-2  border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'
                onClick={() => {
                  handleThreeDots(index);
                }}
              >
                <Icons.BsThreeDotsVertical className='w-full text-center cursor-pointer' />
                {openDropdownIndex === index && (
                  <div className='absolute right-0 mt-2 w-32 bg-white border border-white rounded-lg shadow-lg z-10'>
                    <ul>
                      <button
                        className='w-full '
                        onClick={() => {
                          handleViewDetails(data.id);
                        }}
                      >
                        <li className='px-4 font-normal py-2 hover:bg-gray-200 cursor-pointer'>
                          View Details
                        </li>
                      </button>
                      <button
                        className='px-4 w-full py-2 font-normal hover:bg-gray-200 cursor-pointer '
                        onClick={() => {
                          // setIsDialogOpen(true);
                          // setSelectedItemEmail(data.email);
                          getSelectedEmail(data.email);
                          handleDiv(true);
                        }}
                      >
                        <li>Forget password</li>
                      </button>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className='flex fixed bottom-10 right-14 self-end border hover:opacity-70 bg-green-700 text-white px-5 py-3 items-center gap-1 rounded-lg'
        onClick={() => {
          exportToExcel(data, 'Employee');
        }}
      >
        <Icons.GoDownload />
        <h1 className='text-sm'>Download Sheet</h1>
      </button>
    </div>
  );
};

export default EmployeeTable;
