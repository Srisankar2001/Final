export const storeUserData=(data)=>{
    // localStorage ello browser ullayum anuka koodiya js object
    localStorage.setItem('idToken',data)
 }
 
 export const getUserData =()=>{
    return localStorage.getItem('idToken');
 }//intha function storage la irunthu data ah return pannirathukku vachchirukkan
 
 export const removeUserData=()=>{
    localStorage.removeItem('idToken')
 }