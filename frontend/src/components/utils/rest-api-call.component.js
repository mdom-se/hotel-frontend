import {Buffer} from "buffer";

const basicAuth = Buffer.from('user:hello').toString('base64');
const baseUrl = "https://app.hotel.com:8080/api";

export const getHotelList = async (pageNo = 1, pageSize = 5, hotelName = '') => {
    const pageRequest = pageNo - 1;
    const response = await fetch(`${baseUrl}/hotels?page=${pageRequest}&pageSize=${pageSize}&hotelName=${hotelName}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await response.json();
}

export const getHotel = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await data.json();
}


export const createHotel = async (hotel) => {
    const data = await fetch(`${baseUrl}/hotels`, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(hotel)
    });
    return await data.json();
}

export const updateHotel = async (hotel) => {
    const data = await fetch(`${baseUrl}/hotels`, {
        method: 'put',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(hotel)
    });
    return await data.json();
}

export const deleteHotel = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}`, {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await data.json();
}


export const getHotelAmenities = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await data.json();
}

export const addHotelAmenities = async (hotelId, amenityId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities/${amenityId}`, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await data.json();
}

export const deleteHotelAmenities = async (hotelId, amenityId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities/${amenityId}`, {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await data.json();
}

export const getAmenityList = async () => {
    const data = await fetch(`${baseUrl}/amenities`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    return await data.json();
}

