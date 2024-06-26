import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Species.css'

const Species = () => {

    interface ISpecies {
        name: string;
        classification: string;
        designation: string;
        average_height: string;
        skin_colors: string;
        hair_colors: string;
        average_lifespan: string;
        language: string;

    }

    const [species, setspecies] = useState<ISpecies[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const Species = async () => {

            setLoading(true);

            const response = await fetch(`https://swapi.dev/api/species/?page=${page}`);

            const data = await response.json();

            setspecies(prevspecies => [...prevspecies, ...data.results]);

            setLoading(false);
        };

        Species();

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
                        {species.map((species, index) => (

                            <div key={index} className='container_person_details'>
                                <p>Name: {species.name}</p>
                                <p>Classification: {species.classification}</p>
                                <p>Designation: {species.designation}</p>
                                <p>Average Height: {species.average_height}</p>
                                <p>Skin Colors: {species.skin_colors}</p>
                                <p>Hair Colors: {species.hair_colors}</p>
                                <p>Average Lifespan: {species.average_lifespan}</p>
                                <p>Language: {species.language}</p>
                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/Species.avif" alt="" />
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

export default Species;
