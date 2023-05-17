import logo from './../logo.svg';
import './../App.css';
import {useEffect, useState} from "react";

const HotelApp = () => {

    const [searchField, setSearchField] = useState(''); // array [value, setValue]
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState(hotels);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);


    console.log('HotelApp is rendered...')
    useEffect(() => {
        fetch('http://localhost:8080/api/hotels?' + 'page=' + page + '&pageSize=' + pageSize)
            .then(originalResponse => originalResponse.json())
            .then(response => response['hotelListDto'])
            .then(hotelListDto => setHotels(hotelListDto['hotelDtoList']));
    }, [])

    // useEffect( () => {
    //     const newFilteredHotels = hotels.filter((hotel) => {
    //         return hotel.name.toLocaleLowerCase().includes(searchField);
    //     });
    //     setFilteredHotels(newFilteredHotels);
    // }, [hotels, searchField]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className="App-intro">
                    <h2>Hotels</h2>
                    {hotels.map(hotel =>
                        <div key={hotel.id}>
                            {hotel.hotelName} ({hotel.address})
                        </div>
                    )}
                </div>
            </header>
        </div>
    );

}
export default HotelApp;
