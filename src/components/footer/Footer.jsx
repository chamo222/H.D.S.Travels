import React from 'react'
import RootLayout from '../../layout/RootLayout'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'

import MasterCardImg from "../../assets/mastercard.png"
import CreditCardImg from "../../assets/creditcard.png"
import CashImg from "../../assets/cash.png"

const socialLinks = [
  { icon: FaInstagram, url: "https://www.instagram.com/h.d.s.travels/" },
  { icon: FaFacebookF, url: "https://www.facebook.com" },
  { icon: FaYoutube, url: "https://www.youtube.com" },
  { icon: FaXTwitter, url: "https://twitter.com" }
]

const Footer = () => {

  const slideUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className='w-full h-auto bg-neutral-950 py-12'>
      
      <RootLayout className="space-y-10">

        {/* Footer other content */}
        <motion.div 
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          variants={slideUpVariant}
        >

          <div className="col-span-1 md:col-span-2 space-y-8 md:pr-10 pr-0">

            <div className="space-y-3">
              {/* Logo */}
              <Link to="/" className='text-4xl sm:text-5xl md:text-6xl text-red-500 font-bold'>
                  H.D.S. Travels
              </Link>

              {/* some description */}
              <p className="text-sm text-neutral-500 font-normal">
                Bus is all about booking tickets through online platform to make comfortable to the passenger. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit, maiores dicta soluta tempore officiis at, deleniti praesentium, veritatis nobis inventore! A animi deleniti quam? Error fuga repudiandae deserunt officia.
              </p>
            </div>
            
            {/* Social links */}
            <div className="w-full flex items-center gap-3 sm:gap-5">
              {socialLinks.map(({ icon: Icon, url }, idx) => (
                <a 
                  key={idx} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-neutral-800/40 hover:bg-primary flex items-center justify-center cursor-pointer ease-in-out duration-500"
                >
                  <Icon className='w-5 h-5 text-neutral-50' />
                </a>
              ))}
            </div>

          </div>

          <div className="col-span-1 space-y-5">
            <h1 className="text-lg text-neutral-100 font-semibold">
              Quick Links
            </h1>

            <div className="space-y-2">

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                About Us
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                 My Account
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Reserve your Ticket
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Create your Account
              </Link>

            </div>

          </div>

          <div className="col-span-1 space-y-5">
            <h1 className="text-lg text-neutral-100 font-semibold">
              Top Reserved Routes
            </h1>

            <div className="space-y-2">

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Kathmanda - Pokhara
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Pokhara - Chitwan
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Chitwan - Lumbini
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Lumbini - Biratnagar
              </Link>

            </div>
          </div>

          <div className="col-span-1 space-y-5">
            <h1 className="text-lg text-neutral-100 font-semibold">
              Support Links
            </h1>

            <div className="space-y-2">

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Privacy Policy
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Terms & Conditions
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                Help & Support Center
              </Link>

              <Link to="/" className='block text-base text-neutral-500 hover:text-neutral-300 ease-in-out duration-300'>
                FaQs
              </Link>

            </div>
          </div>

        </motion.div>

        {/* Seperator */}
        <div className="w-full h-px bg-neutral-800/50" />

        {/* Copyright */}
        <motion.div
          className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          variants={slideUpVariant}
        >
          <p className="text-sm text-neutral-600 font-normal text-center sm:text-left">
            Copyright &Copy; 2025 H.D.S. Travels. All rights reserved.
          </p>

          <div className="flex items-center gap-2 sm:gap-2">
            <div className="">
              <img src={MasterCardImg} alt="" className="w-fit h-9 object-contain object-center" />
            </div>

            <div className="">
              <img src={CreditCardImg} alt="" className="w-fit h-9 object-contain object-center" />
            </div>

            <div className="">
              <img src={CashImg} alt="" className="w-fit h-9 object-contain object-center" />
            </div>

          </div>
        </motion.div>

      </RootLayout>

    </div>
  )
}

export default Footer