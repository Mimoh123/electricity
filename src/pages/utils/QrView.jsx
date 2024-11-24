import { useState, useEffect, react } from 'react';
import { Icons } from '../../components/data/Icons';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function QrView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || '';
  console.log(name);
  return (
    <div className='flex flex-col'>
      <section className='flex items-center '>
        <Icons.FiChevronLeft
          size='24px'
          className='hover:cursor-pointer'
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className='text-2xl ml-5'>QR</h1>
      </section>
      <section>
        <h1>{name}</h1>
      </section>
    </div>
  );
}

export default QrView;
