import { useEffect, useState } from 'react';
import { Icons } from '../data/Icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ImCross } from 'react-icons/im';
import { Button } from '../ui/button';
import { axiosInstance } from '@/pages/auth/config';

const FilteredEmployee = ({ data, headers, getSelectedEmail, handleDiv }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/employee-management/view-employee-details/${id}`, {
      state: { id: id },
    });
  };

  const handleThreeDots = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index)); // Toggle dropdown
  };
  // const [dataIn, setDataIn] = useState(data[0]);
  const [selectedItemEmail, setSelectedItemEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <div className='flex flex-col items-center flex-1 gap-4'>
      <table className='w-full h-full overflow-y-auto'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th className='border-b-2 border-gray-100 p-2' key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={data.id}>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data[0].name}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data[0].assignedRegion}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data[0].status}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data[0].totalReading}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data[0].cashCollected}
            </td>
            <td
              className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'
              onClick={() => handleThreeDots(0)} // Pass 0 as index since there's only one row here
            >
              <Icons.BsThreeDotsVertical className='w-full text-center cursor-pointer' />
              {openDropdown === 0 && ( // Check if the dropdown for this row is open
                <div className='absolute right-0 mt-2 w-32 bg-white border border-white rounded-lg shadow-lg z-10'>
                  <ul>
                    <button
                      className='w-full'
                      onClick={() => {
                        handleViewDetails(data[0].id);
                      }}
                    >
                      <li className='px-4 font-normal py-2 hover:bg-gray-200 cursor-pointer'>
                        View Details
                      </li>
                    </button>
                    <button
                      className='px-4 w-full py-2 font-normal hover:bg-gray-200 cursor-pointer'
                      onClick={() => {
                        handleDiv(true);
                        getSelectedEmail(data[0].email);
                      }}
                    >
                      <li>Forget password</li>
                    </button>
                  </ul>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <button className='flex self-end border border-black p-2 items-center gap-1 rounded-lg'>
        <Icons.GoDownload />
        <h1 className='text-sm'>Download Sheet</h1>
      </button>
    </div>
  );
};

export default FilteredEmployee;
