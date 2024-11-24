/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Icons } from '../data/Icons';
import { axiosInstance } from '../../pages/auth/config';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { ImCross } from 'react-icons/im';
import { exportToExcel } from '@/Excel/ExportToExcel';
import Print from '@/Print/Print';
// const normalizeKeys = (data) => {
//   return data.map((item) => {
//     return {
//       name: item.name || item.Name,
//       address: item.address || item.Adress,
//       confirmation_id: item.confirmation_id || item["Confirmation ID"],
//       qr: item.qr || item.QR,
//       Sc_No: item.Sc_No || item["SC No."],
//       Last_pay_Day: item.Last_pay_Day || item["Last Pay Day"],
//       Prev_Payment: item.Prev_Payment || item["Prev. Payment"],
//       Unpaid_Amt: item.Unpaid_Amt || item["Unpaid Amt."],
//       Amt: item.Amt || item["Amt."],
//     };
//   });
// };

const TransactionTable = ({ TableData, headers }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log('TableDATAA', TableData);
  const [tableData, setTableData] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleViewDetails = (id) => {
    navigate(`/transaction-history/view-details/${id}`, { state: { id: id } });
  };
  const handlePrintDetails = (id) => {
    navigate(`/print-transaction/${id}`, { state: { id: id } });
  };
  useEffect(() => {
    // Check if TableData.customersWithInfo exists
    if (TableData) {
      // Transform the customer data to the format you want
      const formattedData = TableData.map((bill) => ({
        Name: bill.billing.customer ? bill.billing.customer.name : '',
        TID: bill.billing._id,
        BillingDate: bill.billing.billingDate,
        Amount: bill.billing.totalAmount,
        PaymentMethod: bill.billing.paymentMethod,
        Status: bill.billing.status,
      }));

      // Set the transformed data into the state
      setData(formattedData);
    }
  }, [TableData]);
  useEffect(() => {
    // const normalizedData = normalizeKeys(TableData);
    setTableData(TableData.customersWithMeterInfo);
  }, [TableData]);
  useEffect(() => {
    console.log('selected data to delete', selectedItemId);
  }, [selectedItemId]);

  const handleThreeDots = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='flex relative flex-col items-center flex-1 gap-4'>
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
          {TableData.map((data, index) => (
            <tr className='' key={index}>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.billing.customer ? data.billing.customer.name : ''}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.billing._id}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.billing.billingDate}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.billing.totalAmount}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.billing.paymentMethod}
              </td>

              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.billing.status}
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
                          handleViewDetails(data.billing.customer.id);
                        }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          handlePrintDetails(data.billing.customer.id);
                        }}
                        className='px-4 py-2 w-full hover:bg-gray-200 cursor-pointer'
                        // onClick={() => {
                        //   handleEditDetails(data._id);
                        // }}
                      >
                        Print Details
                      </button>
                      {/* 
                      <button
                        className='px-4 py-2 w-full hover:bg-gray-200 cursor-pointer'
                        onClick={() => {
                          setIsDialogOpen(true);
                          setSelectedItemId(data._id);
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
                      </button> */}
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
          exportToExcel(data, 'transactionHistory');
          console.log('data to be exported', data);
        }}
        className='flex fixed bottom-10 right-20 bg-green-700 hover:opacity-70 text-white  px-5 py-3 items-center gap-1 rounded-lg'
      >
        <Icons.GoDownload />
        <h1 className='text-sm'>Download Sheet</h1>
      </button>
    </div>
  );
};

export default TransactionTable;
