import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'


import {createStore, applyMiddleware} from 'redux';  
//import rootReducer from '../reducers/rootReducer';  
import thunk from 'redux-thunk';

export default function configureStore() {  
  return createStore(
  	todoApp,
    applyMiddleware(thunk)
  );
}


//const initialState = { text: "Vacio" };
/*const store = createStore(
  todoApp
)//const port = process.env.PORT || 4000
*/

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
