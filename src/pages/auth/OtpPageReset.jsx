import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import Timer from '@/components/utils/Timer';
import { GoChevronLeft } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'sonner';

const OtpPageReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = import.meta.env.VITE_APP_URL;
  const [loading, setLoading] = useState(true);

  // const formData = location.state?.email || '';
  const formData = location.state?.email ? location.state.email : '';

  console.log('Formdata email:', formData);
  // const [otp, setOtp] = useState('');

  // const handleChange = (e) => {
  //   setOtp(e.target.value);
  // };
  const [otp, setOtp] = useState(['', '', '', '']); // 4 input fields

  // Handle changes for each OTP field
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value === '' || /^[0-9]$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      const otpValue = otp.join('');
      console.log('written otp', otpValue);
      // Auto-focus next input if the current input is filled
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle focus on backspace (moving to the previous input field)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Handle OTP submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const otpValue = otp.join('');
  //   console.log('OTP Submitted:', otpValue);

  //   // Perform your API request or validation here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    try {
      const response = await fetch(`${baseURL}/auth/verifyPasswordResetToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData,
          token: otpValue,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.message === 'User verified successfully') {
        // toast.success();
        navigate(`/reset-password/${json.data.userId}`, {
          state: {
            id: json.data.userId,
          },
        });
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      toast.error(error.message);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    const resendBody = { emailOrPhone: formData, purpose: 'password_reset' };
    try {
      const response = await fetch(`${baseURL}/admin/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendBody),
      });

      if (!response.ok) {
        toast.error('Failed to send code to your email');
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Registration success:', json);

      toast.success('Code sent to your email');
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  if (!location.state?.isFromForgetPassword) {
    localStorage.clear();
    return <Navigate to='/login' />;
  }
  return (
    <div className='flex flex-1 h-screen bg-white flex-col items-center justify-center gap-4'>
      <div className='w-full absolute top-5 px-10  flex items-center justify-between'>
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
      <div className='flex gap-8 flex-col bg-white p-8 rounded-lg shadow-3xl items-center justify-center'>
        <h1 className='font-semibold text-2xl'>Verify your Code to Reset</h1>
        {console.log(formData)}
        <form
          className='flex flex-col w-96 gap-8 px-5 items-center'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-center'>
            <h1 className='text-center'>
              Enter the passcode you just received on your email address &nbsp;
              <span className='font-semibold'>{formData}</span>
            </h1>
          </div>
          <div className='flex '>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type='text'
                maxLength='1'
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className='h-12 w-12 text-center mr-2 border rounded-lg'
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type='submit'
            className='border text-white bg-blue-700 hover:bg-blue-500 w-72 p-2 rounded-lg'
          >
            Verify
          </button>
          {loading ? (
            <Timer
              initialTime={20}
              onTimeEnd={() => {
                setLoading(false);
              }}
            />
          ) : (
            <div className='flex'>
              <h1>{`Didn't receive a code?`}</h1>
              <button
                className='ml-2 text-blue-700 font-semibold'
                onClick={handleResend}
              >
                Resend
              </button>
            </div>
          )}
          {/* <button className='text-blue-500' onClick={handleResend}>
            Resend OTP
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default OtpPageReset;
