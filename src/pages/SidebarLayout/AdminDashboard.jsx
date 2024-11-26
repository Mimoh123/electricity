import { useEffect, useState } from 'react';
import { DashboardBoxData } from '../../components/data/DashboardBox';
import { axiosInstance } from '../auth/config';
import { ConsumptionChart } from '../utils/ConsumptionChart';

const AdminDashboard = () => {
  const [dashboardBoxData, setdashboardBoxData] = useState(DashboardBoxData);
  const fetchCountData = async () => {
    try {
      const response = await axiosInstance.get('/count/total');

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountData();

      const updatedDashboardData = dashboardBoxData.map((item) => {
        switch (item.name) {
          case 'Active Consumer':
            return {
              ...item,
              number: data.activeCustomers || 'Not found',
            };
          case 'Units Consumed':
            return {
              ...item,
              number: data.totalUnits || 'Not found',
            };
          case ' Total Revenue':
            return { ...item, number: data.revenue || '0' };
          case 'Active Employess':
            return {
              ...item,
              number: data.totalEmployee || 'Not found',
            };
          default:
            return item;
        }
      });
      setdashboardBoxData(updatedDashboardData);
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className='flex flex-col justify-between gap-y-14'>
      <h1 className='text-black  text-2xl font-bold flex flex-1'>
        Admin Dashboard
      </h1>

      <div className='flex justify-center sm:justify-between flex-wrap gap-4'>
        {dashboardBoxData.map((items) => (
          <div
            key={items.id}
            className='flex flex-col items-center border rounded-lg min-w-48 hover:opacity-60 hover:cursor-pointer border-[#699BF7] bg-white p-1'
          >
            <div className='w-full flex p-2  items-center'>
              <span className='p-2'>{items.icon}</span>
              <span className='font-medium'>{items.name}</span>
            </div>
            <h1 className='text-center w-full text-[#666666]'>
              {items.number}
            </h1>
          </div>
        ))}
      </div>
      <div className='w-full '>
        <ConsumptionChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
