import { motion } from "framer-motion"

import { starListMaker } from "../util/StarList";

/**
 * City Card component to display info about a city
 * @param {*} city city json
 */
export default function CityCard({city}) {
    
    // Stars
    let starList = starListMaker(city.avg_stars, city.city);
    let existStars = city.avg_stars;
    if (!existStars) {
        existStars = "N/A"
    } else {
        existStars += " stars"
    }

    return (
        <motion.div className="block p-8 w-96 md:w-full
            border border-gray-200 rounded-lg shadow-xl 
            bg-slate-400 dark:bg-slate-700"
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{duration: 0.5, ease: "easeOut"}}>
            <h1 className="mb-2 text-2xl text-neutral-800 dark:text-neutral-200 font-bold ">
                {city.city}, {city.state}
            </h1>
            <p className="font-normal text-gray-800 dark:text-gray-300 mb-2">
                Business Count: {city.business_count}
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