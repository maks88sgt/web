import { AsteroidCardAction } from './AsteroidCardAction/AsteroidCardAction';
import { AsteroidCardContent } from './AsteroidCardContent/AsteroidCardContent';
import { AsteroidCardImage } from './AsteroidCardImage/AsteroidCardImage';
import styles from './Card.module.css';
import {AsteroidCardContentContainer} from "./AsteroidCardContent/AsteroidCardContentContainer";


type AsteroidCardProps = {
    name: string;
    date: string;
    distance: {
        kilometers: number;
        lunar: number;
    };
    size: number;
    isDangerous: boolean;
};

export const AsteroidCard = (props: AsteroidCardProps) => {
    const { isDangerous, size, distance, name, date } = props;

    return (
        <div className={styles.card}>
            <div
                className={isDangerous ? styles.cardRed : styles.regularCard}
            ></div>
            <AsteroidCardImage />
            <AsteroidCardContentContainer
                name={name}
                distance={distance}
                size={size}
                date={date}
            />
            <AsteroidCardAction isDangerous={isDangerous} />
        </div>
    );
};
