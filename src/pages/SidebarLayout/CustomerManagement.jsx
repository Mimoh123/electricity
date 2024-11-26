/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from '../../components/data/Icons';
import PageTable from '../../components/utils/PageTable';
import { Headers } from '../../components/data/TableData';

import { useState, useEffect } from 'react';
import { axiosInstance } from '../auth/config';
import { FaAngleDoubleLeft } from 'react-icons/fa';

import { FaAngleDoubleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import FilteredCustomer from '@/components/utils/FilteredCustomer';
import DialogueComponent from '@/components/utils/DialogueComponent';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { toast } from 'sonner';
import SkeletonTable from '@/components/utils/SkeletonTable';

const CustomerManagement = () => {
  const [tableData, setTableData] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const [phoneNumberforSearch, setPhoneNumberForSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [meterData, setMeterData] = useState(null);

  const navigate = useNavigate();
  const [qrDiv, setQrDiv] = useState(false);
  const [qr, setQr] = useState();

  useEffect(() => {
    setTableData(null);
    const fetchData = async () => {
      axiosInstance
        .get('/customer/pagination', {
          params: {
            page,
          },
        })
        .then((response) => {
          setTableData(response.data.data);
          setMaxPage(response.data.data.totalPages);

          // console.log('Response', response);
          // console.log('TableData', tableData);
        })
        .catch((error) =>
          console.error('Error occured while fetching customer: ', error)
        );
    };
    fetchData();
  }, [page]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      const isInput = e.target.tagName === 'INPUT';
      if (isInput) {
        return;
      }
      if (e.key == 'ArrowLeft') {
        if (page === 1) {
          toast.error('This is the last page');
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
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [page, maxPage]);
  const handleDiv = (state) => {
    setIsModalOpen(state);
  };

  const getCustomerId = (id) => {
    setSelectedId(id);
  };
  const handleAddNewField = async () => {
    setIsModalOpen(true);
  };
  const giveQr = (value) => {
    setQr(value);
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.get(
      `customer/search?phoneNumber=${phoneNumberforSearch}`
    );

    console.log('This is the response', response.data.data);

    if (phoneNumberforSearch) {
      setFilteredData(response.data.data[0]);
      if (!response.data.data[0]) {
        toast.error('No customer found', {
          description: 'No customer with the entered phone number was saved',
        });
      }
    } else {
      setFilteredData(null);
      toast.error('Enter customer phone number');
    }
  };
  const handleChange = (e) => {
    setPhoneNumberForSearch(e.target.value);
  };
  const handleQrDiv = (value) => {
    setQrDiv(value);
  };

  return (
    <div className='flex flex-col gap-y-8'>
      <h1 className='text-black text-2xl font-medium flex flex-1'>
        Customer Management
      </h1>
      {qrDiv && (
        <DialogueComponent variant='qr' qr={qr} handleQrDiv={handleQrDiv} />
      )}
      <div className='flex items-center justify-between'>
        <form className='w-3/4 ' onSubmit={handleSearch}>
          <div className='border flex items-center bg-white justify-between  px-4 py-1 rounded-lg'>
            <input
              className='w-full p-2 outline-none'
              placeholder='Enter Phone Number'
              onChange={handleChange}
            />
            <button type='submit'>
              <Icons.GoSearch onClick={handleSearch} size='20px' />
            </button>
          </div>
        </form>

        <button
          className='flex bg-green-700 hover:opacity-80  items-center justify-center p-3 rounded-md'
          onClick={() => {
            navigate('/customer-management/add-customer');
          }}
        >
          <Icons.GoPlus color='white' />
          <h1 className='text-white ml-2 hidden lg:block'>Add Customer</h1>
        </button>
      </div>
      {isModalOpen && (
        <DialogueComponent
          variant='delete'
          deleteId={selectedId}
          handleDiv={handleDiv}
        />
      )}
      {!tableData && !filteredData && <SkeletonTable headers={Headers} />}
      {tableData && !filteredData && (
        <PageTable
          giveQr={giveQr}
          handleQrDiv={handleQrDiv}
          TableData={tableData}
          headers={Headers}
          handleOpenDiv={handleDiv}
          getCustomerId={getCustomerId}
        />
      )}
      {filteredData && (
        <FilteredCustomer
          giveQr={giveQr}
          handleQrDiv={handleQrDiv}
          handleOpenDiv={handleDiv}
          getCustomerId={getCustomerId}
          headers={Headers}
          data={filteredData}
        />
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
      {/* )} */}
    </div>
  );
};

export default CustomerManagement;
