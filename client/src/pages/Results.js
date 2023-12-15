import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import BusinessCard from "../components/BusinessCard";

export default function Results() {
    const location = useLocation();
    const namecat = new URLSearchParams(location.search).get("namecat");
    const state = new URLSearchParams(location.search).get("state");
    const navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); 
    const [pageSize] = useState(12);
    const [loaded, setLoaded] = useState(false); 

    // API Routes
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/businesses/?nameOrCategory=${namecat}&state=${state}&page=${page}&pageSize=${pageSize}`);
            let json = await data.json();
            if (json.length < 10) {
                data = await fetch(`http://localhost:8080/api/businesses/?nameOrCategory=${namecat}&state=${state}`);
                json = await data.json();
            }
            setLoaded(true);
            setData(json)
        }
        fetchData()
            .catch(console.error);
    }, [namecat, page, pageSize, state]);

    // Page Navigation
    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page - 1 > 0) {
            setPage(page - 1);
        }
    }

    // Redirects
    function goToBusiness(business) {
        navigate(`/business/?businessid=${business.business_id}`);
    }

    return (
        <div className="mx-8">
            {loaded 
                ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 gap-4">
                    {data.map(business =>
                        <div className="hover:cursor-pointer" 
                            onClick={() => goToBusiness(business)}
                            key={`${business.business_id}`}>
                                <BusinessCard key={`${business.business_id}`} business={business}/>
                        </div>
                    )}
                </div>
                :
                <div className="text-xl">
                    <p className="mb-4 flex-center"> Loading Businesses...</p>
                    <div role="status" className="flex-center">
                        <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            }
            <div className="flex-center mt-8">
                <FaArrowLeft className="text-5xl mr-4 hover:cursor-pointer" onClick={prevPage}/>
                <FaArrowRight className="text-5xl hover:cursor-pointer" onClick={nextPage}/>
            </div>
            <p className="flex-center text-xl mt-2"> Page: {page}</p>
        </div>    
    )

}