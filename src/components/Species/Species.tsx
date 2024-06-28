import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Species.css'

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


const Modal = ({ species, onClose }: { species: ISpecies | null, onClose: () => void }) => {
    useEffect(() => {
        if (species) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [species]);

    if (!species) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={onClose} style={{ color: 'red' }}>&times;</span>
                    <div className="modal_content_items">
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
                </div>
            </div>
        </>
    );
};

const Species = () => {


    const [species, setspecies] = useState<ISpecies[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');

    const [selectedSpecies, setSelectedSpecies] = useState<ISpecies | null>(null);


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



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value.toLowerCase());

    };

    const filteredSpecies = species.filter(species =>

        species.name.toLowerCase().includes(search)

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
                        <h1 style={{ color: 'White' }}>Star Wars Species</h1>
                    </div>

                    {!loading && page < 9 && (<div className='container_input'>
                        <input className='search' type="text" placeholder="Search by title" value={search} onChange={handleSearch} />
                    </div>)}

                </div>

                <div className='container_item'>
                    <div className='container_persons'>

                        {filteredSpecies.map((species, index) => (

                            <div key={index} className='container_person_details'>
                                <p>Name: {species.name}</p>
                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/Species.avif" alt="" />
                                </div>
                                <Link to="#" onClick={() => setSelectedSpecies(species)}> <img className='loadmore' src="/src/assets/read-more.png " alt="" /></Link>

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

            <Modal species={selectedSpecies} onClose={() => setSelectedSpecies(null)} />

        </>
    );
};

export default Species;
