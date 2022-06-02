import CartWidget from "../CartWidget/CartWidget"


const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div class="container-fluid">
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#elEstudio">FinanSolution</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#nS">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#aP">Por qué elegirnos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#clientesWeb">Comprar</a>
            </li>
          </ul>
        </div>  
        <CartWidget/>
      </div>
    </nav>
  )
}

export default NavBar