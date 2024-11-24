import { useState } from "react";

const TwoFactorModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");

  const handleSendCode = () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }
    alert("Code sent to " + phoneNumber);
  };

  const handleVerifyCode = () => {
    if (!code) {
      alert("Please enter the code.");
      return;
    }
    alert("Code verified!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40 p-7">
      <div className="bg-white p-4 rounded-lg shadow-xl relative">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Two-Factor Authentication
        </h2>

        <div className="flex flex-col mb-6">
          <h1>Enter Phone Number</h1>
          <input
            type="text"
            className="border w-72 p-2 rounded-md border-black outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className="text-white bg-black w-48 rounded-md p-2 self-center mt-4"
            onClick={handleSendCode}
          >
            Send Code
          </button>
        </div>

        <div className="flex flex-col mb-4">
          <h1>Enter Verification Code</h1>
          <input
            type="text"
            className="border w-72 p-2 rounded-md border-black outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className="text-white bg-black w-48 rounded-md p-2 self-center mt-4"
            onClick={handleVerifyCode}
          >
            Verify Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
