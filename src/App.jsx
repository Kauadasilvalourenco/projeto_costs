import { Routes, Route } from "react-router-dom";
// import router;

import Home from "./pages/home/Home";
import CreateProject from "./pages/create-project/CreateProject";
import Projects from "./pages/projects/Projects";
import EditProject from "./pages/edit-project/EditProject";
// import pages;

import Navbar from "./components/_navbar/Navbar";
import FlashMessage from "./components/_flash-message/FlashMessage";
import Footer from "./components/_footer/Footer";
// import components;

import styleApp from "./App.module.css";
// import css;

function App() {
  return(
    <div className={styleApp.App}>

      <Navbar />

      <main className={styleApp.conteiner_principal}>

        <Routes>

          <Route 
            path="/"
            element={<Home />}
          />

          <Route 
            path="/criar-projeto"
            element={<CreateProject />}
          />
          
          <Route 
            path="/projetos"
            element={<Projects />}
          />

          <Route
            path="/editar-projeto/:id"
            element={<EditProject />}
          />

        </Routes>

      </main>

      <FlashMessage />

      <Footer />

    </div>
  )
}

export default App;