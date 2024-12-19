import { useEffect, useState } from 'react';

import { Switch } from '@mui/material';
import { axiosInstance } from '../auth/config';
import { toast } from 'sonner';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import Spinner from './Spinner';

const AccountSecurity = () => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(null);
  const [initial, setInitial] = useState(null);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleModalChange = (e) => {
    setModalOpen(e.target.checked);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  useEffect(() => {
    const GetUserDetails = async () => {
      const response = await axiosInstance.get('/auth');

      setInitial(response.data.data.isTwoFaEnabled);
      setModalOpen(response.data.data.isTwoFaEnabled);
    };
    GetUserDetails();
  }, []);

  const handleChangePassword = (e) => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axiosInstance.put('auth', {
      enable: modalOpen,
    });

    if (response.data.success) {
      toast.success(response.data.message);
    }

    if (newPassword && oldPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error('Passwords donot match', {
          description: 'New password and confirm password dont match',
        });
      } else {
        try {
          const changePw = await axiosInstance.put('/admin/change/Password', {
            oldPassword,
            newPassword,
            confirmPassword,
          });

          if (changePw) {
            toast.success('Password changed Successfully', {
              description: 'Password has been changed successfully',
            });
            setConfirmPassword('');
            setNewPassword('');
            setOldPassword('');
          }
        } catch (error) {
          console.log('error is ', error);
          if (error.response) {
            if (error.status === 401) {
              toast.error('Invalid old password');
            } else {
              toast.error(
                error.response.data.message || 'Error changing password'
              );
            }
          } else {
            // If no response from the server, it's a network or other issue
            toast.error('An error occurred. Please try again later.');
          }
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='bg-white flex flex-col p-8 max-w-lg mx-auto rounded-xl shadow-lg min-h-full justify-around'>
      <h1 className='text-2xl font-semibold text-center'>Account Security</h1>
      <form
        className=' flex flex-col p-8 max-w-lg mx-auto  min-h-full justify-around'
        onSubmit={handleSave}
      >
        <div className='flex justify-between items-center'>
          <h2 className='font-medium'>Two Factor Authentication</h2>

          <Switch onChange={handleModalChange} checked={modalOpen} />
        </div>
        <p className='text-gray-500'>
          Two-factor authentication adds an extra layer of security to your
          account by requiring both a password and a second code.
        </p>

        <button className='font-medium'>Change Password</button>

        <div className='space-y-4'>
          <div className='flex flex-col'>
            <label className='text-sm font-medium'>Old Password</label>
            <div className='border relative flex items-center'>
              <input
                type={oldPasswordVisible ? 'text' : 'password'}
                className='w-full border-none rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                value={oldPassword}
                onChange={handleOldPassword}
              />
              <div
                className='absolute right-2 '
                onClick={() => {
                  setOldPasswordVisible(!oldPasswordVisible);
                }}
              >
                {oldPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-medium'>New Password</label>
            <div className='border relative flex items-center'>
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                className=' w-full  rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                value={newPassword}
                onChange={handleNewPassword}
              />
              <div
                className='absolute right-2 '
                onClick={() => {
                  setNewPasswordVisible(!newPasswordVisible);
                }}
              >
                {newPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-medium'>Confirm Password</label>
            <div className='border relative flex items-center'>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                className='border-none w-full rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200'
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <div
                className='absolute right-2 '
                onClick={() => {
                  setConfirmPasswordVisible(!confirmPasswordVisible);
                }}
              >
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='w-full flex justify-center items-center   bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition'
          >
            {isLoading ? (
              <Spinner classname={'h-6 w-6 fill-white text-blue-600 '} />
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSecurity;
