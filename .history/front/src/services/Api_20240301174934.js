import axios from "axios"
import { getUserData } from "./Storage";

const USER_DETAILS_URL=`/accounts:lookup`;//?key=${API_KEY}
export const RegisterApi = (inputs)=>{
    let data={name:inputs.name,emailId:inputs.email,password:inputs.password,phoneNumber:inputs.phoneNumber}
    return axios.post(`http://localhost:8080/signup`,data)
}
export const VerifyApi = (inputs)=>{
   
    let data=inputs.otp;
    let token=getUserData();
    return axios.post(
        `http://localhost:8080/verify?otp=${data}`,
        {}, // empty object as the second argument if no data is being sent in the request body
        {
            headers: {
                'authorization': token
            }
        }
    );
}
export const LoginApi = (inputs)=>{
    let data={emailId:inputs.email,password:inputs.password}
    return axios.post(`http://localhost:8080/login`,data)
}
export const SigOutApi = ()=>{
    
    return axios.post(`http://localhost:8080/signOut`)
}

export const UserDetailsApi=()=>{
    let data={idToken:getUserData()}
    return axios.post(USER_DETAILS_URL,data)//ithula namakku return aaka porathu oru promise
}





