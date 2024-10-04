import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

  const navigate = useNavigate();

const [userDeatils, setUserDeatils] = useState({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  cart:[],
  orders:[]
});

const [errors, setErrors] = useState({})
const [valid, setValid] = useState(true);

const handleSubmit = (e)=>{
  e.preventDefault();
  // console.log(userDeatils);
  let isvalid = true;
  let validationErrors = {};
  
  if(userDeatils.username === '' || userDeatils.username === null){
    validationErrors.username = 'Username is required';
    isvalid = false;
  }

  if(userDeatils.email === '' || userDeatils.email === null){
    validationErrors.email = 'Email is required';
    isvalid = false;
  }else if(!/\S+@\S+\S+/.test(userDeatils.email)){
    isvalid = false;
    validationErrors.email = 'Invalid email format';
  }

  if(userDeatils.password === '' || userDeatils.password === null){
    validationErrors.password = 'Password is required';
    isvalid = false;
  }else if(userDeatils.password.length < 6){
    isvalid = false;
    validationErrors.password = 'Password must be at least 6 characters long';
  }

  if(userDeatils.confirmPassword !== userDeatils.password){
    isvalid = false;
    validationErrors.confirmPassword = 'Passwords do not match';
  }
  
  setErrors(validationErrors);
  setValid(isvalid);
  
  if(Object.keys(validationErrors).length === 0){
    axios.post('http://localhost:5999/users', userDeatils)
    .then(res => {
      alert('registered succesfully');
      navigate('/signin')
    })
    .catch(err => console.log(err))
  }
}


  return (
    <div className='w-screen h-screen bg-customLigthPurple flex flex-col 
     justify-center items-center'>
      <div className='  p-20 rounded-2xl bg-customDarkPurple shadow-2xl'>
        {/* {
          valid?<></>:<span></span>
        } */}
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col flex-wrap gap-4'>
          <span className='text-4xl'>Create Account</span>
          
          <div>
          <input 
          type="text" 
          placeholder='username' 
          name='username'
          onChange={(e)=>setUserDeatils({...userDeatils, username:e.target.value})}
          className='p-3 w-80 rounded-xl' />
          {
            valid? <></> : <p className='text-red-600 text-[13px]'>{errors.username}</p>
          }
          </div>

          <div>
          <input type="email" 
          placeholder='email' 
          name='email'
          onChange={(e)=>setUserDeatils({...userDeatils, email:e.target.value})}
          className='p-3 w-80 rounded-xl' />
          {
            valid? <></> : <p className='text-red-600 text-[13px]'>{errors.email}</p>
          }
          </div>

          <div>
          <input 
          type="password" 
          placeholder='password' 
          name='password'
          onChange={(e)=>setUserDeatils({...userDeatils, password:e.target.value})}
          className='p-3 w-80 rounded-xl' />
          {
            valid? <></> : <p className='text-red-600 text-[13px]'>{errors.password}</p>
          }
          </div>

          <div>
          <input 
          type="password" 
          placeholder='confirm password' 
          name='confirmPassword'
          onChange={(e)=>setUserDeatils({...userDeatils, confirmPassword:e.target.value})}
          className='p-3 w-80 rounded-xl' />
          {
            valid? <></> : <p className='text-red-600 text-[13px]'>{errors.confirmPassword}</p>
          }
          </div>


            <button 
            type='submit' 
            className='  w-20 p-1 rounded-md bg-slate-500 text-white hover:bg-slate-700 '
            >Sign Up</button>

        </form>
        <span className='text-sm'>Already have an account? <Link to='/signin' className='text-red-500 text-sm'>Sign In</Link></span>
      </div>
    </div>
  )
}

export default RegistrationForm
