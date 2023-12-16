import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import BusinessCard from "../components/BusinessCard";
import Loading from "../components/Loading";

export default function Results() {
    const location = useLocation();
    const namecat = new URLSearchParams(location.search).get("namecat");
    const state = new URLSearchParams(location.search).get("state");
    
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

    return (
        <div className="mx-8">
            {loaded 
                ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 gap-4 justify-items-stretch">
                    {data.map(business =>
                        <BusinessCard key={`${business.business_id}`} business={business}/>
                    )}
                </div>
                : <Loading text="Business"/>
            }
            <div className="flex-center mt-8">
                <FaArrowLeft className="text-5xl mr-4 hover:cursor-pointer" onClick={prevPage}/>
                <FaArrowRight className="text-5xl hover:cursor-pointer" onClick={nextPage}/>
            </div>
            <p className="flex-center text-xl mt-2"> Page: {page}</p>
        </div>    
    )

}