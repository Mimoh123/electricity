import { useEffect, useState } from 'react';
import { Icons } from '../../components/data/Icons';
import { axiosInstance } from '../auth/config';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';

function ViewDetailsTransaction() {
  const nagivate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState([]);
  console.log(id);
  useEffect(() => {
    const getTransactionDetails = async () => {
      const response = await axiosInstance.get(`billing/${id}`);
      console.log(response);
      setBill(response.data.data.billing);
      setLoading(false);
    };
    getTransactionDetails();
  }, []);
  useEffect(() => {
    console.log('details map', bill);
  });
  const detailsMap = {
    // CName: bill.customer.name || '',
    'Transaction ID': bill._id || '',
    Name: bill.customer ? bill.customer.name : '',
    Date: bill.billingDate || '',
    Amount: bill.totalAmount || '',
    'Payment Method': bill.paymentMethod,
    Status: bill.status,
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
      <div className='flex flex-col items-center justify-between'>
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
