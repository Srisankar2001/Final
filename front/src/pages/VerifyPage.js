import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Navigate, useLocation,useNavigate } from 'react-router-dom';
import { VerifyApi } from '../services/Api';
import { getUserData } from '../services/Storage';

export default function VerifyPage(){

   

    // console.log(userToken)
    const navigate=useNavigate();

    const initiaiStateErrors={
        otp:{required:false},
        verificationStatus:"",
        custom_error:null,
    };

    const[errors,setErrors]=useState(initiaiStateErrors);

    const[loading,setLoading]=useState(false);

    const[input,setInput]=useState({
        otp:""
    })

    const handleInput=(event)=>{
        setInput({...input,[event.target.name]:event.target.value});
      }

      const handleSubmit=(event)=>{
        console.log(input);
        event.preventDefault();
        let errors1={...initiaiStateErrors};
        let hasError=false;
  
  
        if(input.otp==""){
          errors1.otp.required=true;
          hasError=true;
        }
  
  
        if(!hasError){
          setLoading(true);
          //sending login API request
          // 
          VerifyApi(input).then(response => {
            if (response.data.status==200) {
                  if(response.data.data){
                      // Set verification status message
                    setErrors({...errors1, verificationStatus:response.data.data});
                    navigate(`/`)

                  }
                  if(response.data.error){
                    // Set verification status message
                  setErrors({...errors1, verificationStatus:response.data.error});
                }

                
            } else {
                // Handle verification failure
                throw new Error("Verification failed");
            }
            
          
        
            

        })
        .catch((err) => {
          console.log(err.message)//////////////////////////////////////////////////////////////////////////////////
            setErrors({...errors1, custom_error: "Verification failed"});
        }).finally(()=>{
               setLoading(false);
          })
        }
        
  
        setErrors({...errors1});
      }

    //   if(errors.verificationStatus!=null){
    //     //redirect user to dashboard
    //     return <Navigate to="/login"/>
    //   }


    return(
        <div>
         <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="#">LUCKY MOBILES</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
          <section className="verify-block">
              <div className="container">
                  <div className="row ">
                      <div className="col login-sec">
                          <h2 className="text-center">Verify</h2>
                          <form onSubmit={handleSubmit} className="verify-form" action="">
                          <div className="form-group">
                              <label htmlFor="otp" className="text-uppercase" >Enter OTP</label>
                              <input type="text"  className="form-control" onChange={handleInput} name="otp"  id="" />
                              {errors.otp.required?
                        (<span className="text-danger" >
                            otp is required.
                        </span>):null
                        }
                    
                          </div>
                          
                          <div className="form-group">
                          {loading?(<div  className="text-center">
                            <div className="spinner-border text-primary " role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>):null
                              }
                              {errors.custom_error?
                          (
                           <p className='text-danger'>{errors.custom_error}</p>
                          ):null
                          }
                            <input type="submit" className="btn btn-login float-right" disabled={loading} value="Confirm" />
                            {errors.verificationStatus && <p>{errors.verificationStatus}</p>}
                          </div>
                
                        
                          </form>
                      </div>
                  </div>
              </div>
          </section>
        </div>
        
      )
}