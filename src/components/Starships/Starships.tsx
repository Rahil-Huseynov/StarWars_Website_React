import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Starships.css'

const Starships = () => {

    interface IStarships {
        name: string;
        model: string;
        manufacturer: string;
        cost_in_credits: string;
        length: string;
        max_atmosphering_speed: string;
        crew: string;
        passengers: string;
        cargo_capacity: string;

    }

    const [starships, setStarships] = useState<IStarships[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const Starships = async () => {

            setLoading(true);

            const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);

            const data = await response.json();

            setStarships(prevstarships => [...prevstarships, ...data.results]);

            setLoading(false);
        };

        Starships();

    }, [page]);

    const loadMore = () => {
        if (page < 4) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <>
            <div className='container'>
                <div className="navbar" id="navbar">
                    <NavLink className="navbar_items" to='/'>Home</NavLink>
                    <NavLink className="navbar_items" to='/people'>People</NavLink>
                    <NavLink className="navbar_items" to='/films'>Films</NavLink>
                    <NavLink className="navbar_items" to='/planets'>Planets</NavLink>
                    <NavLink className="navbar_items" to='/species'>Species</NavLink>
                    <NavLink className="navbar_items" to='/starships'>Starships</NavLink>
                    <NavLink className="navbar_items" to='/vehicles'>Vehicles</NavLink>
                </div>

                <div className='container_item'>
                    <h1 style={{ color: 'White' }}>Star Wars Species</h1>

                    <div className='container_persons'>
                        {starships.map((starships, index) => (

                            <div key={index} className='container_person_details'>
                                <p>Name: {starships.name}</p>
                                <p>Model: {starships.model}</p>
                                <p>Manufacturer: {starships.manufacturer}</p>
                                <p>Cost in Credits: {starships.cost_in_credits}</p>
                                <p>Length: {starships.length}</p>
                                <p>Max Atmosphering Speed: {starships.max_atmosphering_speed}</p>
                                <p>Crew: {starships.crew}</p>
                                <p>Passengers: {starships.passengers}</p>
                                <p>Cargo Capacity: {starships.cargo_capacity}</p>
                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/starships.jpg" alt="" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {loading && <div className='loader_container'><div className="loader"></div></div>}

                    <div className='link_container'>
                        {!loading && page < 4 && (
                            <Link to='#' onClick={loadMore}>
                                <img className='loadmore' src="/src/assets/more-or-less.png" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Starships;
