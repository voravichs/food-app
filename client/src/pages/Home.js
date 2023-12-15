import { FaSearch, FaRegGem  } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'

import TopCities from '../components/TopCities'
import Footer from '../components/Footer'

export default function Home() {
    const [searchNameCatInput, setSearchNameCatInput] = useState("");
    const [searchStateInput, setSearchStateInput] = useState("");
    const [searchConfirm, setSearchConfirm] = useState("");
    const navigate = useNavigate();

    const handleNameCatChange = (e) => {
        e.preventDefault();
        setSearchNameCatInput(e.target.value);
    };

    const handleStateChange = (e) => {
        e.preventDefault();
        setSearchStateInput(e.target.value);
    };

    // Redirects
    function checkEnter(e) {
        if(e.key === "Enter") {
            goToResults();
        }

    }

    function goToResults() {
        if (searchNameCatInput === "" || searchStateInput === "") {
            setSearchConfirm("Please enter both a name/category and a state!");
        } else {
            navigate(`/results/?namecat=${searchNameCatInput}&state=${searchStateInput}`);
        }
        
    }

    return (
        <div className="flex flex-col w-screen">
            <div className='container mx-auto mt-16 mb-24'>
                {/* Logo */}
                <div className="flex-center mb-8">
                    <img className='w-2/3' 
                        src={`${logo}`}
                        alt='Site logo' />
                </div>
                
                {/* Search Bars */}
                <div className="w-3/4 mx-auto bg-slate-400 dark:bg-slate-600 py-12 rounded-lg mb-16"
                    onKeyUp={(e) => checkEnter(e)}>
                    <div className="flex-center mb-8">
                        <h1 className="text-2xl text-neutral-800 font-bold dark:text-neutral-200"> 
                            Search for Restaurants
                        </h1>
                    </div>
                    <div className="relative mb-4 w-2/3 mx-auto">
                        <FaSearch className='absolute m-3 text-xl pointer-events-none fill-neutral-400 dark:fill-neutral-300' />
                        <input type="search" 
                            class="block w-full p-3 ps-10 
                                text-md text-gray-900 
                                border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Name or Category (i.e. pizza)" 
                            aria-label="Search"
                            onChange={handleNameCatChange}
                            value={searchNameCatInput}/>
                            
                    </div>
                    <div className="mb-4 w-2/3 mx-auto">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <FaSearch className='absolute m-3 text-xl pointer-events-none fill-neutral-400 dark:fill-neutral-300' />
                            <input type="search" 
                                class="block w-full p-3 ps-10 
                                    text-md text-gray-900 
                                    border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="State (i.e. PA)"
                                aria-label="Search"
                                onChange={handleStateChange}
                                value={searchStateInput}/>
                        </div>
                    </div>
                    <div className="flex-center mb-4 text-red-700 dark:text-red-500">{searchConfirm}</div>
                    <div className="flex-center">
                        <button class="px-8 py-2 
                            bg-blue-700 rounded-full
                            text-white font-medium text-xl
                            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => goToResults()}> Search </button>    
                    </div>
                </div>
                
                {/* Top Cities */}
                <div className="flex-center flex-col">
                    <h1 className="text-3xl text-neutral-800 font-bold dark:text-neutral-200 
                        mb-4 py-6 px-12 bg-slate-400 dark:bg-slate-600 rounded "> 
                        Top Cities <FaRegGem className="inline-flex" /> 
                    </h1>
                    <TopCities/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}