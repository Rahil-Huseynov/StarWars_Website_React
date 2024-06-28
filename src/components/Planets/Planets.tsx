import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Planets.css'

interface IPlanet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    terrain: string;
    population: string;
}


const Modal = ({ planet, onClose }: { planet: IPlanet | null, onClose: () => void }) => {
    useEffect(() => {
        if (planet) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [planet]);

    if (!planet) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={onClose} style={{ color: 'red' }}>&times;</span>
                    <div className="modal_content_items">
                        <p>Name: {planet.name}</p>
                        <p>Rotation Period: {planet.rotation_period}</p>
                        <p>Orbital Period: {planet.orbital_period}</p>
                        <p>Diameter: {planet.diameter}</p>
                        <p>Climate: {planet.climate}</p>
                        <p>Terrain: {planet.terrain}</p>
                        <p>Population: {planet.population}</p>
                        <div className='person_image_container'>
                            <img className='person_image' src="/src/assets/planet.jpeg" alt="planet" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const Planets = () => {

    const [planet, setplanet] = useState<IPlanet[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');

    const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | null>(null);


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

                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/planet.jpeg" alt="" />
                                </div>

                                <Link to="#" onClick={() => setSelectedPlanet(planets)}> <img className='loadmore' src="/src/assets/read-more.png " alt="" /></Link>

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
            <Modal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />

        </>
    );
};

export default Planets;
