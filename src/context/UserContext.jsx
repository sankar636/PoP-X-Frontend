import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        company: '',
        isAgency: 'no', 
    });

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;
