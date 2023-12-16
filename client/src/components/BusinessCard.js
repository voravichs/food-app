import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

import { starListMaker } from "../util/StarList";

/**
 * Business Card component to display info about a business
 * @param {*} business business json
 */
export default function BusinessCard({business}) {
    // Navigation
    const navigate = useNavigate();
    
    // Stars
    let starList = starListMaker(business.stars, business.business_id);
    let existStars = business.stars;
    if (!existStars) {
        existStars = "N/A"
    } else {
        existStars += " stars"
    }

    // Redirects
    function goToBusiness(business) {
        navigate(`/business/?businessid=${business.business_id}`);
    }


    return (
        <div className="hover:brightness-125 hover:cursor-pointer" 
                            onClick={() => goToBusiness(business)}
                            key={`${business.business_id}`}>
            <motion.div className="flex flex-col items-center p-8
                border border-gray-200 rounded-lg shadow-xl 
                bg-slate-400 dark:bg-slate-700 h-60 "
                initial={{scale: 0.25}}
                animate={{scale: 1}}
                transition={{duration: 0.5, ease: "easeOut"}}>
                <h1 className="text-3xl text-neutral-800 dark:text-neutral-200 font-bold ">
                    {business.name}
                </h1>
                <p className="text-lg text-neutral-800 dark:text-neutral-200 mb-2">
                    {business.city}, {business.state}
                </p>
                <div className="flex text-2xl text-gray-800 dark:text-gray-300">
                    {starList.map(item => (
                        item.star
                    ))}
                </div>
                <p className="ml-4 text-sm text-gray-800 dark:text-gray-300">{existStars}</p>
            </motion.div>
        </div>
    )
}