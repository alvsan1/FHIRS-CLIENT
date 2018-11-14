
import React from "react";
import { render } from 'react-dom'
import Form from "react-jsonschema-form";
import { AsyncTypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { textRequest} from '../actions';

import LayoutField from "react-jsonschema-form-layout-grid";

//import { getConceptSchema } from '../util/Transformers';

const log = (type) => console.log.bind(console, type);

const SchemaForm = ({ text , dispatch }) => {
//console.log(this)
  let uri = document.getElementById('root').baseURI;
  //let propertiesForm = { title: {type: "string", title: "Title", default: "A new task"},
          //text: {type: "string", title: "Text", default: "A new text"},
          //done: {type: "boolean", title: "Done?", default: false}
  //};


  let regexp = new RegExp("http.*3000\/(.*)");
  let result = uri.match(regexp);
  /*let jsonSchema = require('../definitions/'+result[1]+".js")

  console.log("***********jsonSchema********");
  console.log(jsonSchema.default);
  console.log("***********jsonSchema********");
  */
  var schemaForm = require('../../definitions/'+result[1]+".json");
/*let schemaForm = {
    title: "Todo",    
    type: "object",
    required: ["title"],
    properties: jsonSchema
  };
*/
/*

let prueba = request('http://192.168.56.1:3000/definitions/Specimen.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     //var importedJSON = JSON.parse(body);
     schemaForm.properties = propertiesForm;
     //console.log(body);
     //console.log(this);
     //render()

     //this.forceUpdate();

  }
})
*/
   
  const onSubmit = ({formData}) => {dispatch(textRequest(result[1],formData)); console.log("dsf")};


  //const onChange = ({name}) => {console.log(name)};

  const onChange = ({name,formData}) => {
      /*var newValue = getValue(event, multiple);
        _onChange(processValue(schema, newValue));
          if (schema.element_onChange) {  // N.B: my addition is this if and call of element_onChange
              schema.element_onChange(newValue);
          }*/





        //formData.userId = this.getUserIdByName(formData.name);
        //this.setState({ formData }); // I want this only upon name change

    console.log(formData);
    console.log(name);
  } 

/*

{e => {
          )

        }}


*/

/*
const uiSchema = {
  status: {
    classNames: "task-title foo-bar"
  },
  identifier: { use: {
    classNames: "task-title foo-bar"
  } }
};

*/

//const uiSchema = {}


  const uiSchema = {
    /*request:{"ui:field": "typeahead",
  "typeahead": {
     "options": [
  {
    "name": "Adventures of Huckleberry Finn", "author": "Mark Twain"
  },
  {
    "name": "The Adventures of Tom Sawyer", "author": "Mark Twain"
  }
],
     "labelKey": "name",
     "mapping": "name"
   }},*/
    request: {"ui:field": "asyncTypeahead",
      "asyncTypeahead": {
        "url": "http://192.168.56.1:4000/api/v/specimen?select={id:1}",
        search: (url, query) => fetch(`${url}?name=${query}&maxSize=1`)
      },
      "labelKey": "_id"
    },
    status: {
      classNames: "col-md-6"
    },
    identifier: {
      //classNames: "row",
      use: {
        classNames: "col-md-5"
      },
      type: {
        coding:{
          'ui:field': 'layout_grid',
          'ui:layout_grid': { 
            'ui:group': 'Coding',
            'ui:row': [
                { 'ui:col': { md: 4, children: ['code'] } },
                { 'ui:col': { md: 1, children: ['version'] } },
                { 'ui:col': { md: 6, children: ['display'] } },
                { 'ui:col': { md: 1, children: ['userSelected'] } },
            ]
          }
        },
        
        'ui:field': 'layout_grid',
        'ui:layout_grid': { 
          'ui:row': [
              { 'ui:col': { md: 12, children: ['coding'] } },
              { 'ui:col': { md: 10, children: ['text'] } },
          ]
        }    
      },
      value: {
        classNames: "col-md-10",
      }
    }
  };


  function Tpl(props) {
    const {id, label, required, children} = props;
    return (
      <div className="myfield">
        <label htmlFor={id}>{label}{required ? "*" : null}</label>
        {children}
      </div>
    );
  }


  function CustomFieldTemplate(props) {
    return props.displayLabel
      ? <div className={props.classNames}>
          <label htmlFor={props.id} className="control-label col-md-1">
            {props.label}{props.required ? '*' : null}
          </label>
          <div className="col-md-10">
            {props.description}
            {props.children}
            {props.errors}
            {props.help}
          </div>
        </div>
      : <div className={props.classNames}>
          {props.children}
        </div>;
  }
/*
    "ui:fieldset": {
    "ui:widget": "tab",
    "ui:props": { eventKey: 2 },
    "ui:include": ["use", "value"]
    },*/

// classNames: "col-md-1 col-sm-6"
// style={{position:'absolute'}}

// Define a custom component for handling the root position object


  class GeoPosition extends React.Component {
    constructor(props) {
      super(props);
      let param = {};
      param[props.name]=0;
      this.state = param;
    }

    onChange(name) {
      console.log(name);
      return (event) => {
        this.setState({
          [name]: parseFloat(event.target.value)
        }, () => this.props.onChange(this.state)); 
      };
    }

    render() {
      const {id} = this.state;
      return (
        <div>
          <input id={this.props.name} type="string" value={id} onChange={this.onChange(this.props.name)} />
        </div>
      );
    }
  }


const fields = {
    layout_grid: LayoutField,
    geo: GeoPosition,
    asyncTypeahead: AsyncTypeaheadField
   }





/*
  const fields = {
    layout_grid: LayoutField,
    geo: GeoPosition,
    
   }

  const onFieldChange = (name, formData) => {
        console.log(name);
  }

  const formContext = {
           onFieldChange: onFieldChange
  };

*/
  return (
    <div className="container">    
      <Form schema={schemaForm}
              uiSchema={uiSchema}
              FieldTemplate={CustomFieldTemplate}
              fields={fields}
              onChange={onChange}
              onSubmit={onSubmit}
              onError={log("errors")} id="ConceptsSchema"/>
    </div>
  )
};


export default SchemaForm  

