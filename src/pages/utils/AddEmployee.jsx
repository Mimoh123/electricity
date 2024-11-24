import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { axiosInstance } from '../auth/config';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { toast } from 'sonner';
function AddEmployee() {
  // const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    assignedRegion: '',
    // joinedDate: '',
    // role: 'Meter reader',
    // scNo: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `/employee/create?employee=true`,
        formData
      );

      // console.log(response);
      // console.log('Response:', response.data);
      if (response.data.success) {
        toast.success('Added Successfully', {
          description: 'New Employee Added',
        });
      }
      navigate('/employee-management');
    } catch (err) {
      console.error('Error:', err);
      if (
        err.response.data.message.includes(
          'E11000 duplicate key error collection: electricity_billing_dev.users index: email_1 dup key'
        )
      ) {
        toast.error('Failed to Add Employee', {
          description: 'Duplicate email',
        });
      } else if (
        err.response.data.message.includes(
          'E11000 duplicate key error collection: electricity_billing_dev.users index: phoneNumber_1 dup key:'
        )
      ) {
        toast.error('Failed to Add Employee', {
          description: 'Duplicate phone number',
        });
      } else {
        toast.error('Failed to Add Employee', {
          description: err.response.data.message,
        });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section
          className='flex items-center justify-between
      '
        >
          <div className='flex items-center'>
            <IoIosArrowBack
              onClick={() => {
                navigate('/employee-management');
              }}
              className='hover:cursor-pointer text-2xl font-semibold'
            />
            <h1 className='ml-5 text-2xl font-semibold'>Add Employee</h1>
          </div>
          <button
            type='submit'
            className='bg-blue-400 px-5 py-2 rounded-xl text-white'
          >
            Add
          </button>
        </section>
        <section className='mt-10'>
          <h1 className='text-sm italic text-gray-400 '>
            Please fill in the details below to add a new customer to the system
          </h1>

          <div className='mt-10 flex items-start'>
            <section className='flex flex-col'>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Name</label>
                <span className='mx-20'>:</span> {/* Updated margin */}
                <input
                  required
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='text-gray-500 bg-inherit border border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Phone No.</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='number'
                  name='phoneNumber'
                  placeholder='9800000000'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Email</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='email'
                  name='email'
                  placeholder='xyz@gmail.com'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>

              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>
                  Assigned Region
                </label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='text'
                  name='assignedRegion'
                  placeholder='sikles'
                  value={formData.assignedRegion}
                  onChange={handleChange}
                  className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              {/* <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Joined Date</label>
                <span className='mx-20'>:</span>
                <input
                  type='text'
                  name='joinedDate'
                  value={formData.joinedDate}
                  onChange={handleChange}
                  className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Role</label>
                <span className='mx-20'>:</span>
                <input
                  type='text'
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='text-gray-500 bg-inherit border border-gray-400 p-2 rounded-md flex-grow'
                />
              </div> */}
            </section>
          </div>
        </section>
      </form>
      {/* <button
        onClick={() => {
          toast.success('Added Successfully', {
            description: 'New Employee Added',
          });

          console.log('clicked');
        }}
      >
        ADd
      </button> */}
    </div>
  );
}

export default AddEmployee;
