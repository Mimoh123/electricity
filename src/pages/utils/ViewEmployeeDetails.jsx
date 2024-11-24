import { useEffect, useState } from 'react';
import { Icons } from '../../components/data/Icons';
import { axiosInstance } from '../auth/config';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from './Spinner';

const ViewEmployeeDetails = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setLoading] = useState(true);
  const nagivate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // const id = location.state.id;
        const response = await axiosInstance.get(`/employee/get/${id}`);
        console.log('employeeDetails', response);
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeData();
    }
  }, [id]);
  useEffect(() => {
    console.log('User', user);
  }, [user]);

  if (loading) {
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  const detailsMap = {
    Name: user.name || '',
    'Assigned Region': user.assignedRegion || ' ',
    Email: user.email || '',
    'Phone No.': user.phoneNumber || '',
    'A/C status': user.status || '',
  };
  const handleEditDetails = (id) => {
    nagivate(`/edit-details/${id}`, { state: { id: id } });
  };

  return (
    <div className='flex flex-col'>
      {/* <h1>ViewDetail</h1> */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Icons.FiChevronLeft
            size='24px'
            className='hover:cursor-pointer'
            onClick={() => {
              nagivate(-1);
            }}
          />
          <h1 className='text-2xl font-semibold p-2'>View Details</h1>
        </div>
        {/* <button
          className='border bg-blue-500 text-white px-2 rounded-lg w-20 flex items-center'
          // onClick={() => {
          //   handleEditDetails(id);
          // }}
        >
          <Icons.CiEdit />
          <h1 className='p-2'>Edit</h1>
        </button> */}
      </div>

      <div className='flex flex-col'>
        <h1 className='p-2 text-sm italic text-gray-500 mt-5'>
          Detail Information are displayed below
        </h1>
        <div className='flex flex-col p-4'>
          {Object.entries(detailsMap).map(([label, value], index) => (
            <div className='flex items-center p-4' key={index}>
              <label className='font-bold text-lg w-32  max-w-64 whitespace-nowrap'>
                {label}
              </label>
              <span className='mx-20'>
                <Icons.BsThreeDotsVertical />
              </span>
              <span className='text-lg text-gray-600 '>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeDetails;
