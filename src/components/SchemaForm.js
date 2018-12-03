
import React from "react";
import { render } from 'react-dom'
import Form from "react-jsonschema-form";
//import { AsyncTypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import { textRequest, requestAutoComplete} from '../actions';
//import fetch from 'cross-fetch'
import LayoutField from "react-jsonschema-form-layout-grid";
//import {asyncTypeahead} from "react-jsonschema-form-extras";
import fields from "react-jsonschema-form-extras";

import applyRules from 'react-jsonschema-form-conditionals';
import Engine from 'json-rules-engine-simplified';



//import { getConceptSchema } from '../util/Transformers';

const log = (type) => console.log.bind(console, type);

const SchemaForm = ({ text , dispatch }) => {
//console.log(this)
  let uri = document.getElementById('root').baseURI;
  //let pepe = new AsyncTypeaheadField({ isLoading: false});
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

  const onChange = ({name,uiSchema, formData}) => {
      /*var newValue = getValue(event, multiple);
        _onChange(processValue(schema, newValue));
          if (schema.element_onChange) {  // N.B: my addition is this if and call of element_onChange
              schema.element_onChange(newValue);
          }*/





        //formData.userId = this.getUserIdByName(formData.name);
        //this.setState({ formData }); // I want this only upon name change

    console.log(formData);
    console.log(name);
    console.log(uiSchema);    
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

//search: (url, query) => fetch(url+'?query={"id":{"$regex":"^('+query+')"}')
  



//////////////// Before  //////////////////////////////////
/*  const uiSchema = {
    request: {"ui:field": "asyncTypeahead",
      "asyncTypeahead": {
        "url": "http://192.168.56.1:4000/api/v/specimen?select={id:1}",
        search: (url, query) => fetch(url+'?query={"id":{"$regex":"^('+query+')"}')
      },
      "labelKey": "id"
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

  

  const uiSchema = {
    request: {"ui:field": "asyncTypeahead",
      "asyncTypeahead": {
        "url": "http://192.168.56.1:4000/api/v/specimen?select={id:1}",
        isLoading: true,
        search: (url, query) => fetch(url+'?query={"id":{"$regex":"^('+query+')"}')
          .then(resp => resp.json())
          .then(json => this.setState({
            isLoading: false,
            options: JSON.stringify(json) 
        })),
        labelKey: "_id"
      }      
    }    
  };




  const uiSchema = {
    request: {"ui:field": "asyncTypeahead",
      "asyncTypeahead": {
        "url": "http://192.168.56.1:4000/api/v/specimen?select={id:1}",
        isLoading: true,
        search: (url, query) => dispatch(requestAutoComplete(url, query)),
        labelKey: "_id",
        options: []
      }      
    }    
  };

*/
  let optionsAutocomplete = "[]";
  
  /*
  function search (url, query){ return fetch(url+'?query={"id":{"$regex":"^('+query+')"}')
          .then(resp => resp.json())
          .then(json => optionsAutocomplete = json);
  };
  */


  


  /*function urlAssign () {
      console.log(this);
      return "http://192.168.56.1:4000/api/v/"+"?select=id";
  };


  const uiSchema = {
    request: {"ui:field": "asyncTypeahead",
      "asyncTypeahead": {
        "url": "http://192.168.56.1:4000/api/v/specimen?select=id",
        isLoading: false,
        options : optionsAutocomplete,
        labelKey: "_id"
      }      
    }    
  };
*/

  let uiSchema = require('../../ui/'+result[1]+".json");


  function searchConcept (url, query){ return fetch(url+'?query={"id":{"$regex":"^('+query+')"}')
          .then(resp => resp.json())
          .then(json => optionsAutocomplete = json);
  };

  //let urlAssign = "http://192.168.56.1:4000/api/v/"++"?select=id";
  function onChangeDynamic(e){
    console.log("Siiiiiiiii");
  }
  //{name,formData}


  //let onChangeDynamic = { (event) => conosle.log(e)}
  //uiSchema["request"]["asyncTypeahead"]["search"] = search;

  //uiSchema["request"]["asyncTypeahead"]["search"] = search;

  function addSearch(schemaForm, uiSchema, searchConcept){    
    console.log(uiSchema);
    let keys = Object.keys(uiSchema);
    for (var i = 0; i < keys.length; i++) {
      console.log(keys[i]);
      console.log("***********************")
      let keysProperties = Object.keys(uiSchema[keys[i]]);
      console.log(keysProperties);
      for (var j = 0; j < keysProperties.length; j++) {
        console.log("*************************************")
        //console.log(keysProperties[j]);
        //console.log(uiSchema[keys[i].toString()][keysProperties[j]]);        
        if ( keysProperties[j] === "asyncTypeahead" ) {
          uiSchema[keys[i]][keysProperties[j]]["search"] = searchConcept;
          //if (uiSchema[keys[i]][keysProperties[j]]["onChange"] != undefined){
            //console.log("***********Dynamic*******************");
            //console.log(schemaForm);
            //schemaForm["properties"][uiSchema[keys[i]][keysProperties[j]]["onChange"]]["onChange"] = onChangeDynamic;
            //console.log(schemaForm);
            /*if ( uiSchema[uiSchema[keys[i]][keysProperties[j]]["onChange"]] == undefined ){
                let param = {onChange: onChangeDynamic}
                uiSchema[uiSchema[keys[i]][keysProperties[j]]["onChange"]] = param;
            }else{
              uiSchema[uiSchema[keys[i]][keysProperties[j]]["onChange"]]["onChange"] = onChangeDynamic;
            }*/
            //console.log(uiSchema);
          //}
        }
      }
    }
    console.log("*****************************************************")
    console.log(uiSchema);
  }
  
  addSearch(schemaForm, uiSchema, searchConcept);

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


  //class GeoPosition extends React.Component {
//    constructor(props) {
//      super(props);
//      let param = {};
//      param[props.name]=0;
//      this.state = param;
//    }//

//    onChange(name) {
//      console.log(name);
//      return (event) => {
//        this.setState({
//          [name]: parseFloat(event.target.value)
//        }, () => this.props.onChange(this.state)); 
//      };
//    }//

//    render() {
//      const {id} = this.state;
//      return (
//        <div>
//          <input id={this.props.name} type="string" value={id} onChange={this.onChange(this.props.name)} />
//        </div>
//      );
//    }
//  }



//   class MyAutocomplete extends AsyncTypeaheadField{
    //constructor(props) {
      //super(props);
      //let param = {};
      //param[props.isLoading]=false;
      //this.state = param;
    //}
//
  //};
//
//
  //const fields = {
      //asyncTypeahead: pepe
   //}
//
//
  //const fields = {
    //layout_grid: LayoutField,
    //geo: GeoPosition,
//    
   //}
//
  //const onFieldChange = (name, formData) => {
        //console.log(name);
  //}
//
  //const formContext = {
           //onFieldChange: onFieldChange
  //};
//
//
//
  //const fields = {
    //asyncTypeahead: AsyncTypeaheadField  ,
   //}


  //const MyCustomWidget = (props) => {
  //return (
    //<input type="text"
      //className="custom"
      //value={props.value}
      //required={props.required}
      //onChange={(event) => console.log(this)} />
    //);
  //};
//
  //const widgets = {
    //myCustomWidget: MyCustomWidget
  //};
//
//
  //return (
    //<div className="container">    
      //<Form schema={schemaForm}
              //uiSchema={uiSchema}
              ////FieldTemplate={CustomFieldTemplate}
              //fields={fields}
              ////widgets={widgets}
              //onChange={onChange}
              //onSubmit={onSubmit}
              //onError={log("errors")} id="ConceptsSchema"/>
    //</div>
  //)


  const rules = [{
    conditions: {
      dynamicModelType: { is: "Substance" }
    },
    event: {
      type: "uiAppend",
      params: {
        "subject": {
          "asyncTypeahead": {
            "url": "http://192.168.56.1:4000/api/v/substance?select=id",
          }
        }
      }
    }
  }];

let FormWithConditionals = applyRules(schemaForm, uiSchema, rules, Engine)(Form);

return (
  <div className="container">
    <FormWithConditionals 
      fields={fields}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  </div>
);




};


export default SchemaForm  

