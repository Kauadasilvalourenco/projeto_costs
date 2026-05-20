import { Routes, Route } from "react-router-dom";
// import router;

import Navbar from "./components/_navbar/Navbar";
import Footer from "./components/_footer/Footer";
// import components;

function App() {
  return(
    <div className="App">

      <header>
        <Navbar />
      </header>

      <main className="conteiner_principal">

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