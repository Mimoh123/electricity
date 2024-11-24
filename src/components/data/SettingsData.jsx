import { Icons } from './Icons';

export const SettingsData = [
  {
    id: 1,
    name: 'Profile',
    icon: <Icons.FaUser />, // Example icon for the profile
    description:
      'Manage your personal information, update your profile details.',
  },
  {
    id: 2,
    name: 'Account Security',
    icon: <Icons.FaShieldAlt />, // Example icon for Arc Security
    description:
      'Update security settings, configure two-factor authentication and more.',
  },
  {
    id: 3,
    name: 'Backup',
    icon: <Icons.FaCloud />, // Example icon for Backup (you can replace with appropriate icon)
    description: 'Manage backup settings, schedule backups, and restore data.',
  },
  // {
  //   id: 4,
  //   name: "Help and Support",
  //   icon: <Icons.FaLifeRing />, // Example icon for Help and Support
  //   description: "Access help resources, contact support, and view FAQs.",
  // },
];
