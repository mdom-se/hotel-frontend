import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { getHotel, getHotelAmenities } from '../../utils/rest-api-call.component';
import HotelAmenitiesList from '../hotel-amenities/hotel-amenities-list.component';

function HotelEdit() {


    const [hotel, setHotel] = useState({
        hotelName: '',
        address: '',
        rating: ''
    });
    const [hotelAmenities, setHotelAmenities] = useState([]);
    const params = useParams();
    const hotelId = params.id;

    useEffect(() => {
        getHotel(hotelId)
            .then(response => {
                console.info(response)
                setHotel(response.hotelDto)
            });
    }, []);

    useEffect(() => {
        if (hotelId) {
            getHotelAmenities(hotelId)
                .then(response => {
                    console.info(response)
                    setHotelAmenities(response.amenityListDto)
                })
        }

    }, [hotelId]);

    const isCheckboxCheked = (amenityId) => {
        const result = hotelAmenities.find(ha => ha.amenityId === amenityId);
        return result ? true : false;
    }

    const handleChangeCheckbox = (event) => {
        const value = parseInt(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            //Add checked item into checkList
            setHotelAmenities([...hotelAmenities, {amenityId: value}]);
        } else {
            //Remove unchecked item from checkList
            const filteredList = hotelAmenities.filter((ha) => ha.amenityId !== value);
            setHotelAmenities(filteredList);
        }
    };


    const handleChange = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="hotelName">Hotel Name</Label>
                        <Input type="text" name="hotelName" id="hotelName" value={hotel.hotelName}
                            onChange={handleChange} autoComplete="hotelName" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={hotel.address}
                            onChange={handleChange} autoComplete="email" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/hotels">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
            < HotelAmenitiesList hotelAmenities={hotelAmenities} isCheckboxCheked={isCheckboxCheked} handleChangeCheckbox={handleChangeCheckbox} />
        </div>
    )

}

export default HotelEdit;