import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const register = async({name,roll_number,phone_number}) =>{
    try {
        console.log(name,roll_number,phone_number);
        const res = await axios.post(backendUrl+'api/auth/register',{name:name,roll_number:roll_number,phone_number:phone_number});
        console.log("res"+ res);
        return res.data;
    } catch (error) {
        console.log(error);
        return {data:{success:false}};
    }
}

export const registerWithOTP = async({roll_number,otp}) =>{
    try {
        const res = await axios.post(backendUrl+'api/auth/verify-otp',{otp:otp,roll_number:roll_number});
        return res.data;
    } catch (error) {
        console.log(error);
        return {data:{success:false}};
    }
}

