import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

// components
import BusinessCard from "../components/BusinessCard";
import ReviewCard from "../components/ReviewCard";
import Loading from "../components/Loading";

/**
 * Business Page
 */
export default function Business() {
    // Location Handling from URL Param
    const location = useLocation();
    const businessId = new URLSearchParams(location.search).get("businessid");

    // States
    const [businessData, setBusinessData] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [relatedBusinessData, setRelatedBusinessData] = useState([]);
    const [page, setPage] = useState(1); 
    const [pageSize] = useState(6);
    const [loadedBusiness, setLoadedBusiness] = useState(false); 
    const [loadedBusinessReviews, setLoadedBusinessReviews] = useState(false); 
    const [loadedRelatedBusinesses, setLoadedRelatedBusinesses] = useState(false); 
    const [emptyReviews, setEmptyReviews] = useState(false);
    const [emptyRelatedBusinesses, setEmptyRelatedBusinesses] = useState(false);

    // API Routes
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/businesses/${businessId}`);
            let json = await data.json();
            setLoadedBusiness(true);
            setBusinessData(json[0]);
        }
        fetchData()
            .catch(console.error);
    }, [businessId]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/businesses/${businessId}/reviews/?page=${page}&pageSize=${pageSize}`);
            let json = await data.json();
            setLoadedBusinessReviews(true);
            setReviewData(json);
            if (json.length === 0) {
                setEmptyReviews(true);
            }
        }
        fetchData()
            .catch(console.error);
    }, [businessId, page, pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/businesses/${businessId}/relatedBusinesses`);
            let json = await data.json();
            setLoadedRelatedBusinesses(true);
            setRelatedBusinessData(json);
            if (json.length === 0) {
                setEmptyRelatedBusinesses(true);
            }
        }
        fetchData()
            .catch(console.error);
    }, [businessId]);
    
    // Page Navigation
    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page - 1 > 0) {
            setPage(page - 1);
        }
    }

    // Unique Starlist implementation
    const starList = useMemo(() => {
        let starList = [];
        let stars = Math.round(businessData.stars)
        for (let i = 0; i < stars; i++) {
            starList.push({
                star: <FaStar className='text-white bg-yellow-500 rounded p-1 mr-1' key={`${i}${businessData.business_id}`} />
            })
        }
        for (let i = stars; i < 5; i++) {
            starList.push({
                star: <FaStar className='' key={`${i}${businessData.business_id}`} />
            })
        }
    
        let existStars = businessData.stars;
        if (!existStars) {
            existStars = "N/A"
        } else {
            existStars += " stars"
        }
        return starList;
    }, [businessData.business_id, businessData.stars]);

    return (
        <div className="mx-16">
            {/* Business */}
            {loadedBusiness 
                ?
                <div className="mb-12">
                    <p className="text-5xl text-neutral-700 font-bold">
                        {businessData.name}
                    </p>
                    <p className="text-xl text-neutral-600 mb-4">
                        {businessData.city}, {businessData.state}
                    </p>
                    <p className="flex text-3xl text-gray-800 dark:text-gray-300 mb-4"> 
                        {starList.map(item => (
                            item.star
                        ))}
                    </p>
                    <p className="text-xl text-neutral-800 mb-4">
                        {businessData.categories}
                    </p>
                </div>    
                : <Loading text="Business"/>
            }

            {/* Reviews for Business */}
            {loadedBusinessReviews 
                ?
                <div>
                    <h1 className="text-3xl text-neutral-700 font-bold mb-4">Reviews</h1>
                    {/* Case for No Reviews */}
                    {emptyReviews
                        ? 
                        <div className="text-2xl mb-8 flex-center">
                            No Reviews Available
                        </div>
                        :
                        <div className="mb-8">
                            <div className="flex-center mb-4">
                                <FaArrowLeft className="text-5xl mr-4 hover:cursor-pointer" onClick={prevPage}/>
                                <FaArrowRight className="text-5xl hover:cursor-pointer" onClick={nextPage}/>
                            </div>      
                            <div className="flex flex-col gap-4 mb-4">
                                {reviewData.map(review =>
                                    <ReviewCard key={`${review.review_id}`} review={review}/>
                                )}
                            </div>              
                        </div>
                    }
                    
                </div>
                : <Loading text="Business Reviews"/>
            }

            {/* Related Businesses */}
            {loadedRelatedBusinesses 
                ?
                <div>
                    <h1 className="text-3xl text-neutral-700 font-bold mb-4">
                        Related Businesses 
                    </h1>
                    {/* Case for No Related Busninesses */}
                    {emptyRelatedBusinesses 
                        ?
                        <div className="text-2xl mb-8 flex-center">
                            No Related Businesses Available
                        </div>
                        :
                        <div className="grid grid-rows-5 md:grid-cols-2 md:grid-rows-3 xl:grid-cols-5 xl:grid-rows-1 grid-col-3 gap-4">
                            {relatedBusinessData.map(relatedBusiness =>
                                <BusinessCard key={`${relatedBusiness.business_id}`} business={relatedBusiness}/>
                            )}
                        </div>
                    }
                </div>
                : <Loading text="Related Businesses"/>
            }
        </div>
    );
}