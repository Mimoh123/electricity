import { Icons } from '../../components/data/Icons';
import { Headers } from '../../components/data/EmployeeData';
import EmployeeTable from '../../components/utils/EmployeeTable';
import HandleAddNewFieldModal from '../../components/utils/HandleAddNewFieldModal';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../auth/config';
import { useNavigate } from 'react-router-dom';
import FilteredEmployee from '@/components/utils/FilteredEmployee';
import DialogueComponent from '@/components/utils/DialogueComponent';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { toast } from 'sonner';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FaAngleDoubleRight } from 'react-icons/fa';
import SkeletonTable from '@/components/utils/SkeletonTable';
const EmployeeManagement = () => {
  // const [isDivOpen, setIsDivOpen] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successDiv, setSuccessDiv] = useState(false);
  const [fileteredData, setFilteredData] = useState('');
  const [tableData, setTableData] = useState();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(100);
  const [phoneNumberforSearch, setPhoneNumberForSearch] = useState('');
  const newDataArray = ['Name', 'Email', 'Phone Number', 'Assigned Region'];
  const navigate = useNavigate();
  useEffect(() => {
    setTableData(null);
    const getAllEmployees = async () => {
      axiosInstance
        .get(`/employee`, {
          params: {
            page,
          },
        })
        .then((response) => {
          setMaxPage(response.data.data.totalPages);
          setTableData(response.data.data);
        })
        .catch((error) =>
          console.error('Error occured while fetching customer: ', error)
        );
      return () => {};
    };
    getAllEmployees();
  }, [page]);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT') {
        return;
      }
      if (e.key == 'ArrowLeft') {
        if (page === 1) {
          toast.error('This is the first page');
        } else {
          setPage(page - 1);
        }
      } else if (e.key == 'ArrowRight') {
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
  useEffect(() => {
    console.log('Selected email to reset', selectedEmail);
    // console.log('tabledata', tableData);
  }, [selectedEmail]);
  const getSelectedEmail = (value) => {
    setSelectedEmail(value);
  };

  const handleDiv = (state) => {
    setIsModalOpen(state);
  };
  const handleSuccessDiv = (state) => {
    setSuccessDiv(state);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('inside the submit', phoneNumberforSearch);
    if (phoneNumberforSearch) {
      try {
        const response = await axiosInstance.get(
          `employee/search?phoneNumber=${phoneNumberforSearch}`
        );
        // console.log(response.data.data.result.employees[0]);
        console.log('Response is', response);
        console.log(response.data.success);
        if (response.data.success) {
          const data = response.data.data.employees[0];
          console.log(data);
          setFilteredData([data]);

          if (response.data.data.totalEmployee == 0) {
            toast.error('No employee found');
          }
        }
      } catch (error) {
        console.log('this is the error', error);
        toast.error('No employee found');
      }
    } else {
      toast.error('Enter phone number', {
        description:
          'Enter the phone number of the employee you are trying to search',
      });
    }
  };

  const handleChange = (e) => {
    setPhoneNumberForSearch(e.target.value);
  };

  return (
    <div className='flex flex-col gap-y-8'>
      {isModalOpen && (
        <DialogueComponent
          selectedItemEmail={selectedEmail}
          handleDiv={handleDiv}
          handleSuccessDiv={handleSuccessDiv}
          variant={'forget-password'}
        />
      )}
      {successDiv && (
        <DialogueComponent
          selectedItemEmail={selectedEmail}
          handleSuccessDiv={handleSuccessDiv}
          variant={'success-forgetpw'}
        />
      )}
      <h1 className='text-black text-2xl font-medium flex flex-1'>
        Employee Management
      </h1>
      <div className='flex items-center justify-between'>
        <form className='w-3/4' onSubmit={handleSearch}>
          <div className='border flex items-center bg-white justify-between w-full py-1 px-4 rounded-lg'>
            <input
              className='w-full p-2 outline-none'
              placeholder='Enter Phone Number'
              onChange={handleChange}
            />
            <button type='submit'>
              <Icons.GoSearch size='20px' />
            </button>
          </div>
        </form>
        <button
          className='flex bg-green-700 hover:opacity-80 items-center p-3 rounded-md'
          onClick={() => {
            navigate('/employee-management/add-employee');
          }}
        >
          <Icons.GoPlus color='white' />
          <h1 className='hidden lg:block text-white'>Add Employee</h1>
        </button>
      </div>
      {tableData && !fileteredData && (
        <EmployeeTable
          TableData={tableData.employees}
          getSelectedEmail={getSelectedEmail}
          headers={Headers}
          handleDiv={handleDiv}
        />
      )}
      {!tableData && !fileteredData && <SkeletonTable headers={Headers} />}
      {fileteredData && (
        <FilteredEmployee
          data={fileteredData}
          handleDiv={handleDiv}
          getSelectedEmail={getSelectedEmail}
          headers={Headers}
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

export default EmployeeManagement;
