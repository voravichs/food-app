import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegLightbulb, FaRegLaughSquint  } from "react-icons/fa";
import { BsEmojiSunglasses } from "react-icons/bs";
import { motion } from "framer-motion"

import Loading from "../components/Loading";
import { starListMaker } from "../util/StarList";
import emptyProfile from "../images/blankprofile.png"

let months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.",
]

export default function Review() {
    const location = useLocation();
    const reviewId = new URLSearchParams(location.search).get("reviewId");
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false); 
    const [yearMonthDay, setYearMonthDay] = useState([]); 
    const [timestamp, setTimestamp] = useState(); 

    // API Routes
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`http://localhost:8080/api/reviews/${reviewId}`);
            let json = await data.json();
            setLoaded(true);
            setData(json[0]);
            setYearMonthDay(json[0].date.split("T")[0].split("-"))
            setTimestamp(json[0].date.split("T")[1].split(".")[0])
        }
        fetchData()
            .catch(console.error);
    }, [data.date, reviewId]);

    // Stars
    let starList = starListMaker(data.stars, data.review_id);
    let existStars = data.stars;
    if (!existStars) {
        existStars = "N/A"
    } else {
        existStars += " stars"
    }

    // Redirects
    function goToUser() {
        navigate(`/user/?userId=${data.user_id}`);
    }

    return (
        <div>
            {loaded 
                ?
                <motion.div className="py-8 px-16 mx-8 
                    bg-slate-600 rounded-lg 
                    text-xl text-neutral-800 dark:text-neutral-200 shadow-xl 
                    flex flex-col"
                    initial={{scale: 0.25}}
                    animate={{scale: 1}}
                    transition={{duration: 0.25, ease: "easeInOut"}}>
                    <div className="flex mb-4 group hover:cursor-pointer"
                        onClick={() => goToUser()}>
                        <img src={`${emptyProfile}`} alt="empty profile"
                            className="w-20 rounded-lg mr-4"/>
                        <p className="text-3xl group-hover:underline" >
                            {data.reviewer}
                        </p>
                    </div>
                    <p className="text-2xl font-bold">{data.business_name}</p>
                    <div className="flex text-3xl">
                        {starList.map(item => (
                            item.star
                        ))}
                        
                    </div>
                    <p className="text-sm mb-4">
                        {`${months[yearMonthDay[1] - 1]}`} {yearMonthDay[2]}, {yearMonthDay[0]}, {timestamp}
                    </p>
                    <p className="mb-4">{data.text}</p>
                    <div className="flex gap-2">
                        <p className="flex rounded-md bg-slate-700 py-1 px-4">
                            <FaRegLightbulb className="text-2xl mr-2"/> Useful <span className="font-bold ml-1"> {data.useful}</span>
                        </p>
                        <p className="flex rounded-md bg-slate-700 py-1 px-4">
                            <FaRegLaughSquint className="text-2xl mr-2"/> Funny <span className="font-bold ml-1"> {data.funny}</span>
                        </p>
                        <p className="flex rounded-md bg-slate-700 py-1 px-4">
                            <BsEmojiSunglasses className="text-2xl mr-2"/> Cool <span className="font-bold ml-1"> {data.cool}</span>
                        </p>
                    </div>        
                </motion.div>  
                : <Loading text="Review"/>
            }          
        </div>

    )
}