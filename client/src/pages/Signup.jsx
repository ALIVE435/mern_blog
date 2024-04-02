import { Link } from "react-router-dom"
import {Label,TextInput,Button} from "flowbite-react"
export default function Signup() {
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
          <form className="flex flex-col gap-3">
            <div className="">
              <Label value="Create your username"></Label>
              <TextInput type="text" placeholder="Username" id="username"></TextInput>
            </div>           
            <div className="">
              <Label value="Enter your email-id"></Label>
              <TextInput type="text" placeholder="Email" id="email"></TextInput>
            </div>           
            <div className="">
              <Label value="Create your password"></Label>
              <TextInput type="text" placeholder="Password" id="password"></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
