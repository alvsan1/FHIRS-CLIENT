import { connect } from 'react-redux'
import SchemaForm from '../components/SchemaForm'




//import { createStore, applyMiddleware } from 'redux'


//import todoApp from '../reducers'

//const store = createStore(todoApp)

//const mapStateToProps = state => ({
//  text: state.text
//})


function mapStateToProps(state ) {
    return {
        state
    };
}

//const mapToProps = ({text}) => ({ text: text });




const Forms = connect(
  mapStateToProps
  )(SchemaForm)
export default Forms

