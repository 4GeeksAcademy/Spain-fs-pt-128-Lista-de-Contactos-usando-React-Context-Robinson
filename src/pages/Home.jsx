import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { crearContacto, getContacts, eliminarContacto } from "../services/APIServices.js";
import { ContactCard } from "../components/ContactCard.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [selectedId, setSelectedId] = useState(null);


	useEffect(() => {
		getContacts(dispatch)
	}, [dispatch])

	const handleDeleteConfirmation = () => {
		if (selectedId) {
			eliminarContacto(dispatch, selectedId);
			setSelectedId(null);
		}
	};

	return (
		<div className="container mt-4">
			<div className="contacts">
				{store.contacts.length > 0 ? (
					store.contacts.map(contact => (
						<ContactCard
							contact={contact}
							key={contact.id}
							onDelete={(id) => setSelectedId(id)}
						/>
					))
				) : (

					<p className="text-center bg-warning bg-gradient p-2 w-50 mx-auto rounded"
						style={{ "--bs-bg-opacity": ".5" }}>
						<strong>No hay contactos guardados.</strong>
					</p>


				)}
			</div>

			{/* Modal para eliminar*/}
			{selectedId && (
				<div className="modal d-block bg-dark bg-opacity-50" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1050 }}>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">¿Estás seguro?</h5>
								<button type="button" className="btn-close" onClick={() => setSelectedId(null)}></button>
							</div>
							<div className="modal-body">
								<p>Si eliminas este contacto, se borrará de la base de datos permanentemente.</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={() => setSelectedId(null)}>Cancelar</button>
								<button className="btn btn-danger" onClick={handleDeleteConfirmation}>Eliminar</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};