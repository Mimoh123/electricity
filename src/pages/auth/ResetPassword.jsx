import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GoChevronLeft } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const location = useLocation();
  const id = location.state.id;
  console.log('id is ', id);
  // const [divOpen, setDivOpen] = useState(false);
  // const [pwSeen, setPwSeen] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_APP_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    e.preventDefault();
    const postingBody = {
      userId: id,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const response = await fetch(`${baseURL}/admin/reset/Password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postingBody),
      });

      if (!response.ok) {
        toast.success('Couldnot change password');
      }
      console.log(response);
      const json = await response.json();
      console.log(json);
      if (json.message === 'Password has been reset successfully') {
        toast.success('Password changed successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className='flex relative flex-1 h-screen bg-whiteflex-col items-center justify-center gap-4'>
      <div className='flex flex-col bg-white py-20 px-20 rounded-lg items-center  shadow-3xl'>
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
        <h1 className='font-bold text-2xl mb-10'>Reset Password</h1>

        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <label className='p-1'>New Password</label>
          <input
            className='w-72 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='New password'
            name='newPassword'
            type='password'
            value={formData.newPassword}
            onChange={handleChange}
          />

          <label className='p-1'>Confirm Password</label>
          <input
            className='w-72 border p-2 bg-white rounded-lg border-slate-300'
            placeholder='Confirm Password'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type='submit'
            className='border text-white bg-blue-700 hover:bg-blue-500 mt-10 w-72 p-2 rounded-lg'
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
