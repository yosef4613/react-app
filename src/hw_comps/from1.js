import React from 'react';
import { useForm } from 'react-hook-form';




function Form1(props) {
  let { register, handleSubmit, formState: { errors } } = useForm()

  const onFormSub = (data) => {
    console.log(data)
    //In real project we send the data to api in post /put /delete request
  }

  let nameRef = register("name", { required: true, minLength: 2 })
  let emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })


  return (
    <div className="container">
      <h1>Form order:</h1>
      <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto shadow p-3 rounded mt-3">
        <div>
          <label>Email:</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <label>Password:</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <label>Write Password again:</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <label>Full name:</label>
          <input {...nameRef} type="text" className="form-control" />
          {errors.name && <span className="text-danger">Enter valid name (min length charts 2 letters)</span>}
        </div>
        <button className="btn btn-info mt-3">Sign up</button>
      </form>
    </div>
  )
}

export default Form1;