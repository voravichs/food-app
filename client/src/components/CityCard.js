import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion"

export default function CityCard({city}) {

    let starList = [];
    let stars = Math.round(city.avg_stars)
    for (let i = 0; i < stars; i++) {
        starList.push({
            star: <FaStar className='text-yellow-500' key={`${i}${city.city}`} />
        })
    }
    for (let i = stars; i < 5; i++) {
        starList.push({
            star: <FaStar className='text-white' key={`${i}${city.city}`} />
        })
    }

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
            initial={{scale: 0.25}}
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