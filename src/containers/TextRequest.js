import { connect } from 'react-redux'
import Text from '../components/Text'




//import { createStore, applyMiddleware } from 'redux'


//import todoApp from '../reducers'

//const store = createStore(todoApp)

//const mapStateToProps = state => ({
//  text: state.text
//})


function mapStateToProps(state ) {
    return {
        text: state.requestPosts.text ? state.requestPosts.text : ""
    };
}

//const mapToProps = ({text}) => ({ text: text });




const TextRequest = connect(
  mapStateToProps
  )(Text)
export default TextRequest