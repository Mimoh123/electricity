import { useState } from 'react';
import { Icons } from '../data/Icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ImCross } from 'react-icons/im';
import { Button } from '../ui/button';
import { axiosInstance } from '@/pages/auth/config';
import { LiaQrcodeSolid } from 'react-icons/lia';

const FilteredCustomer = ({
  giveQr,
  getCustomerId,
  handleOpenDiv,
  data,
  headers,
  handleQrDiv,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  console.log('tabledata', data);
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/customer-management/details/${id}`, { state: { id: id } });
  };
  const handleEditDetails = (id) => {
    navigate(`/customer-management/edit-details/${id}`, { state: { id: id } });
  };
  const handleThreeDots = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };
  const [selectedItemId, setSelectedItemId] = useState(null);
  // const [selectedItemEmail, setSelectedItemEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setisAlertOpen] = useState(false);
  return (
    <div className='flex flex-col items-center flex-1 gap-4'>
      {/* {isAlertOpen && (
        <div className=' shadow-2xl rounded-lg bg-white px-5 py-10 z-20 w-96 flex flex-col items-center absolute top-[20%]'>
          <ImCross
            className='cursor-pointer absolute right-5 top-5 text-sm font-medium'
            onClick={() => {
              setisAlertOpen(false);
            }}
          />

          <h1 className=' mt-10 font-semibold text-sm mb-5'>
            Your new password has been sent to your email
          </h1>
          <h1 className='font-bold text-xl'>{selectedItemEmail}</h1>
          <section className='flex w-full justify-center mt-5'> */}
      {/* <Button
              className=' bg-[#C7808080] font-bold text-base   text-black hover:bg-[#C7808080] hover:brightness-150'
              onClick={() => {
                setisAlertOpen(false);
              }}
            >
              Ok
            </Button> */}
      {/* </section>
        </div>
      )} */}
      {isDialogOpen && (
        <div className=' shadow-2xl rounded-lg bg-white px-5 py-10 z-20 w-96 flex flex-col items-center absolute top-[20%]'>
          <ImCross
            className='cursor-pointer absolute right-5 top-5 text-sm font-medium'
            onClick={() => {
              setIsDialogOpen(false);
            }}
          />

          <h1 className='font-bold text-xl'>Are you sure?</h1>
          <h1 className=' mt-10 font-semibold text-sm mb-5'>
            You want to delete?
          </h1>
          <section className='flex w-full justify-between mt-5'>
            <Button
              className='w-1/2  mr-2 bg-white text-black hover:bg-white hover:brightness-150'
              onClick={() => {
                setIsDialogOpen(false);
                setSelectedItemId(null);
              }}
            >
              No
            </Button>
            <Button
              className='w-1/2 bg-blue-500 hover:bg-blue-500 hover:brightness-125'
              onClick={() => {
                const deleteData = async () => {
                  try {
                    const response = await axiosInstance.delete(
                      `/customer/${selectedItemId}`
                    );
                    console.log(response);
                    toast.success('Deleted Successfully', {
                      description: ' Customer deleted Succesfully',
                    });
                    setSelectedItemId(null);
                    setIsDialogOpen(false);
                    setTimeout(() => {
                      location.reload();
                    }, 2000);
                  } catch (error) {
                    console.log(error);
                    toast.error('Failed to Deleted ', {
                      description: 'Failed to delete Customer',
                    });
                  }
                };
                deleteData();
                // location.reload();
              }}
            >
              Yes
            </Button>
          </section>
        </div>
      )}
      <table className='w-full h-full overflow-y-auto'>
        <thead>
          <tr>
            {headers.map((data, index) => (
              <th className='border-b-2 border-gray-100 p-2' key={index}>
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className='' key={data.id}>
            {' '}
            {/* Assuming 'data' has a unique 'id' */}
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.name}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.address}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.consumerId}
            </td>
            <td
              onClick={() => {
                handleQrDiv(true);
                giveQr(data.meterBox.meterNumber);
              }}
              className='hover:cursor-pointer border-b-2 text-center border-gray-100 text-gray-500 p-4 relative font-semibold text-sm'
            >
              <h1 className='w-full flex  justify-center'>
                <LiaQrcodeSolid size={20} />
              </h1>
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.scNumber}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.lastPayDate}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.previousAmount}
            </td>
            <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
              {data.unpaidAmount}
            </td>
            <td
              className='border-b-2 border-gray-100 p-4 relative text-gray-500 text-center text-sm hover:cursor-pointer'
              onClick={() => handleThreeDots(0)} // Pass 0 since we have just one data object
            >
              <Icons.BsThreeDotsVertical className='text-center w-full' />
              {openDropdown === 0 && ( // Check for dropdown toggle for this single row
                <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
                  <ul>
                    <button
                      className='px-4 w-full py-2 hover:bg-gray-200 cursor-pointer'
                      onClick={() => {
                        handleViewDetails(data._id);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className='px-4 py-2 w-full hover:bg-gray-200 cursor-pointer'
                      onClick={() => {
                        handleEditDetails(data._id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className='px-4 py-2 w-full hover:bg-gray-200 cursor-pointer'
                      onClick={() => {
                        handleOpenDiv(true);
                        getCustomerId(data._id);
                        // setIsDialogOpen(true);
                        // setSelectedItemId(data._id);
                      }}
                    >
                      Delete
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

export default FilteredCustomer;
