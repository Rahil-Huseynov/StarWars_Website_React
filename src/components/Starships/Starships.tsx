import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Starships.css'

interface IStarships {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
}


const Modal = ({ starships , onClose }: { starships: IStarships | null, onClose: () => void }) => {
    useEffect(() => {
        if (starships) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [starships]);

    if (!starships) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={onClose} style={{ color: 'red' }}>&times;</span>
                    <div className="modal_content_items">
                        <p>Name: {starships.name}</p>
                        <p>Model: {starships.model}</p>
                        <p>Manufacturer: {starships.manufacturer}</p>
                        <p>Cost in Credits: {starships.cost_in_credits}</p>
                        <p>Length: {starships.length}</p>
                        <p>Max Atmosphering Speed: {starships.max_atmosphering_speed}</p>
                        <p>Crew: {starships.crew}</p>
                        <div className='person_image_container'>
                            <img className='person_image' src="/src/assets/starships.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const Starships = () => {


    const [starships, setStarships] = useState<IStarships[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');

    const [selectedStarships, setSelectedStarships] = useState<IStarships | null>(null);


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




    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value.toLowerCase());

    };

    const filteredstarships = starships.filter(starships =>

        starships.name.toLowerCase().includes(search)

    );

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


                <div className='title_container'>
                    <div>
                        <h1 style={{ color: 'White' }}>Star Wars Starships</h1>
                    </div>

                    <div className='container_input'>
                        <input className='search' type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
                    </div>

                </div>


                <div className='container_item'>
                    <div className='container_persons'>
                        {filteredstarships.map((starships, index) => (

                            <div key={index} className='container_person_details'>
                                <p>Name: {starships.name}</p>

                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/starships.jpg" alt="" />
                                </div>

                                <Link to="#" onClick={() => setSelectedStarships(starships)}> <img className='loadmore' src="/src/assets/read-more.png " alt="" /></Link>

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

            <Modal starships={selectedStarships} onClose={() => setSelectedStarships(null)} />

        </>
    );
};

export default Starships;
