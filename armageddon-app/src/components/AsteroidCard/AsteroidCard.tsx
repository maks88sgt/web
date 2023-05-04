import { AsteroidCardAction } from "./AsteroidCardAction/AsteroidCardAction"
import { AsteroidCardContent } from "./AsteroidCardContent/AsteroidCardContent";
import { AsteroidCardImage } from "./AsteroidCardImage/AsteroidCardImage";
import styles from "./Card.module.css"

type AsteroidCardProps = {
    name: string;
    date: string;
    distance: {
        kilometers: number;
        lunar: number;
    },
    size: number;
    isDangerous: boolean;
    distanceMode: boolean
}

export const AsteroidCard = (props: AsteroidCardProps) =>{
    const {isDangerous, size, distanceMode, distance, name, date} = props

    return (<div className={styles.card}>
            <div className={isDangerous ? styles.cardRed : styles.regularCard}></div>
                <AsteroidCardImage />
            <AsteroidCardContent name={name} distance={distance} size={size} date={date} distanceMode={distanceMode}/>
            <AsteroidCardAction isDangerous={isDangerous}/>
        </div>)
}
