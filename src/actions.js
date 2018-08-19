//import fetch from 'cross-fetch'
/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const TEXT_REQUEST = 'TEXT_REQUEST'
export const TO_TEXT = 'TO_TEXT'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */


export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}




export function requestPosts(text) {
  return {
    type: REQUEST_POSTS,
    text
  }
}

//function receivePosts(subreddit, json) {
//  return {
//    type: RECEIVE_POSTS,
//    subreddit,
//    posts: json.data.children.map(child => child.data),
//    receivedAt: Date.now()
//  }
//}

export function textRequest(text) {	
	console.log("Pasandoooo"+text);
	return (dispatch,getstate) => { 
		return fetch('http://192.168.56.1:4000/', {
		      method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  },
		      body: JSON.stringify({
		        "text": text
		      }),
	    }).then(response => response.json())
    		.then(jsondata => {
		    	console.log(jsondata);
		    	//this.setState({ text: jsondata.text });

		    	dispatch( requestPosts( jsondata.text ) );
		    })
	}
		//return {type : TEXT_REQUEST,  text }  
}
