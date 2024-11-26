import Timer from '@/components/utils/Timer';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const OtpPageLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = import.meta.env.VITE_APP_URL;
  const [loading, setLoading] = useState(true);
  const [countdown, setCountDown] = useState(20);

  const formData = location.state?.email ? location.state.email : '';

  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value === '' || /^[0-9]$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      const otpValue = otp.join('');

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
      const response = await fetch(`${baseURL}/auth/2fa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData,
          token: `${otpValue}`,
        }),
      });

      const json = await response.json();

      if (json.message == '2FA verified successfully') {
        localStorage.setItem('access_token', json.data.accessToken);
        localStorage.setItem('refresh_token', json.data.refreshToken);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('Admin-email', formData);

        navigate('/');
      } else {
        toast.error('Invalid or expired token');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/admin/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData,
          purpose: '2fa',
        }),
      });
      toast.success('Code sent to your email');
      if (!response.ok) {
        toast.error('Failed to send code to email');
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  if (!location.state?.fromLogin) {
    localStorage.clear();
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex flex-1 h-screen bg-[#e6e6fa] flex-col items-center justify-center gap-4'>
      <div className='flex gap-8 flex-col bg-white p-8 rounded-lg shadow-3xl items-center justify-center'>
        <h1 className='font-semibold text-2xl'>Verify your Code to Login</h1>

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
          <button
            type='submit'
            className='border text-white bg-blue-600 w-72 p-2 rounded-lg'
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPageLogin;
