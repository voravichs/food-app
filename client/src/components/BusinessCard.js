import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion"

export default function BusinessCard({business}) {
    
    let starList = [];
    let stars = Math.round(business.stars)
    for (let i = 0; i < stars; i++) {
        starList.push({
            star: <FaStar className='text-yellow-500' key={`${i}${business.business_id}`} />
        })
    }
    for (let i = stars; i < 5; i++) {
        starList.push({
            star: <FaStar className='text-white' key={`${i}${business.business_id}`} />
        })
    }

    let existStars = business.stars;
    if (!existStars) {
        existStars = "N/A"
    } else {
        existStars += " stars"
    }

    return (
        <motion.div className="block p-8 w-96 md:w-full
            border border-gray-200 rounded-lg shadow-xl 
            bg-slate-400 dark:bg-slate-700 h-48 "
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{duration: 0.25, ease: "easeOut"}}>
            <h1 className="text-2xl text-neutral-800 dark:text-neutral-200 font-bold ">
                {business.name}
            </h1>
            <p className="text-lg text-neutral-800 dark:text-neutral-200">
                {business.city}, {business.state}
            </p>
            <div className="flex text-2xl text-gray-800 dark:text-gray-300">
                {starList.map(item => (
                    item.star
                ))}
                <p className="ml-4 text-xl">{existStars}</p>
            </div>
        </motion.div>
    )
}