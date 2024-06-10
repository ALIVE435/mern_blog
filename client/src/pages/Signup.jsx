import { Link, useNavigate} from "react-router-dom"
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
import { useState } from "react"
import axios from 'axios'



export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMesssage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate();

  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }) //copying existing object to another object and changing(or adding extra) existing key value
  }

  const submitData = async (e) => {
    e.preventDefault(); //default behaviour on submitting form is reloading the entire page, which is stopped here
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMesssage("Please fill in all fields.")
      return;
    }
    try {
      setErrorMesssage(null)
      setLoading(true)
      const res = await axios.post('/api/auth/signup', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
      });
      setLoading(false)
      navigate("/signin")
    } catch (error) {
      setLoading(false)
      return setErrorMesssage(error.response.data.message)
    }
  }


  return (
    <div className="min-h-screen mt-20">
      <div className="p-3 max-w-3xl mx-auto flex flex-col md:flex-row  md:items-center gap-4">
        {/* left */}
        <div className=" p-3 flex-1">
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Aniket's
            </span>
            <span className='py-1'>
              Blog
            </span>
          </Link>
          <p className="my-3 text-xl font-semibold">
            Enter Your Details.
          </p>
        </div>
        {/* right */}
        <div className=" p-3 flex-1">
          <form className="flex flex-col gap-3" onSubmit={submitData}>
            <div className="">
              <Label value="Create your username"></Label>
              <TextInput type="text" placeholder="Username" id="username" onChange={eventHandler}></TextInput>
            </div>
            <div className="">
              <Label value="Enter your email-id"></Label>
              <TextInput type="email" placeholder="Email" id="email" onChange={eventHandler}></TextInput>
            </div>
            <div className="">
              <Label value="Create your password"></Label>
              <TextInput type="password" placeholder="8470012256:hp carepack service" id="password" onChange={eventHandler}></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading?(
                <>
                  <Spinner size={'sm'}/>
                  <span>Signing Up...</span>
                </>):
                "Sign Up"
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className="text-blue-500">Sign In</Link>
          </div>
          {
            errorMessage ? <Alert className="mt-5" color="failure">{errorMessage}</Alert> : ""
          }
        </div>
      </div>
    </div>
  )
}
