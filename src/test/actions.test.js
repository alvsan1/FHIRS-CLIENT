import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library
import {
  TEXT_REQUEST,
  REQUEST_POSTS,
  TO_TEXT
} from '../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH POST /', () => {

    fetchMock.postOnce('localhost:4000', { body: { text: 'do something' }, headers: { 'content-type': 'application/json' } })

    /*.catch(unmatchedUrl => {
    // fallover call original fetch, because fetch-mock treats
    // any unmatched call as an error - its target is testing
        return realFetch(unmatchedUrl)
    })*/

    const expectedActions = [
      { type: TEXT_REQUEST, body: { text: "do something" } }
    ]

    //const store = mockStore({ text: "" })
    const store = mockStore()
    //console.log( actions.textRequest )
    return store.dispatch( actions.textRequest("do something") ).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
    
  })
})