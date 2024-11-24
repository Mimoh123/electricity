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
    console.log('This is the view details id', id);
  };

  const handleThreeDots = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index)); // Toggle dropdown
  };
  // const [dataIn, setDataIn] = useState(data[0]);
  const [selectedItemEmail, setSelectedItemEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  console.log('this is the data passed in filtered employee', data);

  return (
    <div className='flex flex-col items-center flex-1 gap-4'>
      {/* {isAlertOpen && (
        <div className='shadow-2xl rounded-lg bg-white px-5 py-10 z-20 w-96 flex flex-col items-center absolute top-[20%]'>
          <ImCross
            className='cursor-pointer absolute right-5 top-5 text-sm font-medium'
            onClick={() => {
              setIsAlertOpen(false);
            }}
          />
          <h1 className='mt-10 font-semibold text-sm mb-5'>
            Your new password has been sent to your email
          </h1>
          <h1 className='font-bold text-xl'>{selectedItemEmail}</h1>
          <section className='flex w-full justify-center mt-5'>
          
          </section>
        </div>
      )} */}

      {/* {isDialogOpen && (
        <div className='shadow-2xl rounded-lg bg-white px-5 py-10 z-20 w-96 flex flex-col items-center absolute top-[20%]'>
          <ImCross
            className='cursor-pointer absolute right-5 top-5 text-sm font-medium'
            onClick={() => {
              setIsDialogOpen(false);
            }}
          />
          <h1 className='font-bold text-xl'>Are you sure?</h1>
          <h1 className='mt-10 font-semibold text-sm mb-5'>
            You want to reset password?
          </h1>
          <section className='flex w-full justify-between mt-5'>
            <Button
              className='w-1/2 mr-2 bg-white text-black hover:bg-white hover:brightness-150'
              onClick={() => {
                setIsDialogOpen(false);
                setSelectedItemEmail('');
              }}
            >
              No
            </Button>
            <Button
              className='w-1/2 bg-blue-500 hover:bg-blue-500 hover:brightness-125'
              onClick={async () => {
                try {
                  const response = await axiosInstance.post(`/employee/reset`, {
                    emailOrPhone: selectedItemEmail,
                  });
                  console.log(response);
                  toast.success('Successfully reset Password', {
                    description: 'Password reset successfully',
                  });
                  setIsDialogOpen(false);
                  setIsAlertOpen(true);
                } catch (error) {
                  console.log(error);
                  toast.error('Failed to Reset password ', {
                    description: 'Failed to Reset Password',
                  });
                }
              }}
            >
              Yes
            </Button>
          </section>
        </div>
      )} */}

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
                        console.log('View details', data.id);
                      }}
                    >
                      <li className='px-4 font-normal py-2 hover:bg-gray-200 cursor-pointer'>
                        View Details
                      </li>
                    </button>
                    <button
                      className='px-4 w-full py-2 font-normal hover:bg-gray-200 cursor-pointer'
                      onClick={() => {
                        console.log(data[0].email);
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
