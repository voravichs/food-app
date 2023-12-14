import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function User() {
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get("userId");
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [popularBusinessesData, setPopularBusinessesData] = useState([]);
    const [pastVisitData, setPastVisitData] = useState([]);
    const [recommendedBusinessData, setRecommendedBusinesses] = useState([]);

    // API Routes
    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}`)
            .then(res => res.json())
            .then(resJson => setUserData(resJson[0]));
    }, [userId]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}/popularBusinesses`)
            .then(res => res.json())
            .then(resJson => setPopularBusinessesData(resJson));
    }, [userId]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}/findPastVisits`)
            .then(res => res.json())
            .then(resJson => setPastVisitData(resJson));
    }, [userId]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}/recommendedBusinesses`)
            .then(res => res.json())
            .then(resJson => setRecommendedBusinesses(resJson));
    }, [userId]);

    // Redirects
    function goToBusiness(businessId) {
        navigate(`/business/?businessid=${businessId}`);
    }
    
    return (
        <div>
           <p>name: {userData.name}</p> 
           <p>review count: {userData.review_count}</p> 
           <p>yelping since: {userData.yelping_since}</p> 
           <p>useful reviews: {userData.useful}</p> 
           <p>funny reviews: {userData.funny}</p> 
           <p>cool reviews: {userData.cool}</p> 
           <p>fans: {userData.fans}</p> 
           <p>avg stars: {userData.average_stars}</p> 
           <div>
                <h1 className="text-3xl">Popular restaurants this user has visited:</h1>
                {popularBusinessesData.map(business =>
                    <div className="text-xl hover:cursor-pointer hover:text-2xl"
                        onClick={() => goToBusiness(business.business_id)}
                        key={`${business.business_id}`}>
                        {business.name}
                    </div>
                )}
           </div>
           <div>
                <h1 className="text-3xl">User Reviews</h1>
                {pastVisitData.map(review =>
                    <div>
                        <div className="text-xl hover:cursor-pointer hover:text-2xl"
                            onClick={() => goToBusiness(review.business_id)}
                            key={`${review.review_id}`}>
                            {review.name}
                        </div>
                        <p>{review.text}</p>
                    </div>
                )}
           </div>
           <div>
                <h1 className="text-3xl">Recommended Businesses from City User has been to most frequently</h1>
                {recommendedBusinessData.map(business =>
                    <div className="text-xl hover:cursor-pointer hover:text-2xl"
                        onClick={() => goToBusiness(business.business_id)}
                        key={`${business.business_id}`}>
                        {business.name}
                    </div>
                )}
           </div>
        </div>
    );
}