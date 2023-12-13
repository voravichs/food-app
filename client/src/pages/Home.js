import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import TopCities from '../components/TopCities'

export default function Home() {
    const [searchNameCatInput, setSearchNameCatInput] = useState("");
    const [searchStateInput, setSearchStateInput] = useState("");
    const navigate = useNavigate();

    const handleNameCatChange = (e) => {
        e.preventDefault();
        setSearchNameCatInput(e.target.value);
    };

    const handleStateChange = (e) => {
        e.preventDefault();
        setSearchStateInput(e.target.value);
    };

    return (
        <div className="flex flex-col h-screen w-screen">
            <div className='container mx-auto my-auto'>
                <h1 className='w-full flex-center mb-4'>UNDERGROUND FOODIES</h1>
                <div className="mb-3 w-96 mx-auto">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 block flex-auto 
                                rounded border border-solid border-neutral-300 
                                bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none 
                                transition duration-200 ease-in-out 
                                focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none 
                                dark:border-neutral-600 dark:text-neutral-400 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Name or Category"
                            aria-label="Search"
                            aria-describedby="button-addon2" 
                            onChange={handleNameCatChange}
                            value={searchNameCatInput}/>
                        
                    </div>
                </div>
                <div className="mb-3 w-96 mx-auto">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 block flex-auto 
                                rounded border border-solid border-neutral-300 
                                bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none 
                                transition duration-200 ease-in-out 
                                focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none 
                                dark:border-neutral-600 dark:text-neutral-400 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="State"
                            aria-label="Search"
                            aria-describedby="button-addon2" 
                            onChange={handleStateChange}
                            value={searchStateInput}/>
                        <FaSearch className='ml-4 text-3xl cursor-pointer fill-neutral-700 hover:fill-blue-500' onClick={() => navigate(`/results/?namecat=${searchNameCatInput}&state=${searchStateInput}`)}/>
                    </div>
                </div>
                <div className="flex-center flex-col">
                    <h1> Top Cities </h1>
                    <TopCities/>
                </div>
                

            </div>
        </div>
    );
}