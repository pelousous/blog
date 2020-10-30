import jsonPlaceholder from '../apis/jsonPlaceholder';
//import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // wait for posts to be returned and find unique id for users with es6 methods
    const usersIds = getState().posts.map(post => post.userId)
                                    .filter(
                                        (value, index, self) =>  self.indexOf(value) === index
                                    );
    // it allow us not to call multiple times the same user to fetch
    // then call users with unique ids array
    usersIds.forEach(id => dispatch(fetchUser(id)));


    // with lodash methods
    // _.chain(getState().posts)
    //     .map('userId')
    //     .uniq()
    //     .forEach(id => dispatch(fetchUser(id)))
    //     .value();
}

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
   the function with DISPATCH and GETSTATE as argument 
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