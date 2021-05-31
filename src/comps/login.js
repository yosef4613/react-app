import React from 'react';
import {useForm} from "react-hook-form";
import { API_URL, doApiMethod } from '../services/apiSer';
import PageHeader from './common/pageHeader';
import {toast} from "react-toastify";


function Login(props){
  let {register , handleSubmit ,  formState: { errors } } = useForm();
  
  const onSubForm = async(formData) => {
    console.log(formData);
    //TODO: send formData to nodejs project /users/login in post
    try{

      let url = API_URL+"/users/login";
      let data = await doApiMethod(url,"POST",formData);
      console.log(data);
      // קיבלנו טוקן : נשמור בלוקאל סטוראז ונשלח את המשמש
      localStorage.setItem("tok",data.token);
      // toast("You logged in , good for you!11");
      toast.success("You logged in !");
      // להצגת מידע על עצמו
    }
    catch(err){
      console.log(err);
      toast.error("User or password worng!");
    }

  }

  // register -> ref= useRef()
  let emailRef = register("email",{
    required:true,  
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef =  register("password",{required:true, minLength:3}) ;

  return(
    <div className="container">
    
    <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
      <PageHeader title="Log in" />
      <div>
        <label>Email:</label>
        <input {...emailRef} type="text" className="form-control" />
        {errors.email && <span className="text-danger">Enter valid email</span>}
      </div>
      <div>
        <label>Password:</label>
        <input {...passwordRef} type="text" className="form-control" />
        {errors.password && <span className="text-danger">Enter min 3 charts password</span>}
      </div>
     
      <button className="btn btn-success mt-3">Log in</button>
    </form>
  </div>
  )
}

export default Login