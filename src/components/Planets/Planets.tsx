import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Planets.css'

const Planets = () => {

    interface IPlanet {
        name: string;
        rotation_period: string;
        orbital_period: string;
        diameter: string;
        climate: string;
        terrain: string;
        population: string;
    }
    const [planet, setplanet] = useState<IPlanet[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');

    useEffect(() => {

        const Planets = async () => {

            setLoading(true);

            const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);

            const data = await response.json();

            setplanet(prevplanet => [...prevplanet, ...data.results]);

            setLoading(false);
        };

        Planets();
    }, [page]);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value.toLowerCase());

    };

    const filteredplanet = planet.filter(planet =>

        planet.name.toLowerCase().includes(search)

    );

    const loadMore = () => {
        if (page < 6) {
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


                <div className='title_container'>
                    <div>
                        <h1 style={{ color: 'White' }}>Star Wars Planets</h1>
                    </div>

                    {!loading && page < 9 && (<div className='container_input'>
                        <input className='search' type="text" placeholder="Search by title" value={search} onChange={handleSearch} />
                    </div>)}

                </div>

                <div className='container_item'>
                    <div className='container_persons'>
                        {filteredplanet.map((planets, index) => (
                            <div key={index} className='container_person_details'>
                                <p>Name: {planets.name}</p>
                                <p>Rotation Period: {planets.rotation_period}</p>
                                <p>Orbital Period: {planets.orbital_period}</p>
                                <p>Diameter: {planets.diameter}</p>
                                <p>Climate: {planets.climate}</p>
                                <p>Terrain: {planets.terrain}</p>
                                <p>Population: {planets.population}</p>
                                <p>Climate: {planets.climate}</p>
                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/planet.jpeg" alt="" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {loading && <div className='loader_container'><div className="loader"></div></div>}

                    <div className='link_container'>
                        {!loading && page < 6 && (
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

export default Planets;
