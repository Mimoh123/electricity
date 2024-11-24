import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Spinner from './Spinner';

import imageCompression from 'browser-image-compression';
const Profile = () => {
  const [image, setImage] = useState('');
  const baseURL = import.meta.env.VITE_APP_URL;
  const ImgUrl = import.meta.env.VITE_IMAGE_APP_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [id, setId] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const access_token = localStorage.getItem('access_token');
  const fetchAdminDetails = async () => {
    try {
      const response = await fetch(`${baseURL}/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      const json = await response.json();
      console.log('Profile response', json);
      setContact(json.data.phoneNumber);
      setEmail(json.data.email);
      setName(json.data.name);
      setId(json.data.id);
      if (json.data.profilePicture) {
        setImage(json.data.profilePicture);
      }

      // const details = {
      //   name: json.data.name,
      //   email: json.data.email,
      //   phoneNumber: json.data.phoneNumber,
      // };
      // return details;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdminDetails();
  }, []);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setViewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };
  const handleSaveChanges = async () => {
    const formData = new FormData();
    setIsLoading(true);

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', contact);

    if (image) {
      const options = {
        maxSizeMB: 1, // Max size in MB
        maxWidthOrHeight: 800, // Max width or height in pixels
        useWebWorker: true, // Use web worker for background compression
      };
      const compressedFile = await imageCompression(image, options);
      formData.append('profilePicture', compressedFile);
    }
    console.log(formData);
    try {
      const response = await fetch(`${baseURL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData, // Send the FormData object directly in the body
      });

      const result = await response.json();
      console.log('Response:', result);
      toast.success('SuccessFully updated user details');
      setIsLoading(false);
    } catch (error) {
      toast.error(`Couldn't update user details`);
      console.error('Error:', error);
    }
  };
  const profilePic = `${ImgUrl}/${image}`;
  console.log('profile pic', profilePic);

  return (
    <div className='bg-white flex flex-col p-8 max-w-lg mx-auto rounded-xl shadow-lg min-h-full justify-around'>
      <h1 className='text-2xl font-semibold text-center'>Profile</h1>
      {/*  */}
      {image ? (
        <div className='overflow-hidden flex justify-center items-center'>
          <img
            src={viewImage ? viewImage : profilePic}
            className='w-24 h-24 hover:cursor-pointer hover:brightness-50 self-center rounded-full'
            onClick={() => {
              document.getElementById('fileInput').click();
            }}
          />
          <input
            id='fileInput'
            type='file'
            onChange={handleImageChange}
            className='hidden'
          />
        </div>
      ) : (
        <div className='w-full flex items-center justify-center space-x-4'>
          <Skeleton className='h-16 w-16 rounded-full' />
          <input
            id='fileInput'
            type='file'
            onChange={handleImageChange}
            className='hidden'
          />
        </div>
      )}
      {/* <div className='flex my-3  justify-center w-full'>
        <input
          id='fileInput'
          type='file'
          onChange={handleImageChange}
          className='hidden'
        />
        <label
          htmlFor='fileInput'
          className='rounded-sm flex justify-center border border-black  px-2 py-1 hover:cursor-pointer'
        >
          {/* <MdOutlineFileUpload size='20px' /> */}
      {/* Upload a file */}
      {/* </label>
      </div>} */}

      <div className='space-y-6'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Full Name</label>
          <input
            type='text'
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
            value={name}
            onChange={handleName}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Email</label>
          <input
            type='text'
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium'>Contact Number</label>
          <input
            type='text'
            className='border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
            value={contact}
            onChange={handleContact}
          />
        </div>
        <button
          className='w-full  flex justify-center items-center bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition'
          onClick={handleSaveChanges}
        >
          {isLoading ? (
            <Spinner classname={'h-6 w-6 fill-white text-blue-600 '} />
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* {modalOpen && <TwoFactorModal onClose={() => setModalOpen(false)} />} */}
    </div>
  );
};

export default Profile;
