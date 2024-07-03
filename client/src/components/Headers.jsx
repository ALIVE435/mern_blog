import { Button, Dropdown, Navbar, NavbarToggle, TextInput, Avatar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { toggletheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'
import axios from 'axios'

export default function Headers() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation()
  // console.log(location)
  useEffect(()=>{
    //console.log(searchTerm)
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormURL = urlParams.get('searchTerm')
    if(searchTermFormURL){
      setSearchTerm(searchTermFormURL);
    }
  },[location.search])

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/user/signout");
      dispatch(signoutSuccess())
    }
    catch (err) {
      console.log(err.response)
    }
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    //console.log(searchTerm)
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }
  return (
    <Navbar className='border-b-2 bg-slate-600'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Aniket's
        </span>
        <span className='py-1'>
          Blog
        </span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggletheme())}>
          {!theme ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar
              alt='user'
              img={currentUser.photoUrl}
              rounded
            />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>

            <Dropdown.Item>
              <Link to="/dashboard?tab=profile" className='w-full text-start'>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) :
          <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>}
      </div>
      <NavbarToggle />   {/*Adding Hamburger menu for below div */}
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} onClick={() => navigate('/')} as='div'>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as='div'>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as='div'>
          <Link to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
