import { Link } from "react-router-dom"
import { Label, TextInput, Button, Alert } from "flowbite-react"
import { useState } from "react"
import axios from 'axios'



export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage,setErrorMesssage]=useState(null)
  const [loading,setLoading]=useState(0)

  console.log(loading);
  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()}) //copying existing object to another object and changing(or adding extra) existing key value
  }
  const submitData = async (e) => {
    if(!errorMessage)setErrorMesssage(null)
    e.preventDefault(); //default behaviour on submitting form is reloading the entire page, which is stopped here
    if(!formData.username || !formData.email || !formData.password){
      setErrorMesssage("Please fill in all fields.")
      return;
    }
    try {
      const res = await axios.post('/api/auth/signup',JSON.stringify(formData),{
        headers:{'Content-Type':'application/json'},
      });
      window.alert(res.data)
    } catch (error) {
      return setErrorMesssage(error.response.data.message)
      console.log(error.statusCode==440);
    }
  }


  return (
    <div className="min-h-screen mt-20 border-8 border-red-600">
      <div className="p-3 max-w-3xl border-4 border-green-600 mx-auto flex flex-col md:flex-row  md:items-center gap-4">
        {/* left */}
        <div className="border-4 border-orange-400 p-3 flex-1">
          <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Aniket's
            </span>
            <span className='py-1'>
              Blog
            </span>
          </Link>
          <p className="my-3 text-sm">
            Enter Your Details.
          </p>
        </div>
        {/* right */}
        <div className="border-4 border-orange-400 p-3 flex-1">
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
            <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className="text-blue-500">Sign In</Link>
          </div>
          {
            errorMessage?<Alert className="mt-5" color="failure">{errorMessage}</Alert>:""
          }
        </div>
      </div>
    </div>
  )
}
