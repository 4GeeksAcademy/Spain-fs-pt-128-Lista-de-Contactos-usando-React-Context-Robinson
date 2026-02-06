import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { crearContacto, actualizarContacto } from "../services/APIServices.js"; 

export const Form = () => {
    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Si hay un ID, buscamos el contacto en el store para editarlo
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
            if (contactToEdit) setContact(contactToEdit);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await actualizarContacto(dispatch, contact, id); // Para actualizar
        } else {            
            await crearContacto(dispatch, contact); // Para crear nuevo contacto
        }
        navigate("/"); // Volver al Home después de guardar o actualizar
    };

    return (
        <div className="container mt-5 p-4 bg-light rounded shadow" style={{maxWidth: "600px"}}>
            <h2>{id ? "Editar Contacto" : "Añadir un nuevo Contacto"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    value={contact.name} 
                    onChange={handleChange} 
                    required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    value={contact.email} 
                    onChange={handleChange} 
                     />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                    type="text" 
                    name="phone" 
                    className="form-control" 
                    value={contact.phone} 
                    onChange={handleChange} 
                    required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input 
                    type="text" 
                    name="address" 
                    className="form-control" 
                    value={contact.address} 
                    onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {id ? "Guardar Cambios" : "Añadir Contacto"}
                </button>
            </form>
        </div>
    );
};

