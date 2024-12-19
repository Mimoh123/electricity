import React, { useEffect, useState } from 'react';
import { Headers } from '@/components/data/TransactionData';
import { axiosInstance } from '../auth/config';
import { Icons } from '@/components/data/Icons';
import TransactionTable from '@/components/utils/TransactionTable';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';

import { toast } from 'sonner';
import { FaAngleDoubleRight } from 'react-icons/fa';
import SkeletonTable from '@/components/utils/SkeletonTable';
function TransactionHistory() {
  const [tableData, setTableData] = useState(null);
  const [page, setPage] = useState(1);
  const [showNoData, setShowNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(100);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setTableData(null);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('billing', {
          params: {
            page: page,
          },
        });

        setTableData(response.data.data);
        setMaxPage(response.data.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!tableData) {
        setShowNoData(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [tableData, page]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        if (page === 1) {
          toast.error('This is the first page');
        } else {
          setPage(page - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (page === maxPage) {
          toast.error('This is the last page');
        } else {
          setPage(page + 1);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [page, maxPage]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {};
  if (showNoData) {
    return (
      <div className='flex flex-col gap-y-8'>
        <h1 className='text-black text-2xl font-medium flex flex-1'>
          Transaction History
        </h1>
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
        <div className='text-gray-500 mt-8'>No data available</div>
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-y-8'>
      <h1 className='text-black text-2xl font-medium flex flex-1'>
        Transaction History
      </h1>
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
      {!tableData && <SkeletonTable headers={Headers} />}
      {tableData && (
        <TransactionTable headers={Headers} TableData={tableData.billings} />
      )}
      {/* {tableData && ( */}
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
    </div>
  );
}

export default TransactionHistory;
