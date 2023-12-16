import React, { useState } from "react";
import logo from '../images/logo.png'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion"

export default function Navbar() {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div className={`relative px-8 py-16
            bg-white dark:bg-slate-800 border-r-2 border-gray-100
            ${expanded ? "w-full md:w-1/2 lg:w-1/4" : "w-12"}`}
            layout>
            <button className='absolute top-3 right-3' 
                onClick={() => setExpanded(curr => !curr)}>
                {expanded 
                    ? <FaChevronLeft className='text-3xl dark:text-white'/> 
                    : <FaChevronRight className='text-3xl dark:text-white'/>}
            </button>
            <a href='/' 
                className={`flex-center mb-8 overflow-hidden transition-all
                    ${expanded ? "w-full" : "w-0"}`}>
                <img className='h-20'
                    src={`${logo}`} 
                    alt='Navbar Site Logo'/>
            </a> 
            <ul className="px-4 text-neutral-800 dark:text-neutral-200">
                <li className="relative flex-center py-2 px-3 my-1
                    text-xl rounded-lg cursor-pointer
                    transition-colors hover:bg-indigo-200 hover:text-indigo-500">
                    <a href='/' className={`flex-center ${expanded ? "" : "hidden"}`}>
                        About Us
                    </a> 
                </li>
                <li className="relative flex-center py-2 px-3 my-1
                    text-xl rounded-lg cursor-pointer
                    transition-colors hover:bg-indigo-200 hover:text-indigo-500">
                    <a href='/' className={`flex-center ${expanded ? "" : "hidden"}`}>
                        Github
                    </a> 
                </li>
            </ul>
            
        </motion.div>
    );
}