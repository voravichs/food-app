import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function User() {
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get("userId");
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [popularBusinessesData, setPopularBusinessesData] = useState([]);

    // API Routes
    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}`)
            .then(res => res.json())
            .then(resJson => setUserData(resJson[0]));
    }, [userData, userId]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${userId}/popularBusinesses`)
            .then(res => res.json())
            .then(resJson => setPopularBusinessesData(resJson));
    }, [popularBusinessesData, userId]);

    // Redirects
    function goToBusiness(business) {
        navigate(`/business/?businessid=${business.business_id}`);
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
                <p>Popular restaurants this user has visited:</p>
                {popularBusinessesData.map(business =>
                    <div className="text-xl hover:cursor-pointer hover:text-2xl"
                        onClick={() => goToBusiness(business)}>
                        {business.name}
                    </div>
                )}
           </div>
           <div>
                <p>User Reviews</p>

           </div>
        </div>
    );
}