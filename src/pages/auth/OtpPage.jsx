import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import Timer from '@/components/utils/Timer';
import { toast } from 'sonner';

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = import.meta.env.VITE_APP_URL;
  const [loading, setLoading] = useState(true);
  const formData = location.state?.email || '';
  const [otp, setOtp] = useState(['', '', '', '']);
  console.log(formData);

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
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    try {
      const response = await fetch(`${baseURL}/auth/verify`, {
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
      console.log('json', json);
      if (json.success === true) {
        navigate('/login');
      } else {
        toast.error(json.message);
        throw new Error();
      }

      console.log('Registration success:', json);
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    const resendBody = { emailOrPhone: formData, purpose: 'verification' };
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
  if (!location.state?.isFromSignUp) {
    localStorage.clear();
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='flex flex-1 h-screen bg-[#e6e6fa] flex-col items-center justify-center gap-4'>
      <div className='flex gap-8 flex-col bg-white p-8 rounded-lg shadow-3xl items-center justify-center'>
        <div className=' px-5 flex items-center justify-start w-full'>
          <FaAngleLeft
            className='hover:cursor-pointer ml-[-10px]'
            onClick={() => {
              navigate(-1);
            }}
          />
          <h1 className=' font-semibold text-2xl ml-5'>Verify your Code</h1>
        </div>

        <form
          className='flex flex-col gap-8 items-center'
          onSubmit={handleSubmit}
        >
          <label className='p-1 max-w-[80%]'>
            Enter the passcode you just received on your email address
            {formData.email}
          </label>
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
            className='border text-white bg-blue-600 w-72 p-2 rounded-lg'
          >
            Verify
          </button>
          <div>
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
                  type='button'
                  className='ml-2 text-blue-700 font-semibold'
                  onClick={handleResend}
                >
                  Resend
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
