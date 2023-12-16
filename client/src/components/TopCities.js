import React, { useState, useEffect } from "react";
import CityCard from './CityCard'

import Loading from "../components/Loading";

/**
 * Top Cities component to be displayed on the home page
 */
export default function TopCities() {
    // States
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false); 

    // API Routes
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch(`/api/businesses/topCitiesByBusinessCount`);
            let json = await data.json();
            setLoaded(true);
            setData(json)
        }
        fetchData()
            .catch(console.error);
    }, []);

    return (
        <div>
            {loaded 
                ? 
                <div className="w-full grid grid-cols-1 gap-y-4 gap-x-4 place-items-center
                    md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5">
                    {data.map(city =>
                        <CityCard key={`${city.city}`} city={city}/>
                    )}
                </div>
                : <Loading text="Cities"/>
            } 
        </div>
        
    )
}