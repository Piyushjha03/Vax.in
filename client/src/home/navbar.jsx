import './navbar.css'
import { Link } from 'react-router-dom'

export const Navbar=()=>{

    return(
        <>
        <div className="navbar-wrapper">
 
            <Link  to={'/'}  className="logo">VAX.IN</Link>
            <Link  to={'/account'}  className="account"> Account</Link>
            <Link  to={'/login'}  className="signOut"> Sign out</Link>

        </div>
           
        </>
    )
}