import Login from "./login/login.component";
import useToken from "../utils/use-token.component";
import HotelList from "./hotel-list/hotel-list.component";


const HomePage = () => {
    const { token, setToken } = useToken();
    return token ? <HotelList /> : <Login setToken={setToken} />;

}

export default HomePage;