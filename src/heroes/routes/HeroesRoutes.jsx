import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { DCPage, MarvelPage, SearchPage, HeroPage } from "../pages"


export const HeroesRoutes = () => {
  return (
    <>
    <Navbar />
        <div className="container">
    <Routes>
        <Route path="marvel" element={<MarvelPage />} />
        <Route path="dc" element={<DCPage/>} />

        <Route path="search" element={<SearchPage />} />
        <Route path="hero/:id" element={<HeroPage />} /> {/* lo que se pone desp de "/:" es como aparece en la propiedad de la ruta*/}

        
        <Route path="/" element={<Navigate to="/marvel" />} />
        

    </Routes>
    
    </div>
  </>
  )
}
