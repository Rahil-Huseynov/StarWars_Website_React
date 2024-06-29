import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Vehicles.css'

interface IVehicle {
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


const Modal = ({ vehicle, onClose }: { vehicle: IVehicle | null, onClose: () => void }) => {
    useEffect(() => {
        if (vehicle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [vehicle]);

    if (!vehicle) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={onClose} style={{ color: 'red' }}>&times;</span>
                    <div className="modal_content_items">
                        <p>Name: {vehicle.name}</p>
                        <p>Model: {vehicle.model}</p>
                        <p>Manufacturer: {vehicle.manufacturer}</p>
                        <p>Cost in Credits: {vehicle.cost_in_credits}</p>
                        <p>Length: {vehicle.length}</p>
                        <p>Max Atmosphering Speed: {vehicle.max_atmosphering_speed}</p>
                        <p>Crew: {vehicle.crew}</p>
                        <p>Passengers: {vehicle.passengers}</p>
                        <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
                        <div className='person_image_container'>
                            <img className='person_image' src="/src/assets/vehicles.jpeg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Vehicle = () => {

    const [vehicle, setVehicle] = useState<IVehicle[]>([]);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('');

    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);


    useEffect(() => {

        const Vehicle = async () => {

            setLoading(true);

            const response = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`);

            const data = await response.json();

            setVehicle(prevvehicle => [...prevvehicle, ...data.results]);

            setLoading(false);
        };

        Vehicle();

    }, [page]);



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value.toLowerCase());

    };

    const filteredvehicle = vehicle.filter(vehicle =>

        vehicle.name.toLowerCase().includes(search)

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
                        <h1 style={{ color: 'White' }}>Star Wars Vehicles</h1>
                    </div>

                    <div className='container_input'>
                        <input className='search' type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
                    </div>

                </div>

                <div className='container_item'>
                    <div className='container_persons'>
                        {filteredvehicle.map((vehicle, index) => (

                            <div key={index} className='container_person_details'>
                                <p>Name: {vehicle.name}</p>

                                <div className='person_image_container'>
                                    <img className='person_image' src="/src/assets/vehicles.jpeg" alt="" />
                                </div>

                                <Link to="#" onClick={() => setSelectedVehicle(vehicle)}> <img className='loadmore' src="/src/assets/read-more.png " alt="" /></Link>

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

            <Modal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />

        </>
    );
};

export default Vehicle;
