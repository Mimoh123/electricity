import React, { useEffect, useState } from 'react';
import { Headers } from '@/components/data/TransactionData';
import { axiosInstance } from '../auth/config';
import { Icons } from '@/components/data/Icons';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import TransactionTable from '@/components/utils/TransactionTable';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function CustomerBills() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name } = location.state || '';
  console.log(location.state);
  const [search, setSearch] = useState('');
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [page, setPage] = useState(1);
  const handleSearch = () => {};
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDate = ({ bsDate, adDate }) => {
    setStartDate({ date: bsDate });
  };
  const handleEndDate = ({ bsDate, adDate }) => {
    setStartDate({ date: bsDate });
  };
  // const fetchBills = async () => {
  //   try {
  //     const response = axiosInstance.get(
  //       `/billing/history/${id}?startData=${startDate}&endDate=${endDate}`
  //     );
  //     setTableData(response.data);
  //   } catch {}
  // };
  // useEffect(() => {
  //   fetchBills();
  // }, [startDate, endDate]);
  useEffect(() => {
    console.log('Dates', startDate);
    console.log('dates', endDate);
  }, [startDate, endDate]);
  return (
    <div className='flex flex-col gap-y-8'>
      <div className='flex items-center space-x-3'>
        <Icons.FiChevronLeft
          className='hover:cursor-pointer'
          onClick={() => {
            navigate(-1);
          }}
          size='24px'
        />
        <h1 className='text-black text-2xl font-medium flex flex-1'>
          Customer Bills
        </h1>
      </div>

      <div className='flex justify-between'>
        <div className='border flex items-center bg-white justify-between w-3/4 px-4 rounded-lg'>
          <input
            className='w-full p-2 outline-none'
            placeholder='Search'
            onChange={handleChange}
          />
          <Icons.GoSearch onClick={handleSearch} size='20px' />
        </div>
      </div>
      <div className='flex space-x-10'>
        <section className='flex space-y-3 flex-col'>
          <span className='text-lg font-medium'>Start Date :</span>
          <Calendar
            onChange={handleDate}
            className=' bg-[#e6e6fa] border-2 border-white shadow-sm rounded-lg p-2 hover:cursor-pointer'
            language='en'
            theme='default'
          />
        </section>

        <section className='flex space-y-3 flex-col'>
          <span className='text-lg font-medium'>End Date :</span>
          <Calendar
            onChange={handleEndDate}
            className=' bg-[#e6e6fa] border-2 border-white shadow-sm rounded-lg p-2 hover:cursor-pointer'
            language='en'
            theme='default'
          />
        </section>
      </div>
      <section>
        <h1>{`Name : ${name}`}</h1>
      </section>
      {!tableData && <SkeletonTable headers={Headers} />}

      {/* {tableData && (
        <TransactionTable headers={Headers} TableData={tableData.billings} />
      )} */}
      {/* {tableData && ( */}
      <div className='w-full flex items-center justify-center'>
        <section className='w-full  flex  items-center justify-center'>
          <button
            onClick={() => {
              setPage(1);
            }}
            className='border border-gray-400 shadow-lg mr-2 p-2 rounded-xl hover:opacity-65'
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
            className='border border-gray-400 shadow-lg mr-2 p-2 rounded-xl hover:opacity-65'
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
            className='border border-gray-400 shadow-lg ml-2 p-2 rounded-xl hover:opacity-65'
          >
            <FaChevronRight className='text-gray-500  hover:cursor-pointer' />
          </button>
          <button
            onClick={() => {
              setPage(maxPage);
            }}
            className='border border-gray-400 shadow-lg ml-2 p-2 rounded-xl hover:opacity-65'
          >
            <FaAngleDoubleRight
              size={'17px'}
              className='text-gray-500 font-bold hover:cursor-pointer'
            />
          </button>
        </section>
      </div>
    </div>
  );
}

export default CustomerBills;
