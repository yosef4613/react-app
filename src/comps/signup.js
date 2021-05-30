import React from 'react';
import {useForm} from "react-hook-form";
import PageHeader from './common/pageHeader';

function SignUpClient(props){
  let {register , handleSubmit ,  formState: { errors } } = useForm();
  
  const onSubForm = (formData) => {
    console.log(formData);
    //TODO: send formData to nodejs project /users in post
  }

  // register -> ref= useRef()
  let emailRef = register("email",{
    required:true,  
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef =  register("password",{required:true, minLength:3}) ;
  let nameRef = register("fullName",{required:true, minLength:2})
  let checkRef = register("biz",{required:false})

  return(
    <div className="container">
    
    <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
      <PageHeader title="Sign up new user"/>
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
      <div>
        <label>Full name:</label>
        <input {...nameRef} type="text" className="form-control" />
        {errors.fullName && <span className="text-danger">Enter min 2 charts name</span>}
      </div>
      <div className="mt-2">
        <input {...checkRef}  type="checkbox" className="form-check-input me-2" />
        <label>I am Business</label>
      </div>
      <button className="btn btn-info mt-3">Sign up</button>
    </form>
  </div>
  )
}

export default SignUpClient