import { getUserData, removeUserData } from "./Storage"

export const isAuthenticated = ()=>{
    return getUserData()!=null?true:false;
}//storage la irukkira data null ah illanna true null enda false return pannum

export const logout=()=>{
    removeUserData();
}