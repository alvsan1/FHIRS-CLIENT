function addModels(path){ 

  var pathDataType = path.match((new RegExp("(.*)definitions\/")))[1]+"datatypes/";
  addDataTypes(pathDataType);

  var fs = require('fs'),
    readline = require('readline');


  fs.readdir(path, function(err, items) {
   
      for (var i=0; i<items.length; i++) {
          //console.log(items[i]);

          var ConceptName = items[i].replace(/\.ttl/, '');
          var modelo = new Schema({
          })

          let dataType = mongoose.model(ConceptName, modelo);
      }
  });


  fs.readdir(path, function(err, items) {
   
      for (var i=0; i<items.length; i++) {

          addConcept(path + items[i]);          
      }
  });
}

function addDataTypes(path){ 
  var fs = require('fs'),
    readline = require('readline');


  fs.readdir(path, function(err, items) {
   
      for (var i=0; i<items.length; i++) {
          //console.log(items[i]);

          var dataTypeName = items[i].replace(/\.ttl/, '');
          var modelo = new Schema({
          })

          let dataType = mongoose.model(dataTypeName, modelo);
      }
  });

  fs.readdir(path, function(err, items) {
   
      for (var i=0; i<items.length; i++) {
          addDataType(path + items[i]);
      }
  });

}

export function getConceptSchema(conceptName){
  console.log("sdfklj")
  return { title: {type: "string", title: "Title", default: "A new task"},
        text: {type: "string", title: "Text", default: "A new text"},
        done: {type: "boolean", title: "Done?", default: false}
      };
}
function addConcept(path){

  var fs = require('fs'),
    readline = require('readline');

  options={version:"/v" , postRead: (req, res, next) => {
      console.log("ldldl")
      next()
    }
  }

  var fs = require('fs'),
    readline = require('readline');

  let regexp = new RegExp("^.*\/(.*)\.ttl");
  let result = path.match(regexp);
  var conceptName = result[1];
  console.log(path)
  console.log(conceptName);

  var modelo = require('mongoose').model(conceptName).schema;

  var rd = readline.createInterface({
      input: fs.createReadStream(path),
      output: process.stdout,
      console: false
  });

  rd.on('line', function(line) {
      fhirsConceptTurtleToSchemaLine(conceptName, modelo, line);
  });

  var server = restify.serve(router, mongoose.model(conceptName, modelo), options)

}


function addDataType(path){
  var fs = require('fs'),
    readline = require('readline');

  let regexp = new RegExp("^.*\/(.*)\.ttl");
  let result = path.match(regexp);
  var dataTypeName = result[1];
  console.log(path)
  console.log(dataTypeName);

  
  var modelo = require('mongoose').model(dataTypeName).schema;

  var rd = readline.createInterface({
      input: fs.createReadStream(path),
      output: process.stdout,
      console: false
  });

  rd.on('line', function(line) {
      fhirsConceptTurtleToSchemaLine(dataTypeName, modelo, line);
  });

}


export function fhirsConceptTurtleToSchemaLine(conceptName,schema, line){
  console.log("#########fhirsConceptTurtleToSchemaLine###############");
  console.log(conceptName);


  let regexp = new RegExp(".*fhir:"+conceptName+"\\.(.*) \\[ (.*) \\](, \\.\\.\\.|;) .*# (.*)?");
  let result = line.match(regexp);
  if (!(result == null || result == undefined)) {
    console.log(result);
    console.log(result[1]);
    


    let parameter = result[1];
    let jsonObj = {};
    let valParameter = null;


    switch (true) {
      case /^ *#.*/.test(result[0]):
        console.log("• Matched Commment in code");
        break;
      case /code/.test(result[2]):
        console.log("• Matched code DataType");
        let codes = (result[4].match(/\d (.*)/)[1]).split(" | ");
        if ( codes.length > 1 ){
          if ( result[3] == ", ..."){
            valParameter = {type: [String],
                            enum: codes};
          } else {
            valParameter = {type: String,
                            enum: codes};
          }
        }else{
            valParameter = {type: String};
        }
        jsonObj[result[1]] = valParameter;
        break;
      case /string/.test(result[2]):
        console.log("• Matched code string");
        valParameter = {type: String};
        jsonObj[result[1]] = valParameter;
        break;
      case /boolean/.test(result[2]):
        console.log("• Matched code string");
        valParameter = {type: Boolean};
        jsonObj[result[1]] = valParameter;
        break;
      case /dateTime/.test(result[2]):
        console.log("• Matched code string");
        valParameter = {type: Date};
        jsonObj[result[1]] = valParameter;
        break;        
      case /uri/.test(result[2]):
        console.log("• Matched uri DataType");
        valParameter = {type: String, 
                        validate: require('mongoose-validators').isURL()};
        jsonObj[result[1]] = valParameter;
        break;
      case /Reference.*/.test(result[2]):
        console.log("• Matched Reference");
        let objectReference = result[2].match((new RegExp("Reference.(.*).")))[1];
        valParameter = [{ type: Schema.Types.ObjectId, ref: objectReference }]
        jsonObj[result[1]] = [valParameter];
        break;       
      default:
        console.log("• Didn't match first level");
        valParameter = require('mongoose').model(result[2]).schema
        if ( valParameter == null ){
          console.log("• Didn't match any test");
          valParameter = String;
        } else {
          console.log("• Is DataType Valid.");
          jsonObj[result[1]] = valParameter;          
        }
        break;
    }

    if (jsonObj != {}){
      console.log("Add parameter " + jsonObj);

      let schemaVar = require('mongoose').model(conceptName).schema.add(jsonObj);
    }

  }
}

