import { Routes, Route } from "react-router-dom";
// import router;

import Navbar from "./components/_navbar/Navbar";
import Footer from "./components/_footer/Footer";
// import components;

import styleApp from "./App.module.css";

function App() {
  return(
    <div className={styleApp.App}>

      <Navbar />

      <main className={styleApp.conteiner_principal}>

        <Routes>

          <Route 
            path="/"
          />
          
          <Route 
            path="/projetos"
          />

          <Route 
            path="/contato"
          />

          <Route 
            path="/empresa"
          />

        </Routes>

      </main>

      <Footer />

    </div>
  )
}

export default App;