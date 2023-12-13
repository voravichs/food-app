import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Results() {
    const location = useLocation();
    const namecat = new URLSearchParams(location.search).get("namecat");
    const state = new URLSearchParams(location.search).get("state");
    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); 
    const [pageSize] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/businesses/?nameOrCategory=${namecat}&state=${state}&page=${page}&pageSize=${pageSize}`);
            let json = await data.json();
            if (json.length < 10) {
                data = await fetch(`http://localhost:8080/api/businesses/?nameOrCategory=${namecat}&state=${state}`);
                json = await data.json();
            }

            setData(json)
        }

        fetchData()
            .catch(console.error);
    }, [namecat, state, data, page, pageSize]);

    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page - 1 > 0) {
            setPage(page - 1);
        }
    }

    function goToBusiness(business) {
        navigate(`/business/?businessid=${business.business_id}`);
    }

    return (
        <div>
            {data.map(business =>
                <div className="text-3xl hover:cursor-pointer hover:text-4xl" onClick={() => goToBusiness(business)}
                    key={`${business.business_id}`}>
                        {business.name}
                </div>
            )}
            <div className="flex">
                <FaArrowLeft className="text-3xl mr-4 hover:cursor-pointer" onClick={prevPage}/>
                <FaArrowRight className="text-3xl hover:cursor-pointer" onClick={nextPage}/>
            </div>
            <p>page:{page}</p>
        </div>    
    )

}