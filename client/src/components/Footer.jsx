import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    
    <footer className='border-t'>
        <div className=' container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-4'>
            <p className='text-sm font-medium '>All Rights Reserved 2025 ©</p>

            <div className='flex items-center gap-4 justify-center text-2xl'>
                <a href="" className=' hover:text-primary-100'>
                <FaFacebook className=' hover:text-primary-100'/>
                </a>
                <a href="">
                <FaInstagram className=' hover:text-primary-100'/>
                </a>
                <a href="">
                    <FaLinkedin className=' hover:text-primary-100'/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer