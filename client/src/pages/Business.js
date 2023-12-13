import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Business() {
    const location = useLocation();
    const businessId = new URLSearchParams(location.search).get("businessid");
    const navigate = useNavigate();

    const [businessData, setBusinessData] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [relatedBusinessData, setRelatedBusinessData] = useState([]);
    const [page, setPage] = useState(1); 
    const [pageSize] = useState(5);

    // API Routes
    useEffect(() => {
        fetch(`http://localhost:8080/api/businesses/${businessId}`)
          .then(res => res.json())
          .then(resJson => setBusinessData(resJson[0]));
    }, [businessData, businessId]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/businesses/${businessId}/reviews/?page=${page}&pageSize=${pageSize}`)
          .then(res => res.json())
          .then(resJson => setReviewData(resJson));
    }, [reviewData, businessId, page, pageSize]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/businesses/${businessId}/relatedBusinesses`)
          .then(res => res.json())
          .then(resJson => setRelatedBusinessData(resJson));
    }, [relatedBusinessData, businessId, page, pageSize]);
    
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
    function goToReview(review) {
        navigate(`/review/?reviewId=${review.review_id}`);
    }

    return (
        <div>
            <p>name: {businessData.name}</p>
            <p>categories: {businessData.categories}</p>
            <p>location: {businessData.city}, {businessData.state}</p>
            <p>stars: {businessData.stars}</p>
            <div>
                <h1>Reviews</h1>
                {reviewData.map(review =>
                    <div className="text-xl hover:cursor-pointer hover:text-2xl" 
                        onClick={() => goToReview(review)}
                        key={`${review.review_id}`} >
                        <p>{review.name}</p>
                        <p>{review.text}</p>
                        <p>{review.stars}</p>
                    </div>
                )}
            </div>
            <div className="flex">
                <FaArrowLeft className="text-3xl mr-4 hover:cursor-pointer" onClick={prevPage}/>
                <FaArrowRight className="text-3xl hover:cursor-pointer" onClick={nextPage}/>
            </div>
            <div>
                <h1>Related Businesses</h1>
                {relatedBusinessData.map(relatedBusiness =>
                    <div key={`${relatedBusiness.business_id}`}>
                        <p>name: {relatedBusiness.name}</p>
                        <p>location: {relatedBusiness.city}, {relatedBusiness.state}</p>
                        <p>stars: {relatedBusiness.stars}</p>
                    </div>
                )}
            </div>
        </div>
    );
}