import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
    const [selectedMode, setSelectedMode] = useState('User Mode');

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    return (
        <div className="dropdown">
            <button className="dropbtn">{selectedMode}</button>
            <div className="dropdown-content">
                {selectedMode !== 'User Mode' && (
                    <Link to="\Register" onClick={() => handleModeChange('User Mode')}>User Mode</Link>
                )}
                {selectedMode !== 'Admin Mode' && (
                    <Link to="/admin/login" onClick={() => handleModeChange('Admin Mode')}>Admin Mode</Link>
                )}
            </div>
        </div>
    );
};

export default DropdownMenu;
