import axios from 'axios';

import { postUser } from '../reducers/userReducer';

export const postUserMidd = ({ dispatch, getState }) => next => action => {

    if (action.type === 'POST_USER_IN') {
        // Perform the asynchronous operation
        axios.post('http://localhost:8585/api/users/signIn', action.payload)
            .then((response) => {
                console.log('response.data', response.data);
                if (response.status == 200) {
                    console.log("user in");
                    dispatch(postUser(response.data));
                }
            })
            .catch((error) => {
                if(error.status==409)
                console.error("מייל או סיסמא לא נכונים",error);
            else
            console.log("משתמש לא רשום",error);

            });
    }
    else if (action.type === 'POST_USER_UP') {

        const formData = new FormData();
        formData.append("image", action.payload.image)
        formData.append("user",new Blob( [JSON.stringify(action.payload.user)], {type: "application/json"}))
        console.log('formData', action.payload.user);
        axios.post('http://localhost:8585/api/users/signUp', formData)
            .then((response) => {
                console.log('response.data', response.data);
                console.log('response.status', response.status);
                dispatch(postUser(response.data));
            })
            .catch((error) => {
                if(error.status==409)

                    console.log("User exist",error.status);
                    // alert("modal to sign in")
            });
    }
    return next(action);
};

