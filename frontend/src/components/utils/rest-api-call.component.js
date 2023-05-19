import { Buffer } from "buffer";

const basicAuth = Buffer.from('user:hello').toString('base64');
const baseUrl = "https://app.hotel.com:8080/api";

export const getHotelList = async (pageNo = 1, pageSize = 5, hotelName ='') => {
    const pageRequest = pageNo - 1;
    const response = await fetch(`${baseUrl}/hotels?page=${pageRequest}&pageSize=${pageSize}&hotelName=${hotelName}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const responseJson = await response.json()
    const result = responseJson['result'];
    const { totalElements, totalPages, hotelDtoList } = result;
    console.info({ hotelDtoList })
    return {
        "data": hotelDtoList,
        "totalPages": totalPages,
        "totalElements": totalElements
    }
}

export const getHotel = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}


export const createHotel = async () => {
    const data = await fetch(`${baseUrl}/hotels`, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}

export const updateHotel = async () => {
    const data = await fetch(`${baseUrl}/hotels`, {
        method: 'put',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}

export const deleteHotel = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}`, {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}


export const getHotelAmenities = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}

export const addHotelAmenities = async (hotelId, amenityId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities/${amenityId}`, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}

export const deleteHotelAmenities = async (hotelId, amenityId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities/${amenityId}`, {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}

export const getAmenityList = async () => {
    const data = await fetch(`${baseUrl}/amenities`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Basic ' + basicAuth
        })
    });
    const response = await data.json();
    return response;
}