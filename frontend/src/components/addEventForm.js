import React, { useState } from "react";
const token = localStorage.getItem("adminToken");

const AddEventForm = () => {
	const [eventData, setEventData] = useState({
		name: "",
		description: "",
		date: "",
		time: "",
		location: "",
		imageUrl: "",
	});

	const handleChange = (e) => {
		setEventData({
			...eventData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:5000/api/admin/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(eventData),
				}
			);
			if (response.ok) {
				alert("Event added successfully");
				console.log(eventData);
			} else {
				alert("Failed to add event");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Error adding event");
		}
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<div>
					<label>Event Name:</label>
					<input
						type="text"
						name="name"
						value={eventData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label> Event Description:</label>
					<textarea
						name="description"
						value={eventData.description}
						onChange={handleChange}
						required
					></textarea>
				</div>

				<input
					type="date"
					name="date"
					value={eventData.date}
					onChange={handleChange}
					required
				/>

				<input
					type="time"
					name="time"
					value={eventData.time}
					onChange={handleChange}
					required
				/>

				<input
					type="text"
					name="location"
					placeholder="Location"
					value={eventData.location}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					name="imageUrl"
					placeholder="Image URL"
					value={eventData.imageUrl}
					onChange={handleChange}
					required
				/>
				<button type="submit">Add Event</button>
			</form>
		</div>
	);
};

export default AddEventForm;
