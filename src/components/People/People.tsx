import { useEffect, useState } from 'react';
import './People.css';
import { Link, NavLink } from 'react-router-dom';

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
}

const Modal = ({ person, onClose }: { person: Person | null, onClose: () => void }) => {

  useEffect(() => {
    if (person) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [person]);

  if (!person) return null;

  return (
    <>
      <div onClick={onClose}></div>
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={onClose} style={{color: 'red'}}>&times;</span>
          <div className="modal_content_items">
            <p>Name: {person.name}</p>
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Gender: {person.gender}</p>
            <div className='person_image_container'>
              <img className='person_image' src="/src/assets/person.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const People = async () => {

      setLoading(true);

      const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);

      const data = await response.json();

      setPeople(prevPeople => [...prevPeople, ...data.results]);

      setLoading(false);

    };

    People();
  }, [page]);

  const loadMore = () => {
    if (page < 9) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(search)
  );

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
            <h1 style={{ color: 'White' }}>Star Wars People</h1>
          </div>

          {!loading && page < 9 && (

            <div className='container_input'>
              <input className='search' type="text" placeholder="Search by name" value={search} onChange={handleSearch} />
            </div>

          )}

        </div>

        <div className='container_item'>

          <div className='container_persons'>

            {filteredPeople.map((person, index) => (

              <div key={index} className='container_person_details'>

                <p>Name: {person.name}</p>

                <div className='person_image_container'>
                  <img className='person_image' src="/src/assets/person.jpg" alt="" />
                </div>

                <Link to="#" onClick={() => setSelectedPerson(person)}> <img className='loadmore' src="/src/assets/read-more.png " alt="" /></Link>

              </div>
            ))}
          </div>
          {loading && <div className='loader_container'><div className="loader"></div></div>}
        </div>

        <div className='link_container'>
          {!loading && page < 9 && (

            <Link to='#' onClick={loadMore}>
              <img className='loadmore' src="/src/assets/more-or-less.png" />
            </Link>
          )}
        </div>

      </div>

      <Modal person={selectedPerson} onClose={() => setSelectedPerson(null)} />

    </>
  );
};

export default People;
