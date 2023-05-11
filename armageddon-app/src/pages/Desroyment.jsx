import { Header } from '../components/header/Header';
import { AsteroidsContext } from '../components/asteroids-context/AsteroidsContext';
import { useContext } from 'react';
import { AsteroidCard } from '../components/AsteroidCard/AsteroidCard';

export const Destroyment = () => {
    const { destroyment } = useContext(AsteroidsContext);

    console.log(destroyment);

    return (
        <div>
            <Header />
            {destroyment.map((item) => (
                <AsteroidCard key={item.id} {...item} />
            ))}
        </div>
    );
};
