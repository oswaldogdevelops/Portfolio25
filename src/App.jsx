
import { BrowserRouter, Route, Routes } from 'react-router'
import HomeTwo from './views/Home2'
import ProjectCarousel from './components/HomeComponents/ProjectsCaroussel'
//import NavbarNew from './components/navbars/NavbarNew'





function App() {
  

  return (

     
  <BrowserRouter>
  {/* <NavbarNew/> */}
    <Routes> {/* <-- Aquí inicia la definición de tus rutas */}
  <Route path="/" element={<HomeTwo />} />
  <Route path="/projects" element={<ProjectCarousel />} />
        {/* <Route path="/" element={<HomeTwo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpForm />} /> */}

      </Routes> {/* <-- Aquí termina */}
      </BrowserRouter>
    


  )
}

export default App
