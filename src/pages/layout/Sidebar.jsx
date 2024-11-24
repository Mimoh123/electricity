import {
  SidebarData,
  BottomSidebarData,
} from '../../components/data/SidebarData'; // Corrected import
import Logo from '../../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Icons } from '../../components/data/Icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const navigate = useNavigate();
  const [windowSizeLg, setWindowSizeLg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setWindowSizeLg(false);
      } else {
        setWindowSizeLg(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear('refresh_token');
    localStorage.clear('access_token');
    localStorage.clear('Admin-email');
    navigate('/login');
  };

  return (
    <div
      className={`flex flex-col h-screen border-r py-4 min-w-64 overflow-y-auto border-black bg-[#333333] ${
        !windowSizeLg ? 'hidden' : ''
      }`}
    >
      <div className='flex p-4  mb-10 items-center'>
        <img src={Logo} />
        {/* <button className="lg:hidden">
          <Icons.CgChevronLeftO size="28px" onClick={handleChevronClick} />
        </button> */}
      </div>
      <div className='flex flex-col justify-between flex-1'>
        <div className='flex flex-col'>
          {SidebarData.map((sidebarItems) => {
            const isActive =
              location.pathname.startsWith(sidebarItems.link) &&
              !(sidebarItems.link === '/' && location.pathname !== '/');
            return (
              <button
                key={sidebarItems.id}
                className={`flex items-center hover:bg-black active:bg-black text-white w-full p-2 ${
                  isActive ? 'bg-black' : ''
                }`}
                onClick={() => navigate(sidebarItems.link)}
              >
                <span className='p-2'>{sidebarItems.icon}</span>
                <h1>{sidebarItems.name}</h1>
              </button>
            );
          })}
        </div>
        <div className='flex flex-col'>
          {BottomSidebarData.map((sidebarItems) => (
            <button
              key={sidebarItems.id}
              className='flex items-center hover:bg-black active:bg-black text-white w-full p-2'
              onClick={() => navigate(sidebarItems.link)}
            >
              <span className='p-2'>{sidebarItems.icon}</span>
              <h1>{sidebarItems.name}</h1>
            </button>
          ))}
          {/* <button
            className='flex items-center hover:bg-black active:bg-black text-white w-full p-2'
            onClick={handleLogout}
          >
            <span className='p-2'>
              <Icons.IoLogOutOutline />
            </span>
            <h1>Log Out</h1>
          </button> */}
          <AlertDialog>
            <AlertDialogTrigger className='flex pl-5  items-center hover:bg-black active:bg-black text-white w-full p-3'>
              Log out
            </AlertDialogTrigger>
            <AlertDialogContent>
              {' '}
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will erase all data from this device and take you back to
                  the login screen
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='p-0 hover:bg-red-800'>
                  <Button
                    className='w-full bg-red-800 hover:bg-red-800 hover:brightness-150'
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
