const AGENDA = 'Felix';

export const getContacts = async (dispatch) => {
    try {
        const url = `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`;
        const response = await fetch(url);
        if (!response.ok) {         
            await crearAgenda();
            const retry = await fetch(url);
            if (!retry.ok) {
                console.error('getContacts: no se pudo obtener contactos tras crear agenda');
                return;
            }
            const dataRetry = await retry.json();
            dispatch({ type: 'set_contacts', payload: dataRetry.contacts || [] });
            return;
        }
        const data = await response.json();
        dispatch({ type: 'set_contacts', payload: data.contacts || [] });
    } catch (error) {
        console.error('getContacts error:', error);
    }
};

const crearAgenda = async () => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA}`, {
            method: 'POST',
        });
        if (!response.ok) {
            console.error('crearAgenda: respuesta no OK', response.status);
        }
        return await response.json().catch(() => null);
    } catch (error) {
        console.error('crearAgenda error:', error);
        return null;
    }
};

export const crearContacto = async (dispatch, contact) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('crearContacto: respuesta no OK', response.status);
            return null;
        }
        const data = await response.json();
        await getContacts(dispatch);
        return data;
    } catch (error) {
        console.error('crearContacto error:', error);
        return null;
    }
};

export const eliminarContacto = async (dispatch, id) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('eliminarContacto: respuesta no OK', response.status);
            return null;
        }
        await response.json().catch(() => null);
        await getContacts(dispatch);
        return true;
    } catch (error) {
        console.error('eliminarContacto error:', error);
        return null;
    }
};

export const actualizarContacto = async (dispatch, contact, id) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('actualizarContacto: respuesta no OK', response.status);
            return null;
        }
        const data = await response.json();
        console.log('Contacto actualizado:', data);
        await getContacts(dispatch);
        return data;
    } catch (error) {
        console.error('actualizarContacto error:', error);
        return null;
    }
};

