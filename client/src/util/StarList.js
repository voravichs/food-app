import { FaStar } from "react-icons/fa";

/* Populates a list of stars based on arg stars */
export function starListMaker(stars, id) {
    let starList = [];
    let numStars = Math.round(stars)
    for (let i = 0; i < numStars; i++) {
        starList.push({
            star: <FaStar className='text-yellow-500' key={`${i}${id}`} />
        })
    }
    for (let i = numStars; i < 5; i++) {
        starList.push({
            star: <FaStar className='text-white' key={`${i}${id}`} />
        })
    }
    return starList;
}