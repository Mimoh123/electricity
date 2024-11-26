import { useState, React, useEffect } from 'react';
import { Icons } from '../../components/data/Icons';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '../auth/config';
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

function AddMeterRate() {
  const navigate = useNavigate();
  const [selectedMeterType, setSelectedMeterType] = useState('');
  const [selectedCustomerType, setSelectedCustomerType] = useState('');
  const [formData, setFormData] = useState({
    baseRate: null,
    minimumCharge: null,
    fine: null,
    serviceCharge: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/meter-Rate', {
        meterRates: [
          {
            meterType: String(selectedMeterType),
            customerType: String(selectedCustomerType),
            baseRate: parseFloat(formData.baseRate),
            minimumCharge: parseFloat(formData.minimumCharge),
            fine: parseFloat(formData.fine),
            serviceCharge: parseFloat(formData.serviceCharge),
          },
        ],
      });
      if (response.data.success)
        toast.success('Added Successfully', {
          description: 'New Meter Rate Added',
        });
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      toast.error('Failed to Add Meter Rate', {
        description: error.response.data.message,
      });
    }
  };
  return (
    <section className='flex flex-col'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Icons.FiChevronLeft
              size='24px'
              className='hover:cursor-pointer'
              onClick={() => {
                navigate(-1);
              }}
            />
            <h1 className='text-2xl font-semibold p-2'>Add Meter Rate</h1>
          </div>
          <Button className='bg-blue-400 rounded-xl '>Add</Button>
        </div>
        <div className='mt-10 flex items-start'>
          <section className='flex flex-col'>
            <div className='flex items-center mt-5'>
              <label className='font-bold text-lg w-32'>MeterType</label>
              <span className='mx-20'>:</span>

              <Select
                onValueChange={(value) => {
                  setSelectedMeterType(value);
                }}
              >
                <SelectTrigger className='w-72  text-gray-500  bg-inherit border border-gray-400  '>
                  <SelectValue placeholder='Select Meter type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Meter Types</SelectLabel>
                    <SelectItem value='2 phase'>2 phase</SelectItem>
                    <SelectItem value='3 phase'>3 phase</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center mt-5'>
              <label className='font-bold text-lg w-32'>Customer Type</label>
              <span className='mx-20'>:</span>
              <Select
                onValueChange={(value) => {
                  setSelectedCustomerType(value);
                }}
              >
                <SelectTrigger className='w-72  text-gray-500  bg-inherit border border-gray-400  '>
                  <SelectValue placeholder='Select Meter type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Customer Type</SelectLabel>
                    <SelectItem value='local'>Local</SelectItem>
                    <SelectItem value='ntc'>Ntc</SelectItem>
                    <SelectItem value='non-local'>Non-local</SelectItem>
                    <SelectItem value='ncell'>Ncell</SelectItem>

                    {/* <SelectItem value='3 phase'>ntc</SelectItem>
                    <SelectItem value='3 phase'>ntc</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center mt-5'>
              <label className='font-bold text-lg w-32'>Base Rate</label>
              <span className='mx-20'>:</span>
              <input
                required
                type='number'
                placeholder='Rs 0'
                name='baseRate'
                value={formData.baseRate}
                onChange={handleChange}
                className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
              />
            </div>
            <div className='flex items-center mt-5'>
              <label className='font-bold text-lg w-32'>Min Charnge</label>
              <span className='mx-20'>:</span>
              <input
                required
                type='number'
                name='minimumCharge'
                placeholder='Rs 0'
                value={formData.minimumCharge}
                onChange={handleChange}
                className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
              />
            </div>
            <div className='flex items-center mt-5'>
              <label className='font-bold text-lg w-32'>Fine</label>
              <span className='mx-20'>:</span>
              <input
                required
                type='number'
                name='fine'
                placeholder='Rs 0'
                value={formData.fine}
                onChange={handleChange}
                className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
              />
            </div>
            <div className='flex items-center mt-5'>
              <label className='font-bold text-lg w-32'>Service Charge</label>
              <span className='mx-20'>:</span>
              <input
                required
                type='number'
                name='serviceCharge'
                placeholder='Rs 0'
                value={formData.serviceCharge}
                onChange={handleChange}
                className='bg-inherit text-gray-500 border border-gray-400 p-2 rounded-md flex-grow'
              />
            </div>
          </section>
        </div>
      </form>
    </section>
  );
}

export default AddMeterRate;
