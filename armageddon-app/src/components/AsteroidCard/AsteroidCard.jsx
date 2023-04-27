import { AsteroidCardAction } from "./AsteroidCardAction/AsteroidCardAction"
import { AsteroidCardContent } from "./AsteroidCardContent/AsteroidCardContent";
import { AsteroidCardImage } from "./AsteroidCardImage/AsteroidCardImage";
import styles from "./Card.module.css"

export const AsteroidCard = (props) =>{
    const {name, date,distance, size, isDangerous, distanceMode} = props

    return (<div className={styles.card}>
            <div className={isDangerous ? styles.cardRed : styles.regularCard}></div>
                <AsteroidCardImage />
            <AsteroidCardContent name={name} distance={distance} size={size} date={date} distanceMode={distanceMode}/>
            <AsteroidCardAction isDangerous={isDangerous}/>
        </div>)
}
