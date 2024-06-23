import axios from 'axios';
import { addAd, getAds, getAdsById } from '../reducers/adsReducer';

export const getAdsMidd = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_ADS') {
        // Perform the asynchronous operation
        axios.get('http://localhost:8585/api/ads/getAds')
            .then((response) => {
                console.log('response.data', response.data);
                // Dispatch an action with the response data
                dispatch(getAds(response.data));//response.data == action.payload in adsReduser
            })
            .catch((error) => {
                console.error('Error fetching ads:', error);
                // Handle the error as needed
            });
    }
    else if (action.type === 'GET_ADS_BY_ID') {
        axios.get(`http://localhost:8585/api/ads/getAdsById/${action.id}`)
            .then((response) => {
                console.log('response.data', response.data);
                // Dispatch an action with the response data
                dispatch(getAdsById(response.data,));
            })
            .catch((error) => {
                console.error('Error fetching ads:', error);
                // Handle the error as needed
            });
    }
    // Continue the action through the middleware chain
    return next(action);
};

export const addAdMidd = ({ dispatch, getState }) => next => action => {

    if (action.type === 'ADD_AD') {
        const formData = new FormData();
        console.log("action.payload.image.length", action.payload.image.length);
        for (let i = 0; i < 5; i++) {
            formData.append("image", action.payload.image[i]);
            console.log("image ",i," :",action.payload.image[i])
        }

        formData.append("ad", new Blob([JSON.stringify(action.payload.ad)], { type: "application/json" }))
        console.log('newAd', action.payload);
        
        //עד כאן הכל תקין עם התמונות
        axios.post('http://localhost:8585/api/ads/uploadAd', formData)//נשלח כל התמונות
            .then((response) => {
                console.log('response.data', response.data);//חוזר רק תמונה אחת
                dispatch(addAd(response.data));
            })
            .catch((error) => {
                console.error('Error fetching ad:', error);
            });
    }
    return next(action);
};
