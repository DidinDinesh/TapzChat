
import { useState } from "react"
import {Link} from 'react-router-dom'
import useLogin from "../../hooks/useLogin"

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {loading, login} = useLogin()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login({username, password})
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className=" w-1/4 h-auto p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500 ml-3">
            TapzChat
          </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <Link to="/signup" className="text-sm hover:underline text-gray-300 hover:text-blue-600 mt-2 inline-block">
            Dont have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2 bg-gray-400" disabled={loading}>
            {loading? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
