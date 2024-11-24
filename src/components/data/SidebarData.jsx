import { Icons } from './Icons';

const SidebarData = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/',
    icon: <Icons.RxDashboard size='24px' />,
  },
  {
    id: 2,
    name: 'Customer Management',
    link: '/customer-management',
    icon: <Icons.GrGroup size='24px' />,
  },
  {
    id: 3,
    name: 'Employee Management',
    link: '/employee-management',
    icon: <Icons.HiOutlineUserGroup size='24px' />,
  },
  {
    id: 4,
    name: `Billing and Rate Settings`,
    link: '/billing-rate-settings',
    icon: <Icons.RiMoneyDollarCircleLine size='24px' />,
  },
  {
    id: 5,
    name: 'Transaction History',
    link: '/transaction-history',
    icon: <Icons.FaRegNewspaper size='24px' />,
  },
];

const BottomSidebarData = [
  {
    id: 6,
    name: 'Settings',
    link: '/settings',
    icon: <Icons.IoSettingsOutline size='24px' />,
  },
];

export { SidebarData, BottomSidebarData };
