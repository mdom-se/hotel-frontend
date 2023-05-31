import React, { useState } from 'react';

const useToken = () => {


    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        return tokenString;
    }
    const [token, setToken] = useState(getToken())
   
    const saveToken = (userToken) => {
        sessionStorage.setItem('token', userToken)
        setToken(userToken)
    }

    return {
        setToken: saveToken,
        token: token
    }
}

export default useToken