import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import AdminDashboard from '../../pages/SidebarLayout/AdminDashboard';
import BillingRateSettings from '../../pages/SidebarLayout/BillingRateSettings';
import CustomerManagement from '../../pages/SidebarLayout/CustomerManagement';
import EmployeeManagement from '../../pages/SidebarLayout/EmployeeMangement';
import Settings from '../../pages/SidebarLayout/Settings';
import LoginPage from '../../pages/auth/LoginPage';
import SignUpPage from '../../pages/auth/SignUpPage';
import OtpPage from '../../pages/auth/OtpPage';
import AuthLayout from '../../pages/auth/AuthLayout';
import AddCustomer from '../../pages/utils/AddCustomer';
import ViewDetails from '@/pages/utils/ViewDetails';
import EditDetails from '@/pages/utils/EditDetails';
import AddEmployee from '@/pages/utils/AddEmployee';
import ViewEmployeeDetails from '@/pages/utils/ViewEmployeeDetails';
import AddMeterRate from '@/pages/utils/AddMeterRate';
import OtpPageLogin from '@/pages/auth/OtpPageLogin';
import QrView from '@/pages/utils/QrView';
import TransactionHistory from '@/pages/utils/TransactionHistory';
import ViewDetailsTransaction from '@/pages/utils/ViewDetailsTransaction';
import EditMeterRate from '@/pages/utils/EditMeterRate';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import OtpPageReset from '@/pages/auth/OtpPageReset';
import ResetPassword from '@/pages/auth/ResetPassword';
import { Toaster } from 'sonner';
import Print from '@/Print/Print';
import CustomerBills from '@/pages/utils/CustomerBills';
import EditBill from '@/pages/utils/EditBill';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: (
            <AuthLayout>
              <AdminDashboard />
            </AuthLayout>
          ),
        },
        {
          path: '/billing-rate-settings',
          element: (
            <AuthLayout>
              <BillingRateSettings />
            </AuthLayout>
          ),
        },
        {
          path: '/customer-management',
          element: (
            <AuthLayout>
              <CustomerManagement />
            </AuthLayout>
          ),
        },
        {
          path: '/employee-management',
          element: (
            <AuthLayout>
              <EmployeeManagement />
            </AuthLayout>
          ),
        },
        {
          path: '/settings',
          element: (
            <AuthLayout>
              <Settings />
            </AuthLayout>
          ),
        },
        {
          path: '/customer-management/add-customer',
          element: (
            <AuthLayout>
              <AddCustomer />
            </AuthLayout>
          ),
        },
        {
          path: '/customer-management/details/:id',
          element: (
            <AuthLayout>
              <ViewDetails />
            </AuthLayout>
          ),
        },
        {
          path: '/customer-management/edit-details/:id',
          element: (
            <AuthLayout>
              <EditDetails />
            </AuthLayout>
          ),
        },
        {
          path: '/employee-management/add-employee',
          element: (
            <AuthLayout>
              <AddEmployee />
            </AuthLayout>
          ),
        },
        {
          path: '/employee-management/view-employee-details/:id',
          element: (
            <AuthLayout>
              <ViewEmployeeDetails />
            </AuthLayout>
          ),
        },
        {
          path: '/billing-rate-settings/add-meter-rate',
          element: (
            <AuthLayout>
              <AddMeterRate />
            </AuthLayout>
          ),
        },
        {
          path: '/customer-management/Qr-view/:name',
          element: (
            <AuthLayout>
              <QrView />
            </AuthLayout>
          ),
        },
        {
          path: '/transaction-history',
          element: (
            <AuthLayout>
              <TransactionHistory />
            </AuthLayout>
          ),
        },
        {
          path: '/transaction-history/view-details/:id',
          element: (
            <AuthLayout>
              <ViewDetailsTransaction />
            </AuthLayout>
          ),
        },
        {
          path: '/billing-rate-settings/edit-meter-rate/:id',
          element: (
            <AuthLayout>
              <EditMeterRate />
            </AuthLayout>
          ),
        },
        {
          path: '/customer-management/bills/:id',
          element: (
            <AuthLayout>
              <CustomerBills />
            </AuthLayout>
          ),
        },
        {
          path: '/transaction-history/edit-bill/:id',
          element: (
            <AuthLayout>
              <EditBill />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <>
          <LoginPage />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/signup',
      element: (
        <>
          <SignUpPage />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/otp',
      element: (
        <>
          <OtpPage />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/otp-Login',
      element: (
        <>
          <OtpPageLogin />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/forgot-password',
      element: (
        <>
          <ForgotPassword />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/otp-page-reset/:email',
      element: (
        <>
          <OtpPageReset />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/reset-password/:id',
      element: (
        <>
          <ResetPassword />
          <Toaster richColors />
        </>
      ),
    },
    {
      path: '/print-transaction/:id',
      element: <Print />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
