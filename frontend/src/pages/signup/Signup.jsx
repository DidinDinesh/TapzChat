import { useState } from "react"
import GenderCheckbox from "./GenderCheckbox"
import {Link} from 'react-router-dom'
import useSignup from "../../hooks/useSignup"

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const {loading, signup} = useSignup();

  const onchangeHnadler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((inputs) => ({...inputs, [name] : value})) 
  }

  const handleChekboxChange = (gender) => {
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await signup(inputs)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen mx-auto">
        <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto items-center justify-center p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign up
            <span className="text-blue-500 ml-3">
              TapzChat
            </span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Full Name</span>
              </label>
              <input type="text" placeholder="Enter Full Name" className="w-full input input-bordered h-10" value={inputs.fullName} name="fullName" onChange={onchangeHnadler}/>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Username</span>
              </label>
              <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"  value={inputs.username} name="username" onChange={onchangeHnadler}/>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Password</span>
              </label>
              <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10" value={inputs.password} name="password" onChange={onchangeHnadler}/>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Confirm Password</span>
              </label>
              <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10 mb-2" value={inputs.confirmPassword} name="confirmPassword" onChange={onchangeHnadler}/>
            </div>
            <GenderCheckbox onCheckboxChange = {handleChekboxChange} selectedGender = {inputs.gender}/>
            <Link to="/login" className="text-sm hover:underline text-gray-300 hover:text-blue-600 mt-2 inline-block">
              Allready have an account?
            </Link>
            <div>
              <button className="btn btn-block btn-sm mt-4 bg-gray-400" disabled={loading}>
                {loading? <span className="loading loading-spinner"></span> : "Signup"}
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Signup