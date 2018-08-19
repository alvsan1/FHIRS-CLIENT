import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  TEXT_REQUEST,
  REQUEST_POSTS,
  TO_TEXT
} from './actions'

const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function textRequest( state = [], action ){
  switch (action.type) {
    case TEXT_REQUEST:
      console.log(' Estoy Aqui!!! ');
      console.log( action );
      console.log(' Estoy Aqui!!! ');
      
      //state.text = action.text
      console.log(state);
      return state
    default:
      return state
  }
}

function requestPosts(state = [], action ){
  switch (action.type) {
    case REQUEST_POSTS:
      console.log(' Estoy Post!!! ');
      console.log( action );
      console.log(' Estoy Post!!! ');      
      //state.text = action.text

      console.log(state);
      console.log('state', state.text)
      return { text: action.text}
    default:
      return state
  }

}

function toText(state = [], action ){
  switch (action.type) {
    case TO_TEXT:
      console.log(' Estoy Totelx!!! ');
      console.log( action );
      console.log(' Estoy Totelx!!! ');      
      //state.text = action.text

      console.log(state);
      return { ...state, text: action.text}
    default:
      return state
  }

}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  textRequest,
  requestPosts,
  toText
})

export default todoApp
