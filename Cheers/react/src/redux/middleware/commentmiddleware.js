import axios from 'axios';
//מיבאים את הפעולה-פונקציה של קבלת המתכונים מתוך הרדוסר 
// כדי שיהיה אפשר לעדכן את הסטייט הגלובלי עם רשימת המתכונים שמגיעה מהשרת
import { addComment, getComments } from '../reducers/commentsReducer';

export const getCommentsMidd = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_COMMENTS') {
        axios.get('http://localhost:8585/api/comments/getComments')
            .then((response) => {
                console.log('response.data', response.data);
                dispatch(getComments(response.data));
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }
   return next(action)
}

export const addCommentMidd = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_COMMENT') {
        console.log('newComment', action.payload);
        axios.post('http://localhost:8585/api/comments/uploadComment', action.payload)
            .then((response) => {
                console.log('response.data', response.data);
                dispatch(addComment(response.data));
            })
            .catch((error) => {
                console.error('Error fetching comment:', error);
            });
    }
    return next(action);
};
