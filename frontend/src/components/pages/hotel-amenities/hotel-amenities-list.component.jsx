import React, { useState, useEffect } from 'react';
import { getAmenityList } from '../../utils/rest-api-call.component';
import { Col, FormGroup, Input } from 'reactstrap';


const HotelAmenitiesList = (props) => {


    const [amenityList, setAmenityList] = useState([]);

    useEffect(() => {
        getAmenityList()
            .then(response => {
                console.info(response)
                setAmenityList(response.amenityListDto)
            });
    }, []);


    return (
        <Col sm={5}>
            <div className="amenities-checks">
                <h4>Amenities</h4>
                <FormGroup check>
                    {amenityList.map(({ amenityName, amenityId }, index) => {
                        return (
                            <div key={index}>
                                <Input
                                    type="checkbox"
                                    id={`custom-checkbox-${index}`}
                                    name={amenityName}
                                    value={amenityId}
                                    checked={props.isCheckboxCheked(amenityId)}
                                    onChange={props.handleChangeCheckbox}
                                    disabled={props.isReadOnly}
                                />
                                <label htmlFor={`custom-checkbox-${index}`}>{amenityName}</label>
                            </div>
                        );
                    })}
                </FormGroup>
            </div>
        </Col>
    )
}

export default HotelAmenitiesList;