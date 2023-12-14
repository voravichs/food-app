import React, { useState, useEffect } from "react";

export default function TopCities() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/businesses/topCitiesByBusinessCount`)
          .then(res => res.json())
          .then(resJson => setData(resJson));
    }, []);

    return (
        <div>
            {data.map(city  =>
                <div key={`${city.city}`}>{city.city}, avg stars: {city.avg_stars}, num businesses: {city.business_count}</div>
            )}
        </div>
    )
}