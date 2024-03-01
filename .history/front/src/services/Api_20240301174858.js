import axios from "axios"
import { getUserData } from "./Storage";
// // axios endrathu oru library ithu jsla fetch()use pannira maari
// axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1";
// const API_KEY="AIzaSyB-fb0f-9xubt_tJqqizz7mEMaDbL6qaFI"
// const REGISTER_URL=`/accounts:signUp?key=${API_KEY}`;
// const LOGIN_URL=`/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL=`/accounts:lookup`;//?key=${API_KEY}
export const RegisterApi = (inputs)=>{
    let data={name:inputs.name,emailId:inputs.email,password:inputs.password,phoneNumber:inputs.phoneNumber}
    return axios.post(`http://localhost:8080/signup`,data)
}
export const VerifyApi = (inputs)=>{
    // let data={otp:input.otp}
    // let token=getUserData();
    // console.log(token)
    // return axios.post(`http://localhost:8080/verify`,data
    // ,{headers: {
    //     'Content-Type':'application/json',
    //     'authorization':token
    //   }
    // }
    // )
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





// export const RegisterApi = (inputs)=>{
//     let data={userName:inputs.name,email:inputs.email,password:inputs.password}
//     return axios.post("http://localhost:8080/api/v1/auth/register",data)
// }

// export const LoginApi = (inputs)=>{
//     let data={email:inputs.email,password:inputs.password}
//     return axios.post("http://localhost:8080/api/v1/auth/login",data)
// }
// export const VerifyApi = (inputs)=>{
//     let data={email:inputs.email,otp:inputs.otp}
//     return axios.post("http://localhost:8080/api/v1/auth/verify",data)
// }
// export const UserDetailsApi=()=>{
//     let data={idToken:getUserData()}
//     return axios.post(USER_DETAILS_URL,data)//ithula namakku return aaka porathu oru promise
// }