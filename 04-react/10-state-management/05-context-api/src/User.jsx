import { useContext } from "react";
import NameContext from "./store/indexContext";

const User = () => {
    const { firstName, lastName } = useContext(NameContext);

    return (
        <div>
            <h2>User</h2>

            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
        </div>
    );
};

export default User;