import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { getHotel, getHotelAmenities, updateHotel, addHotelAmenities, deleteHotelAmenities, createHotel } from '../../utils/rest-api-call.component';
import HotelAmenitiesList from '../hotel-amenities/hotel-amenities-list.component';

function HotelEdit() {


    const [hotel, setHotel] = useState({
        'hotelName': '',
        'address': '',
        'rating': ''
    });
    const [hotelAmenities, setHotelAmenities] = useState([]);
    const [srcHotelAmenities, setSrcHotelAmenities] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    const isNewHotel = params.id === 'new';
    const hotelId = params.id !== 'new' ? params.id : undefined;



    useEffect(() => {
        if (hotelId) {
            getHotel(hotelId)
                .then(response => {
                    console.info(response)
                    setHotel(response.hotelDto)
                });
        }
    }, [hotelId]);

    useEffect(() => {
        if (hotelId) {
            getHotelAmenities(hotelId)
                .then(response => {
                    console.info(response)
                    setHotelAmenities(response.amenityListDto)
                    setSrcHotelAmenities(response.amenityListDto)
                })
        }

    }, [hotelId]);

    const isCheckboxCheked = (amenityId) => {
        return hotelAmenities.some(ha => ha.amenityId === amenityId);
    }

    const handleChangeCheckbox = (event) => {
        const value = parseInt(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            //Add checked item into checkList
            setHotelAmenities([...hotelAmenities, { amenityId: value }]);
        } else {
            //Remove unchecked item from checkList
            const filteredList = hotelAmenities.filter((ha) => ha.amenityId !== value);
            setHotelAmenities(filteredList);
        }


    };

    const handleRemoveHotelAmenities = () => {
        const removeHotelAmenities = srcHotelAmenities.filter((item_1) => {
            let some = hotelAmenities.some((item_2) => {
                return item_2.amenityId === item_1.amenityId;
            });
            return !some;
        });
        console.info({ removeHotelAmenities });
        for (let i in removeHotelAmenities) {
            deleteHotelAmenities(hotel.hotelId, removeHotelAmenities[i].amenityId)
                .then(responseDeleteHA => {
                    console.info({ responseDeleteHA })
                });
        }
    }

    const handleAddHotelAmenities = () => {
        const newHotelAmenities = hotelAmenities.filter((item_1) => {
            let some = srcHotelAmenities.some((item_2) => {
                return item_2.amenityId === item_1.amenityId;
            });
            return !some;
        });
        console.info({ newHotelAmenities });
        for (let i in newHotelAmenities) {
            addHotelAmenities(hotel.hotelId, newHotelAmenities[i].amenityId)
                .then(responseCreateHA => {
                    console.info({ responseCreateHA });
                })
        }
    }

    const handleUpdateHotel = () => {
        updateHotel(hotel).then(responseUpdateHotel => {
            console.info({ responseUpdateHotel });
            setHotel(responseUpdateHotel.hotelDto)
        });
        handleAddHotelAmenities();
        handleRemoveHotelAmenities();
    }

    const handleCreateHotel = () => {
        createHotel(hotel).then(responseCreateHotel => {
            console.info({ responseCreateHotel });
            setHotel(responseCreateHotel.hotelDto);
            navigate("/hotels/" + responseCreateHotel.hotelDto.hotelId);
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isNewHotel) {
            handleCreateHotel()

        } else {
            handleUpdateHotel();
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        let update = { ...hotel };
        update[name] = value;
        setHotel(update);
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                            <Label for="hotelName">Hotel Name</Label>
                            <Input type="text" name="hotelName" id="hotelName" value={hotel.hotelName}
                                onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" id="address" value={hotel.address}
                                onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input type="text" name="rating" id="rating" value={hotel.rating}
                                onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Return</Button>
                    </FormGroup>
                </Form>
            </Container>
            {!isNewHotel &&
                <HotelAmenitiesList
                    hotelAmenities={hotelAmenities}
                    isCheckboxCheked={isCheckboxCheked}
                    handleChangeCheckbox={handleChangeCheckbox}
                    isReadOnly={isNewHotel}
                />
            }
        </div>
    )

}

export default HotelEdit;