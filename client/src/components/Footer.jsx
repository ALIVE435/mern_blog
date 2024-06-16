import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitterX} from 'react-icons/bs'


export default function FooterComponent() {
    let date=new Date();
    return (
        <Footer container className='border border-t-8 mt-2 border-teal-800'>
            <div className='w-full mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='p-2 '>
                        <Link to='/' className='text-lg sm:text-xl font-bold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                                Aniket's
                            </span>
                            <span className='py-1'>
                                Blog
                            </span>
                        </Link>
                    </div>
                    <div className='p-2 grid grid-col-1 gap-3  sm:grid-cols-3 sm:gap-6 '>
                        <div>
                            <Footer.Title title='ABOUT' />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://projects.100xdevs.com/" target='_blank' rel='noopener noreferrer'>
                                    100xDevs
                                </Footer.Link>
                                <Footer.Link href="https://github.com/" target='_blank' rel='noopener noreferrer'>
                                    Github
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='FOLLOW US' />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://twitter.com/aniketsingh435" target='_blank' rel='noopener noreferrer'>
                                    Twitter
                                </Footer.Link>
                                <Footer.Link href="https://www.linkedin.com/in/aniket-singh-3b24ab226?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank' rel='noopener noreferrer'>
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#" target='_blank' rel='noopener noreferrer'>
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                    <div className='grid grid-cols-3  p-2 '>
                        <div className='col-span-3'>&#169; {date.getFullYear()} All rights reserved.</div>
                        <Footer.Icon href="https://twitter.com/aniketsingh435" icon={BsTwitterX} />
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram}/>
                    </div>
                </div>
            </div>

        </Footer>
    )
}