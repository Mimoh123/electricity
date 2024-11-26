import { useEffect, useState } from 'react';
import { Icons } from '@/components/data/Icons';
import { axiosInstance } from '@/pages/auth/config';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from '@/pages/utils/Spinner';
import { RxCross1 } from 'react-icons/rx';
import { IoIosPrint } from 'react-icons/io';
import '../index.css';

function Print() {
  const nagivate = useNavigate();
  const [isButtonShown, setIsButtonShown] = useState(true);
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
  useEffect(() => {
    const restoreButtonVisibility = () => {
      setIsButtonShown(true); // Restore the button visibility after printing
    };

    window.onafterprint = restoreButtonVisibility; // Listen to after print event
    return () => {
      window.onafterprint = null; // Clean up after component unmounts
    };
  }, []);
  const handlePrint = async () => {
    const waiting = await setIsButtonShown(false);
    window.print();
  };
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
      <div className='h-[100vh] w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='flex relative  items-center flex-col'>
      {isButtonShown && (
        <RxCross1
          onClick={() => {
            nagivate(-1);
          }}
          className='absolute top-8 right-16 hover:cursor-pointer'
          size={'30px'}
        />
      )}
      <div className='flex justify-center w-full mt-28 items-center'>
        <h1 className='text-2xl font-semibold '>Electricity bill</h1>
      </div>
      <div className='flex flex-col ml-24 mt-10 p-2'>
        {Object.entries(detailsMap).map(([label, value], index) => (
          <div className='flex items-center  p-4' key={index}>
            <label className='font-bold text-lg w-32'>{label}</label>
            <span className='mx-5'>
              <Icons.BsThreeDotsVertical />
            </span>
            <span className='text-lg text-gray-600 '>{value}</span>
          </div>
        ))}
      </div>
      {isButtonShown && (
        <button
          className='p-2 mt-10 flex items-center  bg-blue-600 text-white rounded-lg px-10'
          onClick={handlePrint}
        >
          <IoIosPrint />
          <h1 className='ml-2'> Print</h1>
        </button>
      )}
    </div>
  );
}

export default Print;
