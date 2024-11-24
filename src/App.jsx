import { Outlet } from 'react-router-dom';
import Sidebar from './pages/layout/Sidebar';
import { useEffect, useState } from 'react';
import Navbar from './pages/layout/Navbar';
import BottomBar from './pages/layout/BottomBar';

import { Toaster } from '@/components/ui/sonner';

const App = () => {
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1024) {
  //       setSidebarOpen(false);
  //     } else {
  //       setSidebarOpen(true);
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  // bg-[#e6e6fa]
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className={`lg:flex lg:static z-10`}>
        <Sidebar />
      </div>

      <div className='flex flex-col flex-1 overflow-hidden'>
        <main className='flex flex-1 flex-col overflow-auto p-12   bg-[#e6e6fa] '>
          <Outlet />
        </main>
        <BottomBar />
        <Toaster richColors />
      </div>
    </div>
  );
};

export default App;
