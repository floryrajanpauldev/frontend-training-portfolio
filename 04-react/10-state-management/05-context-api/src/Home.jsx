import { useContext } from "react";
import NameContext from "./store/indexContext";

const Home = () => {
    const { firstName, lastName } = useContext(NameContext);

    return (
        <div>
            <h2>Home</h2>

            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
        </div>
    );
};

export default Home;