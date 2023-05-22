
export const getAlertMessageUtil = (response, message) => {
    if(response.statusCode === 200){
        return {'message': message, type: 'success', isOpen: true};
    } else if(response.statusCode === 500){
        return {'message': response.message, type: 'error', isOpen: true};
    } else if(response && response.message){
        return {'message': response.message, type: 'warning', isOpen: true};
    }else{
        return {'message': 'system error, please try again later', type: 'error', isOpen: true};
    }
}

