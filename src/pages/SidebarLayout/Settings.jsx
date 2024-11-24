import { useState } from 'react';
import { SettingsData } from '../../components/data/SettingsData';
import TwoFactorModal from '../../components/utils/TwoFactorModal';
import AccountSecurity from '../utils/AccountSecurity';
import Profile from '../utils/Profile';
import Backup from '../utils/Backup';

const Settings = () => {
  const [activeButton, setActiveButton] = useState('Profile');

  const handleOnClick = (name) => {
    setActiveButton(name);
  };

  return (
    <div className='flex flex-col gap-4 justify-between flex-1'>
      <h1 className='text-black text-2xl font-medium'>Settings</h1>

      <div className='flex md:flex-row flex-col flex-1 gap-32'>
        <div className='flex  flex-col  p-4 rounded-md bg-white  overflow-y-auto md:h-52 max-h-[400px] '>
          {SettingsData.map((data) => (
            <button
              key={data.id}
              className={`flex items-center hover:bg-gray-100 p-4 ${
                activeButton === data.name ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleOnClick(data.name)}
            >
              <span className='px-4'>{data.icon}</span>
              <span>{data.name}</span>
            </button>
          ))}
        </div>

        <div className='flex-1'>
          {activeButton === 'Profile' && <Profile />}
          {activeButton === 'Account Security' && <AccountSecurity />}
          {/* {activeButton === "Backup" && <Backup />} */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
