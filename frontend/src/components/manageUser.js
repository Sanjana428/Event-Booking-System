import React, { useEffect, useState } from 'react';

const ManageUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                const data = await response.json();
                if (data.message) {
                    alert(data.message);
                    fetchUsers(); // Refresh the user list
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className="booking-container">
            <h2>All Registered Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <strong>User ID:</strong> {user._id} <br />
                        <strong>Name:</strong> {user.username} <br />
                        <strong>Email:</strong> {user.email} <br />
                        <strong>Role:</strong> {user.role} <br />
                        <button onClick={() => deleteUser(user._id)}>Delete User</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageUser;
