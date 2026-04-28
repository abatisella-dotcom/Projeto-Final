import { Link } from "react-router-dom"

export default function Header() {
    
    return(
<>

        <div> 
            <Link to="/">Contato</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/gerenciador">Gerenciador</Link>
        </div>
        <h1>oi</h1>
</>
    )
}