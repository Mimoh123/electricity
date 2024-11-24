import { Switch } from "@mui/material";

const Backup = () => {
  return (
    <div className="bg-white flex flex-col p-8 max-w-lg mx-auto rounded-xl shadow-lg min-h-full justify-around">
      <h1 className="text-2xl font-semibold text-center">Backup</h1>
      <div className="flex justify-around items-center">
        <h2 className="font-medium">Auto Backup</h2>
        <Switch defaultChecked />
      </div>
      <p className="text-gray-500">
        Enabling backup authentication ensures you have an alternative method to
        access your account if you lose access to your primary device. This
        provides an additional layer of security and peace of mind in case of
        emergencies.
      </p>
      <div className="flex justify-around items-center">
        <h1>Frequency</h1>
        <select className="border bg-white text-black px-4 py-2 rounded-md">
          <option>Daily</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>
      <div className="flex justify-around items-center">
        <h1>Last Backup</h1>
        <h1>3 weeks ago</h1>
      </div>
      <div className="flex justify-around items-center">
        <h1>Backup</h1>
        <button className="text-white bg-blue-500 w-32 rounded-md p-2">
          Backup Now
        </button>
      </div>
      <div className="flex justify-around items-center">
        <h1>Restore</h1>
        <button className="text-white bg-blue-500 w-36 rounded-md p-2">
          Restore Backup
        </button>
      </div>
    </div>
  );
};

export default Backup;
