import { Icons } from '../../components/data/Icons';

import { useEffect, useState } from 'react';
import BillingTable from '../../components/utils/BillingTable';
import { axiosInstance } from '../auth/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import SkeletonTable from '@/components/utils/SkeletonTable';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FaAngleDoubleRight } from 'react-icons/fa';

const BillingRateSettings = () => {
  const headers = ['Service', 'Rate', 'Fine', 'Min. Charge', 'Action'];
  const [tableData, setTableData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    setTableData(null);
    const FetchingMeterdata = async () => {
      axiosInstance
        .get('/meter-rate')
        .then((response) => {
          setIsLoading(false);
          setMaxPage(response.data.data.totalPages);

          setTableData(response.data.data.meterRates);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    FetchingMeterdata();
  }, []);

  const handleAddNewField = () => {
    setIsModalOpen(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.get(
      `/meter-Rate/rate/search?customerType=${query}`
    );
    console.log('this is the response', response);

    if (response.data.data.totalMeterRate > 1) {
      setTableData(response.data.data.meterRate);
    }
    if (response.data.data.totalMeterRate == 0) {
      toast.error('Meter type not found', {
        description: 'The meter type you searched is not available',
      });
    }
    if (response.data.data.totalMeterRate == 1) {
      setTableData(response.data.data.meterRate);
    }
  };

  return (
    <div className='flex flex-col gap-y-8'>
      <h1 className='text-black text-2xl font-medium flex flex-1'>
        Billing and Rate Settings
      </h1>
      <div className='flex justify-between'>
        <form className='w-3/4' onSubmit={handleSearch}>
          <div className='border flex items-center w-full bg-white justify-between py-1 px-4 rounded-lg'>
            <input
              className='w-full p-2 outline-none'
              placeholder='Enter Customer Type'
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button type='submit'>
              <Icons.GoSearch size='20px' />
            </button>
          </div>
        </form>
        <section className=' flex justify-around w-1/6 '>
          <button
            onClick={() => {
              navigate('/billing-rate-settings/add-meter-rate');
            }}
            className='flex pb-2 bg-green-700 hover:opacity-70 text-white w-16 justify-center rounded-md text-4xl  font-thin '
          >
            +
          </button>
        </section>
      </div>
      {!tableData && <SkeletonTable headers={headers} />}
      {tableData ? <BillingTable billingData={tableData} /> : ''}
      {tableData && (
        <div className='w-full flex items-center justify-center'>
          <section className='w-full  flex  items-center justify-center'>
            <button
              onClick={() => {
                setPage(1);
              }}
              className='border border-gray-400 shadow-lg mr-2 p-2 rounded-xl'
            >
              <FaAngleDoubleLeft
                size={'17px'}
                className='text-gray-500 hover:cursor-pointer'
              />
            </button>

            <button
              onClick={() => {
                if (page == 1) {
                  toast.error('This is the first page');
                } else {
                  setPage(page - 1);
                }
              }}
              className='border border-gray-400 shadow-lg mr-2 p-2 rounded-xl'
            >
              <FaChevronLeft className='text-gray-500 hover:cursor-pointer' />
            </button>
            <h1 className='font-semibold mx-4 text-gray-500'>{page}</h1>
            <button
              onClick={() => {
                if (page !== maxPage) {
                  setPage(page + 1);
                } else {
                  toast.error('No more pages to load');
                }
              }}
              className='border border-gray-400 shadow-lg ml-2 p-2 rounded-xl'
            >
              <FaChevronRight className='text-gray-500  hover:cursor-pointer' />
            </button>
            <button
              onClick={() => {
                setPage(maxPage);
              }}
              className='border border-gray-400 shadow-lg ml-2 p-2 rounded-xl'
            >
              <FaAngleDoubleRight
                size={'17px'}
                className='text-gray-500 font-bold hover:cursor-pointer'
              />
            </button>
          </section>
        </div>
      )}
      {!isLoading && (
        <section className=' flex justify-around w-1/6 '>
          <button
            onClick={() => {
              navigate('/billing-rate-settings/add-meter-rate');
            }}
            className='flex bg-green-700 pb-2 text-white w-16 justify-center rounded-md text-4xl  font-thin '
          >
            +
          </button>
        </section>
      )}
    </div>
  );
};

export default BillingRateSettings;
