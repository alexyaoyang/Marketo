/*
  To run this program, install NodeJS and run `node deduplicate.js`.

  Reads leads.json file and removes duplicates based on _id and email.
  Outputs deduplicated leads in leadsdedup.json.
  Creates logs when a certain lead is removed with reason provided in deduplogs.txt.

  Input: Make sure leads.json is in same directory as this program. 
          leads.json should be a valid JSON file with the following format:
          {"leads":[{
            "_id": "jkj238238jdsnfsj23",
            "email": "foo@bar.com",
            "firstName":  "John",
            "lastName": "Smith",
            "address": "123 Street St",
            "entryDate": "2014-05-07T17:30:20+00:00"
          },
          ...
          ]}
  Output: leadsdedup.json and deduplogs.txt will be in the same directory as this program.
*/
{
'use strict'

  const inputFile = "leads.json";
  const outputFile = "leadsdedup.json";
  const logFile = "deduplogs.txt";

  fs = require('fs');

  fs.readFile(inputFile, 'utf8', (err, data) => {
    if(err) return console.error(err);

    // Add epoch date and initial index
    let input = JSON.parse(data),
        inDate;
    input.leads.forEach((obj,id,arr) => {
      inDate = Date.parse(obj['entryDate']);
      obj['entryDateEpoch'] = isNaN(inDate)?0:inDate;
      obj['id'] = id;
    });

    // Sort based on descending epoch date first and then id
    input['leads'].sort((a,b) => {
      return (b.entryDateEpoch == a.entryDateEpoch)?b.id-a.id:b.entryDateEpoch - a.entryDateEpoch;
    });
    
    let dict = {}, // To check for duplicates
        result = {leads:[]}, // To store deduplicated results
        log = "", // Log text
        id = false,
        email = false;
    for(let i=0;i<input.leads.length;i++){
      id = dict[input['leads'][i]['_id']];
      email = dict[input['leads'][i]['email']];
      if(id == undefined && email == undefined){
        dict[input['leads'][i]['_id']] = true;
        dict[input['leads'][i]['email']] = true;
        result.leads.push(input['leads'][i]);
      } else {
        log += "Lead #" + input['leads'][i]['id'] + " has been dropped because of duplicate ";
        log += (id==true && email==true)?"_id and email\n":id == true?"_id\n":"email\n";
      }
    }

    fs.writeFile(logFile, log, (err) => {
      if(err) return console.error(err);
      console.log("Logs saved!");
    });
    fs.writeFile(outputFile, JSON.stringify(result), (err) => {
      if(err) return console.error(err);
      console.log("File saved!");
    });
  });
}