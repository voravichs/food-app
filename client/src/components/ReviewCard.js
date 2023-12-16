import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

import { starListMaker } from "../util/StarList";

export default function ReviewCard({review}) {
    const navigate = useNavigate();

    // Stars
    let starList = starListMaker(review.stars, review.review_id);
    let existStars = review.stars;
    if (!existStars) {
        existStars = "N/A"
    } else {
        existStars += " stars"
    }


    // Redirects
    function goToReview(review) {
        navigate(`/review/?reviewId=${review.review_id}`);
    }

    return (
        <div className="hover:brightness-125 hover:cursor-pointer" 
            onClick={() => goToReview(review)}
            key={`${review.review_id}`} >
            <motion.div className="text-xl bg-slate-600 p-8 px-12 rounded-lg 
            text-neutral-800 dark:text-neutral-200 shadow-xl 
            flex flex-col md:flex-row gap-8"
                initial={{scale: 0.25}}
                animate={{scale: 1}}
                transition={{duration: 0.5, ease: "easeInOut"}}>
                <div className="flex flex-col items-center justify-center">
                    <p className="font-bold mb-2">{review.name}</p>
                    <p className="flex text-2xl">
                        {starList.map(item => (
                            item.star
                        ))}
                    </p>
                    <p>{existStars}</p>
                </div>    
                <p className="row-span-2 md:col-span-2">{review.text}</p>
            </motion.div>
        </div>
    )
}