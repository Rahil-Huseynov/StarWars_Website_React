import { NavLink } from 'react-router-dom';
import './App.css';

const App = () => {

  return (
    <>
      <div className="navbar" id="navbar">
        <NavLink className="navbar_items" to='/'>Home</NavLink>
        <NavLink className="navbar_items" to='/people'>People</NavLink>
        <NavLink className="navbar_items" to='/films'>Films</NavLink>
        <NavLink className="navbar_items" to='/planets'>Planets</NavLink>
        <NavLink className="navbar_items" to='/species'>Species</NavLink>
        <NavLink className="navbar_items" to='/starships'>Starships</NavLink>
        <NavLink className="navbar_items" to='/vehicles'>Vehicles</NavLink>
      </div>
    </>
  );
};

export default App;
