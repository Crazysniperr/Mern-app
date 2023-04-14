import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";


export const Navbar = () => {
    const [cookies,setCookie] = useCookies(['access']);
    const navigate = useNavigate()
    const logout = ()=>{
        setCookie('access','');
        window.localStorage.removeItem('userId');
        navigate('/auth');
    }
    return (
        <div className="navbar">
            <Link to='/' className="Links">Home</Link>
            <Link to='/create-recipe' className="Links">Create Recipe</Link>
            {!cookies.access ? (<Link to='/auth' className="Links">Log in</Link>) : 
            (<><Link to='/saved-recipe' className="Links">Saved Recipe</Link>
            <button onClick={logout} className = "logout-btn">LogOut</button></>)}
            
        </div>
    );

};