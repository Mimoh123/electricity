import { useEffect, useState } from 'react';
import { Icons } from '../../components/data/Icons';
import { axiosInstance } from '../auth/config';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IoIosPrint } from 'react-icons/io';
import Spinner from './Spinner';

function ViewDetailsTransaction() {
  const nagivate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState([]);

  useEffect(() => {
    const getTransactionDetails = async () => {
      const response = await axiosInstance.get(`billing/${id}`);

      setBill(response.data.data.billing);
      setLoading(false);
    };
    getTransactionDetails();
  }, []);

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
        <button
          className='border bg-blue-500 text-white px-2 rounded-lg w-20 flex items-center'
          onClick={() => {
            handlePrint(bill.customer.id);
          }}
        >
          <IoIosPrint />
          <h1 className='p-2'>Print</h1>
        </button>
      </div>

      <div className='flex flex-col mt-10 p-4'>
        {Object.entries(detailsMap).map(([label, value], index) => (
          <div className='flex items-center p-4' key={index}>
            <label className='font-bold text-lg w-32'>{label}</label>
            <span className='mx-20'>
              <Icons.BsThreeDotsVertical />
            </span>
            <span className='text-lg text-gray-600 '>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewDetailsTransaction;
