import { useEffect, useState } from 'react';

import './Films.css';

import { NavLink } from 'react-router-dom';

const Films = () => {
    interface Film {
        title: string;
        opening_crawl: string;
        director: string;
        producer: string;
        release_date: string;
    }

    const [films, setFilms] = useState<Film[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const Films = async () => {

            setLoading(true);

            const response = await fetch(`https://swapi.dev/api/films/`);

            const data = await response.json();

            setFilms(data.results);

            setLoading(false);
        };

        Films();

    }, []);

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
                    <h1 style={{ color: 'White' }}>Star Wars Films</h1>

                    <div className='container_persons'>

                        {films.map((film, index) => (

                            <div key={index} className='container_person_details'>
                                <p>Title: {film.title}</p>
                                <p>Opening Crawl: {film.opening_crawl}</p>
                                <p>Director: {film.director}</p>
                                <p>Producer: {film.producer}</p>
                                <p>Release Date: {film.release_date}</p>
                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/Flims.avif" alt="" />
                                </div>
                            </div>

                        ))}

                    </div>

                    {loading && <div className='loader_container'><div className="loader"></div></div>}

                </div>
            </div>
        </>
    );
};

export default Films;
