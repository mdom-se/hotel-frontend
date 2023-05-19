import React, { useState, useEffect } from 'react';
import { getAmenityList } from '../../utils/rest-api-call.component';


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
        <div>
            <h3>Hotel Amenities</h3>
            <ul className="amenityList-list">
                {amenityList.map(({ amenityName, amenityId }, index) => {
                    return (
                        <li key={index}>
                            <div className="amenityList-list-item">
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={amenityName}
                                        value={amenityId}
                                        checked={props.isCheckboxCheked(amenityId)}
                                        onChange={props.handleChangeCheckbox}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{amenityName}</label>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default HotelAmenitiesList;