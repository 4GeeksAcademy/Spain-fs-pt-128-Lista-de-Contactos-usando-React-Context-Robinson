import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        /* Contenedor principal*/
        <div className="card mb-3 mx-auto" style={{ maxWidth: "700px" }}>
            <div className="card-body">
                <div className="row align-items-center">

                    {/*  Foto  */}
                    <div className="col-3 col-md-2">
                        <img
                            src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                            className="rounded-circle"
                            alt="foto"
                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                    </div>

                    {/*Información del contacto */}
                    <div className="col-6 col-md-7">
                        <h5 className="mb-1">{contact.name}</h5>
                        <p className="mb-0 text-secondary">
                            <i className="fas fa-map-marker-alt me-2"></i> {contact.address}
                        </p>
                        <p className="mb-0 text-secondary"><i className="fas fa-phone me-2"></i> {contact.phone}</p>
                        <p className="mb-0 text-secondary"> <i className="fas fa-envelope me-2"></i>{contact.email}</p>
                    </div>

                    {/* // Para Editar y Elimar contacto */}
                    <div className="col-3 col-md-3 text-end">
                        <Link to={`/edit-contact/${contact.id}`} className="btn btn-link text-dark p-2">
                            <i className="fas fa-pencil-alt"></i>
                        </Link>


                        <button
                            className="btn btn-sm"
                            onClick={() => onDelete(contact.id)}
                        >
                            <i className="fas fa-trash-alt text-danger"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

