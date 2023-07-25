import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string';


import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components/index";
import { getHeroesByName } from "../helpers";
//import { require } from "node:module";

//const querystring = require("querystring");

export const SearchPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "" } = queryString.parse( location.search );
  const heroes = getHeroesByName( q );

  const showSearch = (q.length === 0);//ya son valores booleanos
  const showError = (q.length > 0) && heroes.length === 0; //booleano

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = ( event ) => { 
    event.preventDefault();
    //if ( searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText }`);

  };

  return (
    <>
    <h1>Página de busqueda</h1>
    <hr />

    <div className="row">
      
      <div className="col-5">
        <h4>Buscando</h4>
          <hr />
          <form onSubmit={ onSearchSubmit } aria-label="form">
            <input 
              type="text"
              placeholder="Busca un heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }           
            />

            <button className="btn btn-outline-primary mt-1">
              Busqueda
            </button>
          </form>
      </div>

      <div className="col-7">
          <h4>Resultados</h4>
          <hr />
        {/* {
          ( q === '' )
           ?  <div className="alert alert-primary">Busca un heroe</div>
          : ( heroes.length === 0 ) 
            && <div className="alert alert-danger">No hay resultados con <b>{ q }</b></div>
         } */}
         
        <div /* otra forma de hacer la condicional de mostrar segun el resultado*/
        className="alert alert-primary animate__animated animate__fadeIn" 
        style={{display: showSearch ? '' : 'none' }}
          >
          Busca un heroe
        </div>
        
        <div 
        aria-label="alert-danger"
        className="alert alert-danger animate__animated animate__fadeIn"
        style={{display: showError ? '' : 'none' }}
        >
          No hay resultados con <b>{ q }</b>
        </div>
        
        
        {
          heroes.map( hero => (
            <HeroCard key={ hero.id } { ...hero } />
          ))
        }

    </div>

</div>
    
    </>
  )
}
