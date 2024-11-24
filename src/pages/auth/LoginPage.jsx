import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import Spinner from '../utils/Spinner';
const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [divOpen, setDivOpen] = useState(false);
  const [pwSeen, setPwSeen] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_APP_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('state of divOPne', divOpen);
  }, [divOpen]);
  const handleForgotPassword = () => {
    navigate('/forgot-password');
    // try {
    //   const forgotPasswordBody = {
    //     email: formData.emailOrPhone,
    //   };
    //   console.log('forgotpasswordbody', forgotPasswordBody);
    //   const response = await fetch(`${baseURL}/admin/forgotPassword`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(forgotPasswordBody),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Response status: ${response.status}`);
    //   }

    //   const json = await response.json();
    //   console.log(json);
    //   if (json.success) {
    //     setDivOpen(true);
    //   }
    // } catch (error) {
    //   console.error('Error during registration:', error.message);
    // }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setDivOpen(false);
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);
      if (!response.ok) {
        console.log(response.status);
        if (response.status === 401) {
          toast.error('Invalid email or password', {
            description: `Admin credentials didn't match`,
          });
          return;
        }

        // throw new Error(`Response status: ${response.status}`);
      }

      // console.log(response.message);
      const json = await response.json();
      // console.log(json);
      if (json.message == '2FA token sent to your email') {
        navigate('/otp-Login', {
          state: { email: formData.emailOrPhone, fromLogin: true },
        });
        console.log('Response from Login:', json);
      } else {
        localStorage.setItem('access_token', json.data.accessToken);
        localStorage.setItem('refresh_token', json.data.refreshToken);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('Admin-email', formData.emailOrPhone);
        console.log('Login successful:', json);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.message === ' Response status: 401') {
        console.log('inside the component');
        toast.error('Invalid email or password');
      }
    }
  };
  return (
    <div className='flex relative flex-1 h-screen bg-[#e6e6fa] flex-col items-center justify-center gap-4'>
      <div className='flex gap-4 flex-col bg-white p-8 rounded-lg shadow-3xl'>
        <h1 className='font-semibold text-2xl'>Welcome Back</h1>

        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <label className='p-1'>Email</label>
          <input
            className='w-72 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='xyz@gmail.com'
            name='emailOrPhone'
            type='email'
            value={formData.emailOrPhone}
            onChange={handleChange}
          />

          <label className='p-1'>Password</label>
          <div className='relative flex items-center'>
            <input
              className='w-72 border p-2 bg-white rounded-lg border-slate-300'
              placeholder='Eg: ***********'
              type={pwSeen ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <div
              className='absolute right-2 hover:cursor-pointer'
              onClick={() => {
                setPwSeen(!pwSeen);
              }}
            >
              {pwSeen ? (
                <FaEye className='text-gray-400' />
              ) : (
                <FaEyeSlash className='text-gray-400' />
              )}
            </div>
          </div>

          <button
            type='button'
            className='text-sm self-end'
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          <button
            type='submit'
            className='border flex justify-center text-white bg-blue-600 w-72 p-2 rounded-lg'
          >
            {isLoading ? (
              <Spinner classname={'h-6 w-6 fill-white text-blue-600 '} />
            ) : (
              'Log In'
            )}
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

export default LoginPage;
