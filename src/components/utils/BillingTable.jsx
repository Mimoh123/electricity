import { useEffect, useState } from 'react';
import { Icons } from '../data/Icons';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { ImCross } from 'react-icons/im';
import { axiosInstance } from '@/pages/auth/config';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '@/Excel/ExportToExcel';

const BillingTable = ({ billingData }) => {
  const navigate = useNavigate();
  const headers = ['Service', 'Rate', 'Fine', 'Min. Charge', 'Action'];
  const [tableData, setTableData] = useState([]);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setTableData(billingData);
    const exportingData = billingData.map((data) => ({
      Service: `${data.meterRates[0].meterType}/${data.meterRates[0].customerType}`,
      Rate: data.meterRates[0].baseRate,
      Fine: data.meterRates[0].fine,
      'Minimum Charge': data.meterRates[0].minimumCharge,
    }));
    setData(exportingData);
  }, [billingData]);

  const handleEditDetails = (id) => {
    navigate(`/billing-rate-settings/edit-meter-rate/${id}`, {
      state: { id: id },
    });
  };

  return (
    <div className='flex flex-col items-center flex-1 gap-4'>
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
                      `/meter-Rate/${selectedItemId}`
                    );

                    toast.success('Deleted Successfully', {
                      description: ' Customer deleted Succesfully',
                    });
                    setSelectedItemId(null);
                    setIsDialogOpen(false);
                    setTimeout(() => {
                      location.reload();
                    }, 1000);
                  } catch (error) {
                    toast.error('Failed to Deleted ', {
                      description: 'Failed to delete Meter Rate',
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
            {headers.map((header, index) => (
              <th
                className='border-b-2 font-bold border-gray-100 p-2 relative text-center  text-base'
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {billingData.map((data, index) => (
            <tr key={index}>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.meterRates[0].meterType}/{data.meterRates[0].customerType}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.meterRates[0]?.baseRate}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.meterRates[0]?.fine}
              </td>
              <td className='border-b-2 border-gray-100 text-gray-500 p-4 relative text-center font-semibold text-sm'>
                {data.meterRates[0]?.minimumCharge}
              </td>
              <td
                className='border-b-2 text-center border-gray-100 text-gray-500 p-4 
               relative font-semibold '
              >
                <h1 className='w-full flex justify-center'>
                  <FaRegEdit
                    className='  hover:cursor-pointer '
                    onClick={() => {
                      handleEditDetails(data._id);
                    }}
                  />
                </h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          exportToExcel(data, 'billing and rate');
        }}
        className='flex fixed bottom-10 right-[7.2rem] bg-green-700 text-white hover:opacity-70  py-3 px-5 items-center gap-1 rounded-lg'
      >
        <Icons.GoDownload />
        <h1 className='text-sm'>Download Sheet</h1>
      </button>
    </div>
  );
};

export default BillingTable;
