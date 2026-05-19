import { Routes, Route } from "react-router-dom";

function App() {
  return(
    <div className="App">

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

    </div>
  )
}

export default App;