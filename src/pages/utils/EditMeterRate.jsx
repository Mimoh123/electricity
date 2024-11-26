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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SelectSeparator } from '@radix-ui/react-select';

const EditMeterRate = () => {
  const [selectedCustomerType, setSelectedCustomerType] = useState(null);
  const [selectedMeterName, setSelectedMeterName] = useState('');
  const [allmeterData, setAllMeterData] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [meterList, setMeterList] = useState(null);
  const { id } = location.state || {};
  const [editId, setEditId] = useState('');
  const [loading, setLoading] = useState(true);
  const [editableMeter, setEditableMeter] = useState({});

  // const handleMeterSelected = (value) => {
  //   setSelectedMeter(value);
  //   setEditableUser((prev) => ({
  //     ...prev,
  //     meterType: value, // Update editableUser's meterType
  //   }));
  // };
  const handleCustomerType = (value) => {
    setSelectedCustomerType(value);
  };
  const handleMeterSelectedName = (value) => {
    setSelectedMeterName(value);
  };
  const getAllMeterRates = async () => {
    const response = await axiosInstance.get('meter-Rate');

    setAllMeterData(response.data.data.meterRates);
  };
  useEffect(() => {
    getAllMeterRates();
  }, []);

  useEffect(() => {
    const id = location.state.id;
    console.log('Id to be changed', id);
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`meter-Rate/${id}`);

        const data = response.data.data.meterRates;
        setEditId(data[0]._id);
        setSelectedMeterName(data[0].meterType);
        setSelectedCustomerType(data[0].customerType);

        setEditableMeter({
          meterType: data[0].meterType,
          customerType: data[0].customerType,
          Rate: data[0].baseRate,
          fine: data[0].fine,
          minCharge: data[0].minimumCharge,
          serviceCharge: data[0].serviceCharge,
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

  // useEffect(() => {
  //   console.log('selected meter name', selectedMeterName);
  // }, [selectedMeterName]);
  // useEffect(() => {
  //   const fetchMeterData = async () => {
  //     try {
  //       const response = await axiosInstance.get('/meter-Rate');
  //       console.log('Response from server:', response);
  //       setAllMeterData(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching meter data:', error);
  //     }
  //   };
  //   fetchMeterData();
  // }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/meter-Rate/${editId}`, {
        meterRates: [
          {
            meterType: selectedMeterName,
            customerType: selectedCustomerType,
            baseRate: editableMeter.Rate,
            minimumCharge: editableMeter.minCharge,
            fine: editableMeter.fine,
            serviceCharge: editableMeter.serviceCharge,
          },
        ],
      });

      if (response.data.success) {
        toast.success('Edited Successfully', {
          description: 'Meter Rate edited successfully',
        });
      } else {
        toast.error('Failed to Edit Meter Rate', {
          description: 'Failed to Edit Meter Info, try again',
        });
      }

      navigate(-1); // Navigate back after successful update
    } catch (error) {
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
            <h1 className='text-2xl font-normal p-2'>Edit Meter Details</h1>
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
          {Object.entries(editableMeter).map(([key, value]) => {
            return (
              <div key={key} className='flex border-b py-2  items-center'>
                {key === 'meterType' ? (
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
                          className='hover:bg-inherit flex justify-start text-lg border border-gray-400 p-1 rounded-lg  w-96 bg-inherit text-gray-500 font-semibold'
                          variant='outline'
                        >
                          <span>{selectedMeterName}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuLabel>Meter Type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className='w-inherit'>
                          <DropdownMenuItem
                            key={'2 phase'}
                            onClick={() => {
                              handleMeterSelectedName('2 phase');
                            }}
                          >
                            2 phase
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            key={'3 phase'}
                            onClick={() => {
                              handleMeterSelectedName('3 phase');
                            }}
                          >
                            3 phase
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : key === 'customerType' ? (
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
                          className='flex hover:bg-inherit justify-start text-lg border border-gray-400 p-1 rounded-lg  w-96 bg-inherit text-gray-500 font-semibold'
                          variant='outline'
                        >
                          <span>{selectedCustomerType}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-56'>
                        <DropdownMenuLabel>Customer Type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className='w-inherit'>
                          <DropdownMenuItem
                            key={'local'}
                            onClick={() => {
                              handleCustomerType('local');
                            }}
                          >
                            local
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            key={'ntc'}
                            onClick={() => {
                              handleCustomerType('ntc');
                            }}
                          >
                            ntc
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            key={'ncell'}
                            onClick={() => {
                              handleCustomerType('ncell');
                            }}
                          >
                            ncell
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            key={'non-local'}
                            onClick={() => {
                              handleCustomerType('non-local');
                            }}
                          >
                            non-local
                          </DropdownMenuItem>
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
                        setEditableMeter((prev) => ({
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

export default EditMeterRate;
