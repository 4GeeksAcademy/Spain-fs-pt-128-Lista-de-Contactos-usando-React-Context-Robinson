import { Link } from "react-router-dom";

export const Navbar = () => {
    return (        
        <nav className="navbar navbar-expand-lg p-3 mb-4 custom-nav">
            <div className="container">                
                <Link to="/" className="text-decoration-none">
                    <span className="navbar-brand mb-0 h1 fw-bold text-primary">
                        <i className="fa-solid fa-address-book me-2"></i>Mi Agenda
                    </span>
                </Link>
            
                <div className="ms-auto">                   
                    <Link to="/add-contact" className="btn btn-success fw-bold shadow-sm">
                        <i className="fa-solid fa-plus me-2"></i>Añadir Contacto
                    </Link>
                </div>
            </div>
        </nav>
    );
};
