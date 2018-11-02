
import Specimen from '../definitions/Specimen.ttl'

function getConcept(path){

  //var fs = require('fs');

  let regexp = new RegExp("^.*\/(.*)\.ttl");
  let result = path.match(regexp);
  var conceptName = result[1];
  console.log(path)
  console.log(conceptName);

  var modelo = {};

  console.log(Specimen)


  //var fs = require('fs');
  //var stream = fs.createReadStream(Specimen);

  /*if (rl != null ){
    rl.on('line', function(line) {
        fhirsConceptTurtleToSchemaLine(conceptName, modelo, line);
    });
  }*/
  
  return modelo; 

}



function fhirsConceptTurtleToSchemaLine(conceptName,schema, line){
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
        valParameter = {type: String}, 
                        //validate: require('mongoose-validators').isURL()};
        jsonObj[result[1]] = valParameter;
        break;
      case /Reference.*/.test(result[2]):
        console.log("• Matched Reference");
        let objectReference = result[2].match((new RegExp("Reference.(.*).")))[1];
        
        /////////////////////// Reference Falta /////////////////////////
        //valParameter = [{ type: Schema.Types.ObjectId, ref: objectReference }]
        jsonObj[result[1]] = [valParameter];
        break;       
      default:
        console.log("• Didn't match first level");
        //valParameter = require('mongoose').model(result[2]).schema
        if ( valParameter == null ){
          console.log("• Didn't match any test");
          valParameter = String;
        } else {
          console.log("• Is DataType Valid.");
          jsonObj[result[1]] = valParameter;          
        }
        break;
    }

    return jsonObj;
  }
}

export function getConceptSchema(conceptName){
  var pathDefinitions = "./definitions/"; //Parametro configurable
  var format = ".ttl";
  let concept = getConcept(pathDefinitions+conceptName+format);

  console.log("sdfklj")/*
  return { title: {type: "string", title: "Title", default: "A new task"},
        text: {type: "string", title: "Text", default: "A new text"},
        done: {type: "boolean", title: "Done?", default: false}
      };

      */

      return concept;
}
