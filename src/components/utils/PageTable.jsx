/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Icons } from '../data/Icons';
import ViewDetails from '../../pages/utils/ViewDetails';
import EditDetails from '../../pages/utils/EditDetails';
import { axiosInstance } from '../../pages/auth/config';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { ImCross } from 'react-icons/im';
import { exportToExcel } from '@/Excel/ExportToExcel';
import { LiaQrcodeSolid } from 'react-icons/lia';
const PageTable = ({
  giveQr,
  TableData,
  headers,
  handleOpenDiv,
  getCustomerId,
  handleQrDiv,
}) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log('The table data is', TableData.customersWithInfo);
  console.log('TableDATAA', TableData.customersWithInfo);
  const [tableData, setTableData] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if TableData.customersWithInfo exists
    if (TableData.customersWithInfo) {
      // Transform the customer data to the format you want
      const formattedData = TableData.customersWithInfo.map((customer) => ({
        Name: customer.name,
        Address: customer.address,
        ConsumerId: customer.consumerId,
        ScNo: customer.scNumber,
        LastPay: customer.lastPayDate,
        'Previous Pay': customer.previousAmount,
      }));

      // Set the transformed data into the state
      setData(formattedData);
    }
  }, [TableData]);

  const handleViewDetails = (id) => {
    navigate(`/customer-management/details/${id}`, { state: { id: id } });
  };
  const handleEditDetails = (id) => {
    navigate(`/customer-management/edit-details/${id}`, { state: { id: id } });
  };
  const handleQrView = (name) => {
    navigate(`/customer-management/Qr-view/${name}`, { state: { name: name } });
  };
  useEffect(() => {
    console.log('This is the data to be exported', data);
  }, [data]);
  useEffect(() => {
    setTableData(TableData.customersWithMeterInfo);
  }, [TableData]);
  useEffect(() => {
    console.log('selected data to delete', selectedItemId);
  }, [selectedItemId]);
  useEffect(() => {
    console.log('customer to be deleted', selectedItemId);
  }, [selectedItemId]);
  const handleThreeDots = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='flex relative flex-col items-center flex-1 gap-4'>
      {/* {isDialogOpen && (
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
                    // setTimeout(() => {
                    //   location.reload();
                    // }, 2000);
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
      )} */}
      <table className='w-full h-full overflow-y-auto border-collapse'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th className='border-b-2 border-gray-50 p-2' key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TableData.customersWithInfo.map((data, index) => (
            <tr className='' key={index}>
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
                className='border-b-2 border-gray-100 text-gray-500 p-4 hover:cursor-pointer relative text-center font-semibold text-sm'
              >
                {/* {data.qr} */}
                <h1 className='flex justify-center'>
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
                {data.previousAmount ? 'Yes' : 'No'}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.unpaidAmount}
              </td>
              <td
                className='border-b-2 border-gray-100 p-4 relative text-gray-500 text-center text-sm hover:cursor-pointer'
                onClick={() => handleThreeDots(index)}
              >
                <Icons.BsThreeDotsVertical className='text-center w-full' />
                {openDropdownIndex === index && (
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
                          // setIsDialogOpen(true);
                          // setSelectedItemId(data._id);
                          handleOpenDiv(true);
                          getCustomerId(data._id);
                        }}
                        // onClick={async () => {
                        //   axiosInstance.delete(
                        //     `/customer-management/customer/${data._id}`
                        //   );
                        // }}
                        // onClick={() => {
                        //   setSelectedItemId(data._id); // Set the selected item ID for deletion
                        //   setIsDialogOpen(true); // Open the dialog
                      >
                        Delete
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
        onClick={() => {
          exportToExcel(data, 'sjeet1');
          console.log(data);
        }}
        className='flex fixed bottom-10 right-16 bg-green-700 py-3 px-5 text-white hover:opacity-70 items-center gap-1 rounded-lg'
      >
        <Icons.GoDownload />
        <h1 className='text-sm'>Download Sheet</h1>
      </button>
    </div>
  );
};

export default PageTable;
