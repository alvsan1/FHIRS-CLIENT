
import React from "react";
import { render } from 'react-dom'
import Form from "react-jsonschema-form";
import { textRequest} from '../actions';

import LayoutField from "react-jsonschema-form-layout-grid";

//import { getConceptSchema } from '../util/Transformers';

const log = (type) => console.log.bind(console, type);

const SchemaForm = ({ text , dispatch }) => {
//console.log(this)
let uri = document.getElementById('root').baseURI;
let propertiesForm = { title: {type: "string", title: "Title", default: "A new task"},
        text: {type: "string", title: "Text", default: "A new text"},
        done: {type: "boolean", title: "Done?", default: false}
};


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

const fields = {
  layout_grid: LayoutField,
 }


  return (
    <div className="container">    
      <Form schema={schemaForm}
              uiSchema={uiSchema}
              //FieldTemplate={CustomFieldTemplate}
              fields={fields}
              onChange={log("changed")}
              onSubmit={onSubmit}
              onError={log("errors")} id="ConceptsSchema"/>
    </div>
)};


export default SchemaForm  

