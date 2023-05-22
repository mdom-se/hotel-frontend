import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Col } from 'reactstrap';
import { getHotel, getHotelAmenities, updateHotel, addHotelAmenities, deleteHotelAmenities, createHotel } from '../../utils/rest-api-call.component';
import HotelAmenitiesList from '../hotel-amenities/hotel-amenities-list.component';
import Rating from '@mui/material/Rating';
import AlertMessage from '../alert/alert-message.component';
import { getAlertMessageUtil } from '../alert/alert-message-utils';

function HotelEdit() {

    const [hotel, setHotel] = useState({
        'hotelName': '',
        'address': '',
        'rating': 0
    });
    const [hotelAmenities, setHotelAmenities] = useState([]);
    const emptyAlertMessage = { isOpen: false, message: '', type: 'success' };
    const [showAlertMessage, setShowAlertMessage] = useState(emptyAlertMessage);

    const params = useParams();
    const navigate = useNavigate();

    const isNewHotel = params.id === 'new';
    const hotelId = params.id !== 'new' ? params.id : undefined;

    useEffect(() => {
        if (hotelId) {
            getHotel(hotelId)
                .then(response => {
                    setHotel(response.hotelDto)
                });
        }
    }, [hotelId]);

    useEffect(() => {
        if (hotelId) {
            getHotelAmenities(hotelId)
                .then(response => {
                    setHotelAmenities(response.amenityListDto)
                })
        }
    }, [hotelId]);

    const isCheckboxCheked = (amenityId) => {
        return hotelAmenities.some(ha => ha.amenityId === amenityId);
    }

    const handleChangeCheckbox = (event) => {
        const amenityId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        if (isChecked) {
            handleAddHotelAmenities(amenityId);
        } else {
            handleRemoveHotelAmenities(amenityId);
        }
    };

    const handleRemoveHotelAmenities = (amenityId) => {
        deleteHotelAmenities(hotel.hotelId, amenityId)
            .then(response => {
                if (response.statusCode && response.statusCode === 200) {
                    const filteredList = hotelAmenities.filter((ha) => ha.amenityId !== amenityId);
                    setHotelAmenities(filteredList);
                }
                setShowAlertMessage(getAlertMessageUtil(response, 'The amenity was removed from the hotel'));
            }).catch(response => {
                setShowAlertMessage(getAlertMessageUtil(response));
            });
    }

    const handleAddHotelAmenities = (amenityId) => {
        addHotelAmenities(hotel.hotelId, amenityId)
            .then(response => {
                if (response.statusCode && response.statusCode === 200) {
                    setHotelAmenities([...hotelAmenities, { 'amenityId': amenityId }]);
                }
                setShowAlertMessage(getAlertMessageUtil(response, 'The amenity was added to the hotel'));
            }).catch(response => {
                setShowAlertMessage(getAlertMessageUtil(response));
            });
    }

    const handleUpdateHotel = () => {
        updateHotel(hotel).then(response => {
            setHotel(response.hotelDto)
            setShowAlertMessage(getAlertMessageUtil(response, 'The hotel was updated'));
        }).catch(response => {
            setShowAlertMessage(getAlertMessageUtil(response));
        });
    }

    const handleCreateHotel = () => {
        createHotel(hotel).then(response => {
            setShowAlertMessage(getAlertMessageUtil(response, 'The hotel was created'));
            if(response && response.hotelDto && response.hotelDto.hotelId){
                navigate("/hotels/" + response.hotelDto.hotelId);
            }
        }).catch(response => {
            setShowAlertMessage(getAlertMessageUtil(response));
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
        if (name === 'rating') {
            update[name] = parseInt(value);
            setHotel(update);
        } else {
            update[name] = value;
            setHotel(update);
        }
    }

    const handleCloseAlertMessage = () => {
        setShowAlertMessage(emptyAlertMessage);
    }

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label sm={2} for="hotelId">Hotel Id</Label>
                        <Col sm={3}>
                            <Input type="text" name="hotelId" id="hotelId" disabled={true} value={hotel.hotelId || ''}
                                onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="hotelName">Hotel Name</Label>
                        <Col sm={3}>
                            <Input type="text" name="hotelName" id="hotelName" value={hotel.hotelName}
                                onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="address">Address</Label>
                        <Col sm={3}>
                            <Input type="text" name="address" id="address" value={hotel.address}
                                onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="rating">Rating</Label>
                        <Col sm={3}>
                            <Rating
                                name="rating"
                                value={hotel.rating || 0}
                                onChange={handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col >
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        {!isNewHotel &&
                            <HotelAmenitiesList
                                hotelAmenities={hotelAmenities}
                                isCheckboxCheked={isCheckboxCheked}
                                handleChangeCheckbox={handleChangeCheckbox}
                                isReadOnly={isNewHotel}
                            />
                        }
                    </FormGroup>
                </Form>
            </Container>
            <AlertMessage
                message={showAlertMessage.message}
                type={showAlertMessage.type}
                isOpen={showAlertMessage.isOpen}
                handleClose={handleCloseAlertMessage} />
        </div>
    )

}

export default HotelEdit;