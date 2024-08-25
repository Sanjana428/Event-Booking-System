// import React, { useState, useEffect } from 'react';

// const UpdateEventForm = ({ event, onUpdateSuccess, onCancelUpdate }) => {
//     const [name, setName] = useState(event?.name || '');
//     const [description, setDescription] = useState(event?.description || '');
//     const [date, setDate] = useState(event?.date ? event.date.split('T')[0] : '');
//     const [time, setTime] = useState(event?.time || '');
//     const [location, setLocation] = useState(event?.location || '');
//     const [price, setPrice] = useState(event?.price || '');
//     const [totalTickets, setTotalTicekts] = useState(event?.totalTickets || '');
//     const [ticketPhotoUrl, setTicketPhotoUrl] = useState(event?.ticketPhotoUrl || '');
    

//     useEffect(() => {
//         if (event) {
//             setName(event.name);
//             setDescription(event.description);
//             setDate(event.date ? event.date.split('T')[0] : '');
//             setTime(event.time);
//             setLocation(event.location);
//             setPrice(event.price);
//             setTotalTicekts(event.totalTickets);
//             setTicketPhotoUrl(event.ticketPhotoUrl);
//         }
//     }, [event]);
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const updatedEvent = {
//             _id: event._id,
//             name,
//             description,
//             date,
//             time,
//             location,
//             price,
//             totalTickets,
//             ticketPhotoUrl
//         };
//         // await onUpdateSubmit(updatedEvent);
    
//         try {
//             const response = await fetch(`http://localhost:5000/api/admin/update/${updatedEvent._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//                 },
//                 body: JSON.stringify(updatedEvent)
//             });
//             // console.log('response rec is',response.json());
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('response is',data);
//                 await onUpdateSuccess(data);
//             }else {
//                 console.error('Failed to update event');
//             }
//         } catch (error) {
//             console.error('Error updating event:', error);
//         }
//     };
    
    
    
//     return (
//         <form className="update-event-form" onSubmit={handleSubmit}>
//             <h2>Update Event</h2>
//             <div>
//                 <label>Name</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Description</label>
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//             </div>
//             <div>
//                 <label>Date</label>
//                 <input
//                     type="date"
//                     value={date?.split('T')[0] || ''} // Extract date part from the ISO string
//                     onChange={(e) => setDate(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Time</label>
//                 <input
//                     type="time"
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Location</label>
//                 <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Price</label>
//                 <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Total Tickets</label>
//                 <input
//                     type="number"
//                     value={totalTickets}
//                     onChange={(e) => setTotalTickets(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Ticket Photo URL</label>
//                 <input
//                     type="text"
//                     value={ticketPhotoUrl}
//                     onChange={(e) => setTicketPhotoUrl(e.target.value)}
//                 />
//             </div>
//             <button type="submit" >Update</button>
//             <button type="button" onClick={onCancelUpdate}>Cancel</button>
//         </form>
//     );

    

// };

// export default UpdateEventForm;


import React, { useState, useEffect } from 'react';

const UpdateEventForm = ({ event, onUpdateSuccess, onCancelUpdate }) => {
    const [name, setName] = useState(event?.name || '');
    const [description, setDescription] = useState(event?.description || '');
    const [date, setDate] = useState(event?.date ? event.date.split('T')[0] : '');
    const [time, setTime] = useState(event?.time || '');
    const [location, setLocation] = useState(event?.location || '');
    const [price, setPrice] = useState(event?.price || '');
    const [totalTickets, setTotalTickets] = useState(event?.totalTickets || ''); // Corrected typo here
    const [ticketPhotoUrl, setTicketPhotoUrl] = useState(event?.ticketPhotoUrl || '');
    
    useEffect(() => {
        if (event) {
            setName(event.name);
            setDescription(event.description);
            setDate(event.date ? event.date.split('T')[0] : '');
            setTime(event.time);
            setLocation(event.location);
            setPrice(event.price);
            setTotalTickets(event.totalTickets); // Corrected typo here
            setTicketPhotoUrl(event.ticketPhotoUrl);
        }
    }, [event]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEvent = {
            _id: event._id,
            name,
            description,
            date,
            time,
            location,
            price,
            totalTickets, // Ensure this is set correctly
            ticketPhotoUrl
        };
    
        try {
            const response = await fetch(`http://localhost:5000/api/admin/update/${updatedEvent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(updatedEvent)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('response is', data);
                await onUpdateSuccess(data);
            } else {
                console.error('Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };
    
    return (
        <form className="update-event-form" onSubmit={handleSubmit}>
            <h2>Update Event</h2>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label>Date</label>
                <input
                    type="date"
                    value={date?.split('T')[0] || ''} // Extract date part from the ISO string
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div>
                <label>Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div>
                <label>Total Tickets</label>
                <input
                    type="number"
                    value={totalTickets} // Corrected typo here
                    onChange={(e) => setTotalTickets(e.target.value)} // Corrected typo here
                />
            </div>
            <div>
                <label>Ticket Photo URL</label>
                <input
                    type="text"
                    value={ticketPhotoUrl}
                    onChange={(e) => setTicketPhotoUrl(e.target.value)}
                />
            </div>
            <button type="submit">Update</button>
            <button type="button" onClick={onCancelUpdate}>Cancel</button>
        </form>
    );
};

export default UpdateEventForm;
