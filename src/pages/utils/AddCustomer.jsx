import { React, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { axiosInstance } from '@/pages/auth/config';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AddCustomer() {
  const [selectedMeter, setSelectedMeter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    meterType: selectedMeter,
    acStatus: 'active',
    address: '',
    consumerId: '',
    scNo: '',
  });
  const [allmeterData, setAllMeterData] = useState([]);
  // const [selectedMeterDataFetched, setSelectedMeterDataFetched] = useState([]);

  const navigate = useNavigate();
  const handleMeterSelected = (value) => {
    setSelectedMeter(value);
  };
  const fetchMeterDataById = async (id) => {
    try {
      const response = await axiosInstance.get(`/meter-Rate/${id}`);

      // setSelectedMeterDataFetched(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log('erro while fetching meter by id', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const fetchMeterData = async () => {
      try {
        const response = await axiosInstance.get('/meter-Rate');

        setAllMeterData(response.data.data.meterRates);
      } catch (error) {
        console.error('Error fetching meter data:', error);
        // You can also set an error state here if needed
      }
    };

    fetchMeterData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedMeterDataFetched = await fetchMeterDataById(
      formData.meterType
    );

    const customerData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      consumerId: formData.consumerId,
      scNumber: formData.scNo,
    };
    const meterData = {
      meterNumber: 'M54321',
      status: formData.acStatus,
      meterRate: selectedMeterDataFetched._id,
      rateId: selectedMeterDataFetched.meterRates[0]._id,
      lastReading: 0, // Example value
      lastReadingDate: new Date().toISOString(),
    };

    try {
      const response = await axiosInstance.post('/customer/create', {
        customerData,
        meterData,
      });

      toast.success('Added Successfully', {
        description: 'New Customer Added',
      });
      navigate('/customer-management');
      // Optionally reset the form or navigate to another page
      setFormData({
        name: '',
        phoneNo: '',
        email: '',
        meterType: '',
        acStatus: '',
        address: '',
        consumerId: '',
        scNo: '',
      });
    } catch (error) {
      if (error.response.data.message.includes('consumerId_1 dup key'))
        toast.error('Failed to Add Customer', {
          description: 'Duplicate Confirmation Id ',
        });
      else if (error.response.data.message.includes('phoneNumber_1 dup key'))
        toast.error('Failed to Add Customer', {
          description: 'Duplicate phone number ',
        });
      else if (error.response.data.message.includes('email_1 dup key'))
        toast.error('Failed to Add Customer', {
          description: 'Duplicate email address ',
        });
      else if (error.response.data.message.includes('scNumber_1 dup key'))
        toast.error('Failed to Add Customer', {
          description: 'Duplicate Sc Number ',
        });
      else
        toast.error('Failed to Edit Customer', {
          description: error.response.data.message,
        });
      // Handle error (e.g., show an error message)
    }
  };
  // You can add your form submission logic here (e.g., API call)
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
                navigate('/customer-management');
              }}
              className='hover:cursor-pointer text-2xl font-semibold'
            />
            <h1 className='ml-5 text-2xl font-semibold'>Add Customer</h1>
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
                <span className='mx-20'>:</span>
                <input
                  required
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='bg-inherit focus:bg-inherit border font-semibold  text-gray-500 border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Phone No.</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className='bg-inherit border  text-gray-500 font-semibold border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Email</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-inherit border  text-gray-500 font-semibold border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Meter Type</label>
                <span className='mx-20'>:</span>
                <Select
                  name='Meter Rate'
                  value={selectedMeter}
                  onValueChange={(value) => {
                    handleMeterSelected(value);
                    setFormData({ ...formData, meterType: value });
                  }}
                >
                  <SelectTrigger className='w-96 bg-inherit border-gray-400 text-gray-500 mt-5 lg:mt-0 py-6 font-semibold'>
                    <SelectValue
                      placeholder='Select Meter Type'
                      className='placeholder:text-gray-400 '
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allmeterData.map((meterdata) => (
                        <SelectItem key={meterdata._id} value={meterdata._id}>
                          {meterdata.meterRates[0].meterType}/
                          {meterdata.meterRates[0].customerType}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>A/C status</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='text'
                  name='acStatus'
                  value={formData.acStatus}
                  onChange={handleChange}
                  className='bg-inherit border font-semibold  text-gray-500  border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold text-lg w-32'>Address</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  className='bg-inherit border  text-gray-500 font-semibold border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold   text-lg w-32'>Consumer ID</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='number'
                  name='consumerId'
                  placeholder='01254'
                  value={formData.consumerId}
                  onChange={handleChange}
                  className='bg-inherit border   text-gray-500 font-semibold border-gray-400 p-2 rounded-md flex-grow'
                />
              </div>
              <div className='flex items-center mt-5'>
                <label className='font-bold  text-lg w-32'>Sc No.</label>
                <span className='mx-20'>:</span>
                <input
                  required
                  type='number'
                  name='scNo'
                  placeholder='098123'
                  value={formData.scNo}
                  onChange={handleChange}
                  className='bg-inherit border  text-gray-500  border-gray-400 font-semibold p-2 rounded-md flex-grow'
                />
              </div>
            </section>
          </div>
        </section>
      </form>
    </div>
  );
}

export default AddCustomer;
