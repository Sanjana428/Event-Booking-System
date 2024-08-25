// src/components/AddAdminForm.js
import React, { useState } from 'react';

const AddAdmin = () => {
    const [adminData, setAdminData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/admin/addAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminData),
            });

            if (response.ok) {
                alert('Admin created successfully');
                setAdminData({ username: '', email: '', password: '' }); // Reset form
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Failed to add admin');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-admin-form">
            <h2>Add New Admin</h2>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="username"
                    value={adminData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={adminData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Admin</button>
        </form>
    );
};

export default AddAdmin;
