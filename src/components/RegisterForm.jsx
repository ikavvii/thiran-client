import { useState } from "react";
import { register,registerWithOTP } from "../services/registerService";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll_number: "",
    phone_number: "",
  });

  const [regCompleted, setRegCompleted ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = !regCompleted ? await register(formData): await registerWithOTP(formData);
        if(res.data.success){
            const msg = !regCompleted ? "Registered Successfully... \nEnter OTP sent to official mail. ":"Successfully Completed Registration.";
            toast.success(msg);
            setRegCompleted(true);
        }
    } catch (error) {
            toast.error("Error. Please Try again...")
    }
  };

  return (
    <div className="flex rounded-2xl bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-300 items-center justify-center !p-5">
      <form onSubmit={(e)=>handleSubmit(e)} className=" p-6  w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <div className="flex flex-col justify-center items-end gap-3">
          {!regCompleted&&<div className="w-full">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full  border rounded-lg !px-2 !py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>}
        {!regCompleted&&
          <div className="w-full">
            <label className="block mb-1 font-medium">Roll Number</label>
            <input
              type="text"
              name="roll_number"
              value={formData.roll_number}
              onChange={handleChange}
              className="w-full border rounded-lg !px-2 !py-1  focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>}
    {!regCompleted&&
          <div className="w-full">
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border rounded-lg !px-2 !py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>}
    {regCompleted&&
        <div className="w-full">
            <label className="block mb-1 font-medium">OTP</label>
            <input
              type="number"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full border rounded-lg !px-2 !py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    }
          <button
          type="submit"
          className="w-fit !px-2 bg-violet-300 text-white !py-1 rounded-lg hover:bg-violet-400"
        >
          Submit
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default RegisterForm;
