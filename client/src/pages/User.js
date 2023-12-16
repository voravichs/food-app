import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaRegLightbulb, FaRegLaughSquint, FaArrowLeft, FaArrowRight  } from "react-icons/fa";
import { BsChatLeftText, BsEmojiSunglasses } from "react-icons/bs";
import { SlUserFollow } from "react-icons/sl";
import { FaStar } from "react-icons/fa";

// Componenets
import BusinessCard from "../components/BusinessCard";
import emptyProfile from "../images/blankprofile.png"
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";

// List of months for conversion
let months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.",
]

/**
 * User Page
 */
export default function User() {
    // Location Handling from URL Param
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get("userId");

    // States
    const [userData, setUserData] = useState({});
    const [popularBusinessesData, setPopularBusinessesData] = useState([]);
    const [pastVisitData, setPastVisitData] = useState([]);
    const [recommendedBusinessData, setRecommendedBusinesses] = useState([]);
    const [loadedUser, setLoadedUser] = useState(false); 
    const [page, setPage] = useState(1); 
    const [pageSize] = useState(5);
    const [loadedPopBusinesses, setLoadedPopBusinesses] = useState(false); 
    const [loadedPastVisitData, setLoadedPastVisitData] = useState(false); 
    const [loadedRecomBusinesses, setLoadedRecomBusinesses] = useState(false); 
    const [yearMonthDay, setYearMonthDay] = useState([]); 
    const [timestamp, setTimestamp] = useState(); 

    // API Routes
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/users/${userId}`);
            let json = await data.json();
            setLoadedUser(true);
            setUserData(json[0]);
            setYearMonthDay(json[0].yelping_since.split("T")[0].split("-"))
            setTimestamp(json[0].yelping_since.split("T")[1].split(".")[0])
        }
        fetchData()
            .catch(console.error);
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/users/${userId}/popularBusinesses`);
            let json = await data.json();
            setLoadedPopBusinesses(true);
            setPopularBusinessesData(json);
        }
        fetchData()
            .catch(console.error);
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/users/${userId}/findPastVisits/?page=${page}&pageSize=${pageSize}`);
            let json = await data.json();
            if (json.length < 10) {
                data = await fetch(`http://localhost:8080/api/users/${userId}/findPastVisits`);
                json = await data.json();
            }
            setLoadedPastVisitData(true);
            setPastVisitData(json);
        }
        fetchData()
            .catch(console.error);
    }, [page, pageSize, userId]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/users/${userId}/recommendedBusinesses`);
            let json = await data.json();
            setLoadedRecomBusinesses(true);
            setRecommendedBusinesses(json);
        }
        fetchData()
            .catch(console.error);
    }, [userId]);

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
        <div className="mx-16">
            {loadedUser 
                ?
                <div className="mb-8">
                    <div className="flex mb-4">
                        <img src={`${emptyProfile}`} alt="empty profile"
                            className="w-28 rounded-lg mr-4"/>
                        <div className="flex flex-col" >
                            <p className="text-4xl">{userData.name}</p>
                            <p className="text-sm">yelping since: </p> 
                            <p className="text-sm">
                                {`${months[yearMonthDay[1] - 1]}`} {yearMonthDay[2]}, {yearMonthDay[0]}, {timestamp}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 text-neutral-800 dark:text-neutral-200 mb-2">
                        <p className="flex rounded-md bg-slate-700 py-2 px-4">
                            <BsChatLeftText className="text-2xl mr-2"/> Reviews <span className="font-bold ml-2"> {userData.review_count}</span>
                        </p>    
                        <p className="flex rounded-md bg-slate-700 py-2 px-4">
                            <FaRegLightbulb className="text-2xl text-yellow-100 mr-2"/> Useful <span className="font-bold ml-2"> {userData.useful}</span>
                        </p>  
                        <p className="flex rounded-md bg-slate-700 py-2 px-4">
                            <FaRegLaughSquint className="text-2xl text-emerald-200 mr-2"/> Funny <span className="font-bold ml-2"> {userData.funny}</span>
                        </p> 
                        <p className="flex rounded-md bg-slate-700 py-2 px-4">
                            <BsEmojiSunglasses className="text-2xl text-red-200 mr-2"/> Cool <span className="font-bold ml-2"> {userData.cool}</span>
                        </p> 
                    </div>
                    <p className="flex rounded-md bg-slate-700 py-2 px-4 text-neutral-800 dark:text-neutral-200 w-32 mb-2">
                        <SlUserFollow className="text-2xl mr-2"/> Fans <span className="font-bold ml-2"> {userData.fans}</span>
                    </p> 
                    <p className="flex rounded-md bg-slate-700 py-2 px-4 text-neutral-800 dark:text-neutral-200 w-56 mb-2">
                        <FaStar className="text-2xl mr-2 text-yellow-500"/> Average Rating <span className="font-bold ml-2"> {userData.average_stars}</span>
                    </p> 
                </div>
                : <Loading text="User"/>
            }
            
           {loadedPopBusinesses 
                ?
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Popular restaurants this user has visited:</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 justify-items-stretch">
                        {popularBusinessesData.map(business =>
                            <BusinessCard key={`${business.business_id}`} business={business}/>
                        )}    
                    </div>
                </div>
                : <Loading text="Popular Businesses"/>
           }
           
           {loadedPastVisitData
                ?
                <div className="flex flex-col gap-4 mb-8">
                    <h1 className="text-3xl font-bold mb-4">User Reviews</h1>
                    {pastVisitData.map(review =>
                        <ReviewCard key={`${review.review_id}`} review={review}/>
                    )}
                     <div className="flex-center mt-8">
                        <FaArrowLeft className="text-5xl mr-4 hover:cursor-pointer" onClick={prevPage}/>
                        <FaArrowRight className="text-5xl hover:cursor-pointer" onClick={nextPage}/>
                    </div>
                </div>
                : <Loading text="User Reviews"/>
            }
           
           {loadedRecomBusinesses
                ?
                <div>
                    <h1 className="text-3xl font-bold mb-4">Recommended Businesses from the city {userData.name} has been to most frequently</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 justify-items-stretch">
                        {recommendedBusinessData.map(business =>
                            <BusinessCard key={`recommend-${business.business_id}`} business={business}/>
                        )}                    
                    </div>

                </div>
                : <Loading text="Recommended Businesses"/>
            }
           
        </div>
    );
}