import React, { useEffect, useState } from 'react'; 
import UpdateEventForm from './updateEventForm';

const AdminEventList = () => {
    const [events, setEvents] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Event handlers for update and delete buttons
    const handleUpdate = (event) => {
        setSelectedEvent(event);
        setShowUpdateForm(true);
    };

    const handleUpdateSuccess = (updatedEvent) =>{
        console.log('Updated event:', updatedEvent);
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event._id === updatedEvent._id ? updatedEvent : event
            )
        );
        setShowUpdateForm(false);
        setSelectedEvent(null);
    }
    
    const handleCancelUpdate = () => {
        setShowUpdateForm(false);
        setSelectedEvent(null);
    };

    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/delete/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });

            if (response.ok) {
                // Remove the deleted event from the state
                setEvents(events.filter(event => event._id !== eventId));
                alert('Event deleted successfully');
            } else {
                alert('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event');
        }
    };

    return (
        <div className="admin-event-list">
            <h1 className='List'>List of all Events:</h1>
            {showUpdateForm ? (
                <UpdateEventForm 
                    event={selectedEvent} 
                    onUpdateSuccess={handleUpdateSuccess}
                    onCancelUpdate={handleCancelUpdate}
                />
            ):(
            events.map(event => (
                <div key={event._id} className="event-container">
                    <img src={event.imageUrl} alt={event.name} className="event-image" />
                    <div className="event-details">
                        <h2 className="event-name">{event.name}</h2>
                        <h2 className="event-description">{event.description}</h2>
                        <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="event-time">Time: {event.time}</p>
                        <p className="event-location">Location: {event.location}</p>
                        <p className="fevent-price"><strong>Price:</strong> ₹{event.price}</p>
                    </div>
                    <div className="event-actions">
                        <button onClick={() => handleUpdate(event)}>Update</button>
                        <button onClick={() => handleDelete(event._id)}>Delete</button>
                    </div>
                </div>
            )))}
        </div>
    );
};

export default AdminEventList;
