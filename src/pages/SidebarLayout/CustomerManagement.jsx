/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from '../../components/data/Icons';
import PageTable from '../../components/utils/PageTable';
import { Headers } from '../../components/data/TableData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '../auth/config';
import { FaAngleDoubleLeft } from 'react-icons/fa';

import { FaAngleDoubleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

import FilteredCustomer from '@/components/utils/FilteredCustomer';
import DialogueComponent from '@/components/utils/DialogueComponent';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { toast } from 'sonner';
import SkeletonTable from '@/components/utils/SkeletonTable';
import { Skeleton } from '@/components/ui/skeleton';
import { IoIosOptions } from 'react-icons/io';
const CustomerManagement = () => {
  const [tableData, setTableData] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const [phoneNumberforSearch, setPhoneNumberForSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedSort, setSelectedSort] = useState('Oldest First');
  const [displayPage, setDisplayPage] = useState(1);

  const [meterData, setMeterData] = useState(null);
  const data = ['Most recent First', 'Oldest First'];

  const navigate = useNavigate();
  const [qrDiv, setQrDiv] = useState(false);
  const [qr, setQr] = useState();

  useEffect(() => {
    setTableData(null);
    const apiPage =
      selectedSort === 'Most recent First'
        ? maxPage - (displayPage - 1)
        : displayPage;
    console.log(apiPage);
    const fetchData = async () => {
      axiosInstance
        .get('/customer/pagination', {
          params: {
            page: apiPage,
          },
        })
        .then((response) => {
          const neededdata = response.data.data;
          console.log(neededdata);
          setTableData(neededdata);
          setMaxPage(response.data.data.totalPages);
        })
        .catch((error) =>
          console.error('Error occured while fetching customer: ', error)
        );
    };
    fetchData();
  }, [page, displayPage, selectedSort]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      setDisplayPage(newPage);
    } else {
      toast.error(
        newPage < 1 ? 'This is the first page' : 'This is the last page'
      );
    }
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log('key pressed', e.key);
      const isInput = e.target.tagName === 'INPUT';
      if (isInput) {
        return;
      }
      if (e.key == 'ArrowLeft') {
        handlePageChange(displayPage - 1);
      } else if (e.key === 'ArrowRight') {
        handlePageChange(displayPage + 1);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [displayPage]);

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
      {console.log(tableData)}
      <div className='flex items-center  justify-between'>
        <form className='w-3/4 ' onSubmit={handleSearch}>
          <div className='border flex items-center bg-white justify-between  px-4 py-1 rounded-lg'>
            <input
              className='w-full placeholder:font-normal p-2 outline-none'
              placeholder='Enter Phone Number'
              onChange={handleChange}
            />
            <button type='submit'>
              <Icons.GoSearch onClick={handleSearch} size='20px' />
            </button>
          </div>
        </form>
        {!tableData && !filteredData ? (
          <Skeleton className='ml-[-70px] h-12 w-16' />
        ) : (
          <div
            className='flex py-1  ml-[-70px] justify-start
        '
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='border h-12  flex items-center justify-around '
                  variant='outline'
                >
                  {/* <span className='font-medium'>{selectedSort}</span>
                  <span className='flex items-center mt-[2px]'>
                    <IoIosArrowDown />
                  </span> */}
                  <IoIosOptions
                    size={'20px'}
                    className='hover:cursor-pointer hover:opacity-75'
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44'>
                <DropdownMenuGroup>
                  {data.map((item) => {
                    console.log('data', item);
                    return (
                      <DropdownMenuItem
                        key={item}
                        className='w-auto'
                        onClick={(key) => {
                          setSelectedSort(item);
                          setDisplayPage(1);
                        }}
                      >
                        {item}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

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
          selectedSort={selectedSort}
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
            onClick={() => handlePageChange(1)}
            className='border border-gray-400 shadow-lg mr-2 p-2 hover:opacity-65 rounded-xl'
          >
            <FaAngleDoubleLeft
              size={'17px'}
              className='text-gray-500 hover:cursor-pointer'
            />
          </button>

          <button
            onClick={() => handlePageChange(displayPage - 1)}
            className='border border-gray-400 shadow-lg mr-2 hover:opacity-65 p-2 rounded-xl'
          >
            <FaChevronLeft className='text-gray-500  hover:cursor-pointer' />
          </button>
          <h1 className='font-semibold mx-4 text-gray-500'>{displayPage}</h1>
          <button
            onClick={() => handlePageChange(displayPage + 1)}
            className='border border-gray-400 shadow-lg ml-2 p-2 hover:opacity-65 rounded-xl'
          >
            <FaChevronRight className='text-gray-500  hover:cursor-pointer' />
          </button>
          <button
            onClick={() => handlePageChange(maxPage)}
            className='border border-gray-400 shadow-lg ml-2 p-2 hover:opacity-65 rounded-xl'
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
};

export default CustomerManagement;
