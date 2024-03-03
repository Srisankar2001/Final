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

export const addToCart = async (userId, productId) => {
    try {
        console.log(`User: ${userId} ProductId: ${productId}`)
        let token = getUserData()
        const response = await axios.post("http://localhost:8080/addToCart", { "userId": userId, "productId" : productId  }, { headers: { 'authorization': token } });
        
        if (response.data.data !== null ) {
            // Product added successfully
            return "Product added";
        } else {
            // Product already added
            return "Already added";
        }
    } catch (error) {
        // Error occurred while adding product
        console.error("Error adding product :", error.message);
        throw error; // Re-throw the error to be handled by the caller
    }
};

export const ForgotPasswordApi = async (email) => {
    try {
        // Send POST request to server
        const encodedEmail = encodeURIComponent(email);
        const response = await axios.post(`http://localhost:8080/emailForResetPassword?email=${encodedEmail}`)
        // Return response data
        return response;
    } catch (error) {
        // Handle any errors
        console.error("Error in ForgotPasswordApi:", error);
        throw error;
    }
}

export const  PasswordChangeApi = async ( email , password ) => {
    try {
        // Send POST request to server
        const encodedEmail = encodeURIComponent(email);
        const encodedPassword = encodeURIComponent(password);
        
        const response = await axios.post(`http://localhost:8080/changePassword?email=${encodedEmail}&password=${encodedPassword}`);

        // Return response data
        return response;
    } catch (error) {
        // Handle any errors
        console.error("Error in ForgotPasswordApi:", error);
        throw error;
    }
}

export const VerifyEmailApi = (email,otp)=>{
   
    return axios.post(`http://localhost:8080/verifyotp?email=${email}&otp=${otp}`);
}