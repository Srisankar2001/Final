import { useState } from 'react';
import './RegisterPage.css'
import { RegisterApi } from '../services/Api';
import { storeUserData } from '../services/Storage';
import {isAuthenticated} from '../services/Auth';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
export default function RegisterPage(){
    const initialStateErrors={
        email:{required:false},
        password:{required:false},
        name:{required:false},
        phoneNumber:{required:false},
        custom_error:null
    };

    // added by me
    const navigate=useNavigate();

    const [errors,setErrors]= useState(initialStateErrors);

    const [loading,setLoading]=useState(false);
    
    const handleSubmit=(event)=>{
        event.preventDefault();//browser can't load

        let errors =initialStateErrors;

        let hasError=false;
        if(inputs.name==""){
            errors.name.required=true;
            hasError=true;
        }
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!inputs.email.trim().match(emailRegex)) {
            errors.email.required = true;
            hasError = true;
        }
        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!inputs.password.trim().match(passwordRegex)) {
            errors.password.required = true;
            hasError = true;
        }
        if(inputs.phoneNumber==""){
            errors.phoneNumber.required=true;
            hasError=true;
        }

        if(!hasError){
            setLoading(true)
            //sending register api request
            RegisterApi(inputs).then((response)=>{
                //store panna
                // storeUserData(response.data.idToken);
                storeUserData(response.data.data.accessToken);
                
                // navigate(`/verify`);
            }).catch((err)=>{
                // if(err.response.data.error.message=="EMAIL_EXISTS"){
                //     setErrors({...errors,custom_error:"Already thus email has been registered!"})
                // }
                // else if(String(err.response.data.error.message).includes('WEAK_PASSWORD'))
                // {
                //     setErrors({...errors,custom_error:"Password should be at least 6 characters!"})
                // }
            }).finally(()=>{
                setLoading(false)
            })
        }

        setErrors({...errors});//nama mathina state ah intha function moolama koduthu maathikiram

    }
    
    const [inputs,setInputs]=useState({
        email:"",
        password:"",
        name:"",
        phoneNumber:""
        //ithula naama kodukkira name inputs la kuduthuruppame tag nama athe irukkanum appathaan setInputs function ah use pannika mudiyum
    })//inputs kkaana state

    const handleInput=(event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})

    }//ella inputs kku

if (isAuthenticated()){//true/false
     //Redirecting to Dashboard
    //ithukku naama react-router-dom endra package ah install pannanum
    return <Navigate to="/verify" />
}


    return(
        <div>
                <NavBar/>
        <section className="register-block">
        <div className="container">
           <div className="row ">
              <div className="col register-sec">
                 <h2 className="text-center">Register Now</h2>
                <form onSubmit={handleSubmit} className="register-form" action="" >
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
      
                    <input type="text" className="form-control" onChange={handleInput} name="name" id="" />
                    {
                    errors.name.required==true?
                        (<span className="text-danger" >
                        Name is required.
                    </span>):null
                    }
                 </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
      
                    <input type="text"  className="form-control"  onChange={handleInput} name="email" id=""  />
                    {
                    errors.email.required==true?
                    (<span className="text-danger" >
                        Email should be in correcct format.
                    </span>):null
                    }
                 </div>
                 <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                    <input  className="form-control"    type="password" onChange={handleInput} name="password" id="" />
                    {
                    errors.password.required==true?
                    (<span className="text-danger" >
                        Password should Contains at least 8 charactersc,numbers,uppercase and lowercase.
                    </span>):null
                    }
                 </div>
                 <div className="form-group">
                    <label htmlFor="exampleInputPhone1" className="text-uppercase">Phone Number</label>
      
                    <input type="text" className="form-control" onChange={handleInput} name="phoneNumber" id="" />
                    {
                    errors.phoneNumber.required==true?
                        (<span className="text-danger" >
                        Phone Number is required.
                    </span>):null
                    }
                 </div>
                 <div className="form-group">
                    
                    <span className="text-danger" >
                    {
                    errors.custom_error?
                       (<p>{errors.custom_error}</p>):null
                    }
                    </span>
                    {
                        loading?
                    (<div  className="text-center">
                      <div className="spinner-border text-primary " role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>):null
                    }
      
                    <input type="submit" className="btn btn-login float-right" disabled={loading}value="Register"/>
                 </div>
                 <div className="clearfix"></div>
                 <div className="form-group">
                   Already have account ? Please <Link  to="/login">Login</Link>
                 </div>
      
      
                 </form>
      
      
              </div>
      
           </div>
      
      
        </div>
        </section>
        </div>
        
    )
}