import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaAngleLeft } from 'react-icons/fa';
import { GoChevronLeft } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
  });
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_APP_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.emailOrPhone);
    try {
      const forgotPasswordBody = {
        email: formData.emailOrPhone,
      };
      console.log('forgotpasswordbody', forgotPasswordBody);
      const response = await fetch(`${baseURL}/admin/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forgotPasswordBody),
      });
      // if (!response.ok) {
      //   throw new Error(`Response status: ${response.status}`);
      // }
      console.log(response);
      const json = await response.json();
      if (response.status === 500) {
        toast.error(`${json.message}`);
      }

      console.log(json);
      if (json.message == 'Password reset token sent to your email') {
        navigate(`/otp-page-reset/${formData.emailOrPhone}`, {
          state: {
            email: formData.emailOrPhone,
            isFromForgetPassword: true,
          },
        });
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  return (
    <div className='flex relative flex-1 h-screen bg-white flex-col items-center justify-center gap-4'>
      <div className='absolute w-full px-10 items-center top-5 flex justify-between mb-2'>
        <GoChevronLeft
          className='hover:cursor-pointer '
          size={'40px'}
          onClick={() => {
            navigate(-1);
          }}
        />
        <RxCross1
          className='hover:cursor-pointer'
          size={'30px'}
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
      <div className='flex gap-4 flex-col  bg-white p-8 rounded-lg shadow-3xl'>
        <h1 className='flex items-center justify-center font-bold text-2xl'>
          Forgot Password
        </h1>
        <h1 className='text-gray-400 mt-5'>
          Please enter your email to reset the password
        </h1>

        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <label className='p-1'>Your Email</label>
          <input
            className='w-full border p-2 bg-white rounded-lg border-slate-300'
            placeholder='xyz@gmail.com'
            name='emailOrPhone'
            type='email'
            value={formData.emailOrPhone}
            onChange={handleChange}
          />

          <button
            type='submit'
            className=' mt-5 border text-white bg-blue-700 w-full p-2 rounded-lg'
          >
            Reset Password
          </button>
        </form>

        <h1 className='text-sm'>
          Dont have an account?
          <button className='text-blue-500' onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </h1>
      </div>
    </div>
  );
};

export default ForgotPassword;
