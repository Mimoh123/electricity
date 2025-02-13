import { useEffect, useState } from 'react';
import { Icons } from '../../components/data/Icons';
import { axiosInstance } from '../auth/config';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IoIosPrint } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Spinner from './Spinner';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function EditBill() {
  const nagivate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    const getTransactionDetails = async () => {
      const response = await axiosInstance.get(`billing/${id}`);

      setBill(response.data.data.billing);
      setSelectedStatus(response.data.data.billing.status);
      setSelectedPaymentMethod(response.data.data.billing.paymentMethod);
      setLoading(false);
    };
    getTransactionDetails();
  }, []);
  const statusData = [{ name: 'paid' }, { name: 'unpaid' }];
  const paymentMethod = [{ name: 'cash' }, { name: 'QR' }];
  const detailsMap = {
    // CName: bill.customer.name || '',
    'Transaction ID': bill._id || '',
    Name: bill.customer ? bill.customer.name : '',
    Date: bill.billingDate || '',
    Amount: bill.totalAmount || '',
    'Payment Method': bill.paymentMethod,
    Status: bill.status,
  };
  const handlePrint = (id) => {
    nagivate(`/print-transaction/${id}`, { state: { id: id } });
  };
  const handleSave = async () => {
    try {
      await axiosInstance.put(`/billing/${bill._id}`, {
        paymentMethod: selectedPaymentMethod,
        status: selectedStatus,
      });
      toast.success('Updated successfully', {
        description: 'Payment method updated successfully',
      });
      // if (bill.status !== selectedStatus) {
      //   console.log('Updating status...');
      //   await axiosInstance.put(`/billing/${id}`, {
      //     status: selectedStatus,
      //   });
      //   toast.success('Updated successfully', {
      //     description: 'Status updated successfully',
      //   });
      // }

      // if (bill.paymentMethod !== selectedPaymentMethod) {
      //   console.log('Updating payment method...');
      //   await axiosInstance.put(`/billing/${id}`, {
      //     paymentMethod: selectedPaymentMethod,
      //   });
      //   toast.success('Updated successfully', {
      //     description: 'Payment method updated successfully',
      //   });
      // }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Update failed', {
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='flex justify-start w-full items-center'>
          <Icons.FiChevronLeft
            size='24px'
            className='hover:cursor-pointer'
            onClick={() => {
              nagivate(-1);
            }}
          />
          <h1 className='text-2xl font-semibold p-2'>
            View Transaction Details
          </h1>
        </div>
        <section className='flex items-center space-x-3'>
          <button
            className='border bg-blue-500 text-white px-2 rounded-lg w-20 flex justify-center items-center'
            onClick={() => {
              handleSave();
            }}
          >
            <h1 className='p-2'>Save</h1>
          </button>
          {/* <button
            className='border bg-blue-500 text-white px-2 rounded-lg w-20 flex items-center'
            onClick={() => {
              handleSave();
            }}
          >
            <IoIosPrint />
            <h1 className='p-2'>Print</h1>
          </button> */}
        </section>
      </div>

      <div className='flex flex-col mt-10 p-4'>
        {Object.entries(detailsMap).map(([label, value], index) => (
          <div className='flex items-center p-4' key={index}>
            <label className='font-bold text-lg w-32'>{label}</label>
            <span className='mx-20'>
              <Icons.BsThreeDotsVertical />
            </span>
            {label === 'Status' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='hover:bg-inherit flex justify-between text-lg border border-gray-400 p-1 rounded-md  w-28 bg-inherit text-gray-600 font-normal'
                    variant='outline'
                  >
                    <span>{selectedStatus}</span>
                    <MdKeyboardArrowDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  {statusData.map((status) => (
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedStatus(status.name);
                      }}
                    >
                      {status.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : label === 'Payment Method' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='hover:bg-inherit flex justify-between text-lg border border-gray-400 p-1 rounded-md  w-28 bg-inherit text-gray-600 font-normal'
                    variant='outline'
                  >
                    <span>{selectedPaymentMethod}</span>
                    <MdKeyboardArrowDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  {paymentMethod.map((status) => (
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedPaymentMethod(status.name);
                      }}
                    >
                      {status.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <span className='text-lg text-gray-600 '>{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditBill;
