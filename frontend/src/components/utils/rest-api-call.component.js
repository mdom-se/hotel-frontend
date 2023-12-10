const baseUrl = window.MY_APP_API_URL

const getToken = () => {
    return sessionStorage.getItem('token')
}

export const getHotelList = async (pageNo = 1, pageSize = 5, hotelName = '') => {
    const pageRequest = pageNo - 1;
    const response = await fetch(`${baseUrl}/hotels?page=${pageRequest}&pageSize=${pageSize}&hotelName=${hotelName}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await response.json();
}

export const getHotel = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await data.json();
}


export const createHotel = async (hotel) => {
    const data = await fetch(`${baseUrl}/hotels`, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken(),
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
            'Authorization': 'Bearer ' + getToken(),
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
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await data.json();
}


export const getHotelAmenities = async (hotelId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await data.json();
}

export const addHotelAmenities = async (hotelId, amenityId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities/${amenityId}`, {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await data.json();
}

export const deleteHotelAmenities = async (hotelId, amenityId) => {
    const data = await fetch(`${baseUrl}/hotels/${hotelId}/amenities/${amenityId}`, {
        method: 'delete',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await data.json();
}

export const getAmenityList = async () => {
    const data = await fetch(`${baseUrl}/amenities`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });
    return await data.json();
}

export const generateToken = async (crendetials) => {
    const data = await fetch(`${baseUrl}/auth`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(crendetials)
    });
    return await data.json();
}
