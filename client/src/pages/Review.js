import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Review() {
    const location = useLocation();
    const reviewId = new URLSearchParams(location.search).get("reviewId");
    const navigate = useNavigate();

    const [data, setData] = useState({});

    // API Routes
    useEffect(() => {
        fetch(`http://localhost:8080/api/reviews/${reviewId}`)
          .then(res => res.json())
          .then(resJson => setData(resJson[0]));
    }, [reviewId]);

    // Redirects
    function goToUser() {
        navigate(`/user/?userId=${data.user_id}`);
    }

    return (
        <div>
            <p className="text-xl hover:cursor-pointer hover:text-2xl" 
                onClick={() => goToUser()}>
                {data.reviewer}
            </p>
            <p>{data.business_name}</p>
            <p>{data.text}</p>
            <p>{data.stars}</p>
            <p>{data.date}</p>
            <p>{data.useful}</p>
            <p>{data.funny}</p>
            <p>{data.cool}</p>
        </div>
    )
}