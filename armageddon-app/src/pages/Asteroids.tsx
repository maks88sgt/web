import styles from "./Asteroids.module.css"
import {AsteroidCard} from "../components/AsteroidCard/AsteroidCard";
import {useContext, useEffect, useState} from "react";
import {AsteroidsContext} from "../components/asteroids-context/AsteroidsContext";

export const Asteroids = () => {
    const [asteroids, setAsteroids] = useState<{
        name: string;
        date: string;
        distance: {
            kilometers: number;
            lunar: number;
        },
        size: number;
        id: string;
        isDangerous: boolean
    }[]>([]);

    useEffect(() => {
        try {
            const result = fetch("https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY").then((res) => {
                return res.json()
            }).then((response) => {
                let rawAsteroids = []

                for (const data in response.near_earth_objects) {
                    rawAsteroids = rawAsteroids.concat(response.near_earth_objects[data])
                }

                const asteroids = rawAsteroids.map(item => {
                    const size = Math.trunc((item.estimated_diameter.meters.estimated_diameter_max + item.estimated_diameter.meters.estimated_diameter_min) / 2);
                    const close = item.close_approach_data[0]
                    return {
                        name: item.name,
                        date: close.close_approach_date,
                        size,
                        distance: {kilometers: close.miss_distance.kilometers, lunar: close.miss_distance.lunar},
                        isDangerous: item.is_potentially_hazardous_asteroid,
                        id: item.id
                    }
                })
                setAsteroids(asteroids)
            })

        } catch (err) {
            console.log(err)
            setAsteroids(generateAsteroids())
        }

    }, [])

    const {onlyDangerous, setOnlyDangerous, setDistanceMode} = useContext(AsteroidsContext)

    return <div>
        Home
        <div className={styles.showDangerousOnly}><input type="checkbox" value={onlyDangerous as unknown as string}
                                                         onChange={() => setOnlyDangerous(!onlyDangerous)}
        ></input> Показать только опасные
        </div>
        <div className={styles.distanceMode}>
            Расстояние <button onClick={() => setDistanceMode(true)}
                               className={styles.distanceChooser}>в
            километрах</button>
            , <button onClick={() => setDistanceMode(false)}
                      className={styles.distanceChooser}> в
            дистанциях до луны</button></div>
        <div style={{margin: "80px"}}>
        </div>
        {onlyDangerous ? asteroids.filter((it) => it.isDangerous).map((item) =>
            <AsteroidCard key={item.id} {...item} />) : asteroids.map((item) =>
            <AsteroidCard key={item.id} {...item} />)}
    </div>
}


const generateAsteroids = () => {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'ноября',
        'декабря',];

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = [];

    for (let i = 0; i < 10; i++) {
        const name = characters[(Math.random() * 25).toFixed(0)] + characters[(Math.random() * 25).toFixed(0)] + characters[(Math.random() * 25).toFixed(0)] + characters[(Math.random() * 25).toFixed(0)]
        const date = `${(Math.random() * 27 + 1).toFixed(0)} ${months[(Math.random() * 11).toFixed(0)]} 2023`
        const size = (Math.random() * 100 + 10).toFixed(0);
        const distance = (Math.random() * 90000000).toFixed(0);
        const isDangerous = Math.random() >= 0.5;
        result.push({name, date, size, distance, isDangerous, id: name})
    }
    return result;
}
