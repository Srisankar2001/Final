import { Link, Navigate } from 'react-router-dom';
import { LoginApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/Storage';
import './LoginPage.css';
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function LoginPage(){

    const initialStateErrors={
        email:{required:false},
        password:{required:false},
        custom_error:null
    };

    const [errors,setErrors]= useState(initialStateErrors);
    
    const [loading,setLoading]=useState(false);

    const [inputs,setInputs]=useState({
        email:"",
        password:""
        //ithula naama kodukkira name inputs la kuduthuruppame tag nama athe irukkanum appathaan setInputs function ah use pannika mudiyum
    })//inputs kkaana state

    const handleInput=(event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})

    }//ella inputs kku

    const handleSubmit=(event)=>{
        console.log(inputs);
        event.preventDefault();//browser can't load

        let errors =initialStateErrors;

        let hasError=false;
    
        if(inputs.email==""){
            errors.email.required=true;
            hasError=true;
        }
        if(inputs.password==""){
            errors.password.required=true;
            hasError=true;
        }

        if(!hasError){
            setLoading(true)
            //sending register api request
            LoginApi(inputs).then((response)=>{
                //store panna
                let jwtToken=response.data.data.accessToken;
                if(jwtToken)
                {
                    storeUserData(jwtToken);
                }
                else{
                    setErrors({...errors,custom_error:response.data.data})
                }
                
                // navigate(`/`);
            }).catch((err)=>{
                if (err.code=="ERR_BAD_REQUEST") {
                    setErrors({...errors,custom_error:"Invalid Credentials!"})
                }
               
            }).finally(()=>{
                setLoading(false)
            })
        }

        setErrors({...errors});//nama mathina state ah intha function moolama koduthu maathikiram
            //...errors endrathu oru copy value ah thaan kodukkanum error ah 
    }

    if (isAuthenticated()){//true/false
        //Redirecting to Dashboard
       //ithukku naama react-router-dom endra package ah install pannanum
       return <Navigate to="/" />
   }

    return(
        <div>
            <NavBar/>
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit={handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" onChange={handleInput} name="email"  id="" placeholder="email"  />
                            {
                            errors.email.required==true?
                            (<span className="text-danger" >
                             Email is required.
                            </span>):null
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password"  onChange={handleInput} name="password" placeholder="password" id="" />
                            {
                            errors.password.required==true?
                            (<span className="text-danger" >
                             Password is required.
                            </span>):null
                    }
                        </div>
                        <div className="form-group">
                            {
                                loading?
                                (<div  className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>):null
                    }
                            <span className="text-danger" >
                            {
                                errors.custom_error?
                                (<p>{errors.custom_error}</p>):null
                            }
                            </span>
                            <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link  to="/register">Register</Link>
                        {/* Link endrathu react router ah work panna vaikkum so puthu url vantha athkketha component ah load panna vaikkum  */}
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </div>
        
    )
}