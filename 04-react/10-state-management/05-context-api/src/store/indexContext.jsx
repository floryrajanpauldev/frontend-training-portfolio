import { createContext } from "react";

const NameContext = createContext();

export const NameProvider = ({ children }) => {
    const fullName = {
        firstName: "John",
        lastName: "Doe"
    };

    return (
        <NameContext.Provider value={fullName}>
            {children}
        </NameContext.Provider>
    );
};

export default NameContext;