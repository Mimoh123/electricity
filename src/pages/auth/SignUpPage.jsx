import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { toast } from 'sonner';
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const baseURL = import.meta.env.VITE_APP_URL;
  console.log('baseURL', baseURL);

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.email),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Registration success:', json);
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const response = await fetch(`${baseURL}/admin/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log('response', response);
        const json = await response.json();
        console.log('json ', json);
        if (json.success === false) {
          if (json.message.includes('phoneNumber_1 dup key'))
            toast.error('Failed to Add Customer', {
              description: 'Duplicate phone number ',
            });
          else if (json.message.includes('Email already'))
            toast.error('Failed to Add Customer', {
              description: 'Duplicate email address ',
            });
          throw new Error(`Response status: ${json}`);
        }

        console.log('Registration success:', json);
        navigate('/otp', {
          state: { email: formData.email, isFromSignUp: true },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`Passwords don't match`);
    }
  };
  // bg-[#e6e6fa]
  return (
    <div className='flex flex-1 h-screen bg-[#e6e6fa] flex-col items-center justify-center gap-4'>
      <div className='flex gap-4 flex-col bg-white px-20  p-8 rounded-lg shadow-3xl'>
        <div className='flex items-center'>
          <FaChevronLeft
            className='hover:cursor-pointer'
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className='font-semibold text-2xl ml-5 '>Register </h1>
        </div>

        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <label className='p-1'>Name</label>
          <input
            className='w-96 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='Eg: John Doe'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label className='p-1'>Email</label>
          <input
            className='w-96 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='Eg: abc@gmail.com'
            name='email'
            type='email'
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label className='p-1'>Phone Number</label>
          <input
            className='w-96 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='Eg: 9712314234'
            name='phoneNumber'
            type='number'
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <label className='p-1'>Password</label>
          <input
            className='w-96 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='Eg: ***********'
            minLength={'8'}
            required
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />

          <label className='p-1'>Confirm Password</label>
          <input
            className='w-96 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='Eg: ***********'
            minLength={'8'}
            required
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* <button className='text-sm self-end' onClick={handleForgotPassword}>
            Forgot Password?
          </button> */}

          <button
            type='submit'
            className='border mt-5 text-white bg-blue-600 w-96 p-2 rounded-lg'
          >
            Sign Up
          </button>
        </form>

        <h1 className='text-sm'>
          Already have an account?
          <button className='text-blue-500' onClick={() => navigate('/login')}>
            Sign In
          </button>
        </h1>
      </div>
    </div>
  );
};

export default SignUpPage;
