// import { Icons } from '../../components/data/Icons';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { axiosInstance } from '../auth/config';
// import { useEffect, useState, react } from 'react';
// import { toast } from 'sonner';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// const EditDetails = () => {
//   const [selectedMeter, setSelectedMeter] = useState();
//   const [allmeterData, setAllMeterData] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = location.state || {};
//   const [loading, setLoading] = useState(true);
//   const [editableUser, setEditableUser] = useState({});
//   const handleMeterSelected = (value) => {
//     setSelectedMeter(value);
//   };
//   const apple = 'Hi';
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // useEffect(async () => {
//   //   axiosInstance
//   //     .get(`/customer/${id}`)
//   //     .then((response) => {
//   //       setUser(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
//   // });
//   useEffect(() => {
//     const id = location.state.id;
//     const fetchUserData = async () => {
//       try {
//         const response = await axiosInstance.get(`/customer/${id}`);
//         console.log('Response', response);

//         setUser(response.data.data);
//         const data = response.data.data;
//         setSelectedMeter(data.meterRate._id);
//         setEditableUser({
//           name: data.customer.name,
//           phoneNumber: data.customer.phoneNumber,
//           email: data.customer.email,
//           meterType: data.meterRate._id,

//           confirmationId: data.customer.consumerId,
//           address: data.customer.address,
//           accountStatus: data.isVerified ? 'Verified' : 'Not Verified', // Convert to readable status
//         });
//       } catch (error) {
//         console.log('fetching error', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) {
//       fetchUserData();
//     }
//   }, [location.state]);
//   useEffect(() => {
//     console.log('selected type', selectedMeter);
//   }, [selectedMeter]);
//   useEffect(() => {
//     const fetchMeterData = async () => {
//       try {
//         const response = await axiosInstance.get('/meter-Rate');
//         console.log('Response from server:', response);
//         setAllMeterData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching meter data:', error);
//         // You can also set an error state here if needed
//       }
//     };
//     fetchMeterData();
//   }, []);
//   useEffect(() => {
//     console.log('editable user', editableUser);
//   }, [editableUser]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditableUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     console.log('editable user', editableUser);
//     try {
//       await axiosInstance.put(`/customer/${id}`, {
//         name: editableUser.name,
//         phoneNumber: editableUser.phoneNumber,
//         email: editableUser.email,
//         consumerId: editableUser.confirmationId,
//         meterBox: editableUser.meterBox,
//         isVerified: editableUser.accountStatus === 'Verified', // Convert back to boolean
//         address: editableUser.address,
//       });
//       toast.success('Edited Successfully', {
//         description: ' Customer edited sucessfully',
//       });
//       navigate(-1); // Navigate back after successful update
//     } catch (error) {
//       toast.error('Failed to Edit Customer', {
//         description: 'Failed to Edit Customer info,try again',
//       });
//       console.log('Error updating user', error);
//       alert('Failed to update details. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div>Loading</div>;
//   }
//   if (!user) {
//     return <div>NO user found</div>;
//   }
//   const detailsMap = {
//     Name: user.customer.name || '',
//     'Phone No.': user.customer.phoneNumber || '',
//     Email: user.customer.email || '',
//     'Meter Type': user.meterRate.meterType || '',
//     'Active Status': 'Active',
//     // Address: address || '',
//     'Confirmation ID': user.customer.consumer_id || '',
//     // 'SC No.': sc_no || '',
//   };

//   return (
//     <div className='flex flex-col'>
//       <form onSubmit={handleSave}>
//         <div className='flex items-center justify-between'>
//           <div className='flex items-center'>
//             <Icons.FiChevronLeft
//               className='hover:cursor-pointer'
//               onClick={() => {
//                 navigate(-1);
//               }}
//               size='24px'
//             />
//             <h1 className='text-2xl font-normal p-2'>Edit Details</h1>
//           </div>
//           <button
//             type='submit'
//             className='border bg-blue-500 text-white p-2 rounded-lg w-16'
//           >
//             Save
//           </button>
//         </div>
//         <h1 className='text-sm text-gray-500 mt-5 italic'>
//           {' '}
//           Please review or update customer's account details
//         </h1>
//         <div className='flex mt-5 flex-col p-4'>
//           {/* {Object.entries(detailsMap).map(([label, value]) => (
//           <div key={label} className='flex border-b py-2 items-center'>
//             <label className='font-bold text-lg w-32'>{label}</label>
//             <span className='mx-20'>
//               <Icons.BsThreeDotsVertical />
//             </span>
//             <span className='text-lg border border-gray-400 p-1 rounded-lg'>
//               {value}
//             </span>
//           </div>
//         ))} */}
//           {/* {Object.entries(editableUser).map(([key, value]) => (

//             <div key={key} className='flex border-b py-2 items-center'>
//               <label className='font-bold text-lg w-32'>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </label>
//               <span className='mx-20'>
//                 <Icons.BsThreeDotsVertical />
//               </span>
//               <input
//                 name={key}
//                 value={value}
//                 onChange={handleChange}
//                 className='text-lg border border-gray-400 p-1 rounded-lg w-96 bg-inherit text-gray-500 font-semibold'
//               />
//             </div>
//           ))} */}
//           {Object.entries(editableUser).map(([key, value]) => {
//             return (
//               <div key={key} className='flex border-b py-2 items-center'>
//                 {key === 'meterType' ? (
//                   // Special case for 'meterType'
//                   <div className=' flex  items-center font-bold text-lg'>
//                     <label className='font-bold text-lg w-32'>
//                       {key.charAt(0).toUpperCase() + key.slice(1)}
//                     </label>
//                     <span className='mx-20'>
//                       <Icons.BsThreeDotsVertical />
//                     </span>
//                     <Select
//                       className=' w-96 '
//                       name='Meter Rate'
//                       value={selectedMeter}
//                       onValueChange={(value) => {
//                         handleMeterSelected(value);
//                         setEditableUser((prev) => ({
//                           ...prev,
//                           meterType: value, // Update editableUser's meterType as well
//                         }));
//                       }}
//                     >
//                       <SelectTrigger className='w-96 bg-inherit border-gray-400 text-gray-500 mt-5 lg:mt-0 py-6 font-bold'>
//                         <SelectValue placeholder={editableUser} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           {allmeterData.map((meterdata) => (
//                             <SelectItem
//                               key={meterdata._id}
//                               value={meterdata._id}
//                             >
//                               {meterdata.meterRates[0].meterType}/
//                               {meterdata.meterRates[0].customerType}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 ) : (
//                   // Default case for other keys
//                   <>
//                     <label className='font-bold text-lg w-32'>
//                       {key.charAt(0).toUpperCase() + key.slice(1)}
//                     </label>
//                     <span className='mx-20'>
//                       <Icons.BsThreeDotsVertical />
//                     </span>
//                     <input
//                       name={key}
//                       value={value}
//                       onChange={handleChange}
//                       className='text-lg border border-gray-400 p-1 rounded-lg w-96 bg-inherit text-gray-500 font-semibold'
//                     />
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditDetails;
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
      meterType: value, // Update editableUser's meterType
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
    console.log('selected meter name', selectedMeterName);
  }, [selectedMeterName]);
  useEffect(() => {
    console.log('selected meter from meterSelected', selectedMeter);
  }, [selectedMeter]);
  useEffect(() => {
    console.log('meter number is ', meterNumber);
  }, [meterNumber]);
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
    console.log('editable user', editableUser);
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
