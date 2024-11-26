import { Icons } from '../../components/data/Icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../auth/config';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Spinner from './Spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EditDetails = () => {
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [selectedMeterName, setSelectedMeterName] = useState('');
  const [allmeterData, setAllMeterData] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [editableUser, setEditableUser] = useState({});
  const [meterNumber, setMeterNumber] = useState('');

  const handleMeterSelected = (value) => {
    setSelectedMeter(value);
    setEditableUser((prev) => ({
      ...prev,
      meterType: value,
    }));
  };
  const handleMeterSelectedName = (value) => {
    setSelectedMeterName(value);
  };

  useEffect(() => {
    const id = location.state.id;
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/customer/${id}`);
        console.log('Response', response);
        setUser(response.data.data);
        const data = response.data.data;
        setSelectedMeter(data.meterBox.meterRate);
        setSelectedMeterName(data.meterRate);
        setMeterNumber(data.meterBox.meterNumber);
        setEditableUser({
          name: data.customer.name,
          phoneNumber: data.customer.phoneNumber,
          email: data.customer.email,
          meterType: data.meterRate,
          confirmationId: data.customer.consumerId,
          address: data.customer.address,
          accountStatus: data.meterBox.status,
        });
      } catch (error) {
        console.log('fetching error', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUserData();
    }
  }, [location.state]);

  useEffect(() => {
    const fetchMeterData = async () => {
      try {
        const response = await axiosInstance.get('/meter-Rate');
        console.log('Response from server:', response);
        setAllMeterData(response.data.data.meterRates);
      } catch (error) {
        console.error('Error fetching meter data:', error);
      }
    };
    fetchMeterData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/customer/${id}`, {
        name: editableUser.name,
        phoneNumber: editableUser.phoneNumber,
        email: editableUser.email,
        consumerId: editableUser.confirmationId,
        address: editableUser.address,
        rateId: selectedMeterName._id,
        meterRateId: selectedMeter,
        meterBox: {
          meterNumber: meterNumber,
          status: editableUser.accountStatus,
        },
      });
      toast.success('Edited Successfully', {
        description: 'Customer edited successfully',
      });
      navigate(-1); // Navigate back after successful update
    } catch (error) {
      if (error.response.data.message.includes('consumerId_1 dup key'))
        toast.error('Failed to Edit Customer', {
          description: 'Duplicate Confirmation Id ',
        });
      else if (error.response.data.message.includes('phoneNumber_1 dup key'))
        toast.error('Failed to Edit Customer', {
          description: 'Duplicate phone number ',
        });
      else if (error.response.data.message.includes('email_1 dup key'))
        toast.error('Failed to Edit Customer', {
          description: 'Duplicate email address ',
        });
      else
        toast.error('Failed to Edit Customer', {
          description: error.response.data.message,
        });
    }
  };

  if (loading) {
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSave}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Icons.FiChevronLeft
              className='hover:cursor-pointer'
              onClick={() => {
                navigate(-1);
              }}
              size='24px'
            />
            <h1 className='text-2xl font-normal p-2'>Edit Details</h1>
          </div>
          <button
            type='submit'
            className='border bg-blue-500 text-white p-2 rounded-lg w-16'
          >
            Save
          </button>
        </div>
        <h1 className='text-sm text-gray-500 mt-5 italic'>
          Please review or update customer's account details
        </h1>
        <div className='flex mt-5 flex-col p-4'>
          {Object.entries(editableUser).map(([key, value]) => {
            return (
              <div key={key} className='flex border-b py-2  items-center'>
                {key === 'meterType' ? (
                  // Special case for 'meterType' with DropdownMenu
                  <div className='flex items-center font-bold w-full text-lg'>
                    <label className='font-bold text-lg w-32'>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <span className='mx-20'>
                      <Icons.BsThreeDotsVertical />
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className='flex justify-start text-lg border hover:bg-inherit border-gray-400 p-1 rounded-lg  w-96 bg-inherit text-gray-500 font-semibold'
                          variant='outline'
                        >
                          <span>
                            {selectedMeterName.meterType}/
                            {selectedMeterName.customerType}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuLabel>Meter Type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {allmeterData.map((meterdata) => (
                            <DropdownMenuItem
                              key={meterdata._id}
                              onClick={() => {
                                handleMeterSelected(meterdata._id);
                                handleMeterSelectedName(
                                  meterdata.meterRates[0]
                                );
                                console.log('Meterdata', meterdata);
                              }}
                            >
                              {meterdata.meterRates[0].meterType}/
                              {meterdata.meterRates[0].customerType}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  // Default case for other keys
                  <>
                    <label className='font-bold text-lg w-32'>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <span className='mx-20'>
                      <Icons.BsThreeDotsVertical />
                    </span>
                    <input
                      name={key}
                      value={value}
                      onChange={(e) =>
                        setEditableUser((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className='text-lg border border-gray-400 p-1 rounded-lg w-96 bg-inherit text-gray-500 font-semibold'
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default EditDetails;
