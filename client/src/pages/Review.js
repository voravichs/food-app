import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Review() {
    const location = useLocation();
    const reviewId = new URLSearchParams(location.search).get("reviewId");

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/api/reviews/${reviewId}`)
          .then(res => res.json())
          .then(resJson => setData(resJson[0]));
    }, [data, reviewId]);

    return (
        <div>
            <p>{data.reviewer}</p>
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