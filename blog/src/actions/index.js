import jsonPlaceholder from '../apis/jsonPlaceholder';
//import _ from 'lodash';

/* return another function for redux thunk 'casue it's async call */ 
export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data         
        });
    }

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}

/* in thunk when we return a function and not a plain object thunk call 
   the function with dispatch and getState as argument 
    in the func called we have to call dispatch manually */


/* MEMOIZED VERSION OF FETCH USER --------------------------------------------------------------- */    
/* export const fetchUser = (id) => async dispatch => {
    _fetchUser(id, dispatch);
}  */ 

/* we make a new function and memoize it */
/* the probl is when we change the data inside a specific user */
/* so we can fetch the user only one time */
/*const _fetchUser = _.memoize(async (id, dispatch) => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
}) */