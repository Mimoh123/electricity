import { useEffect, useState } from 'react';
import { Icons } from '../data/Icons';

// HandleAddNewFieldModal.js
const HandleAddNewFieldModal = ({ onClose, data, handleNewDataEntry }) => {
  const [newData, setNewData] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDataEntry = () => {
    handleNewDataEntry(formData);
    onClose();
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40 p-7'>
      <div className='bg-white p-4 rounded-lg shadow-xl relative flex flex-col'>
        <h2 className='text-xl font-semibold mb-4'></h2>
        <div className='flex flex-col p-4 gap-2'>
          {newData.map((data, index) => (
            <div key={index} className='flex justify-between p-2 items-center'>
              <span className='text-sm p-2'>{data}</span>
              <input
                className='border outline-none p-2 rounded-md'
                name={data}
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
          ))}
        </div>
        <button
          className='border bg-black text-white p-2 rounded-md w-48 self-center'
          onClick={handleDataEntry}
        >
          Submit
        </button>
        <button
          className='absolute top-2 right-2 p-2 rounded-md'
          onClick={onClose}
        >
          <Icons.IoIosClose size='24px' />
        </button>
      </div>
    </div>
  );
};

export default HandleAddNewFieldModal;
