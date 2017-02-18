/*
  To run this program, install NodeJS and run `node app.js [leads.json] [result.json] [logs.txt]`. Parameters are optional.

  Reads input file as first parameter and removes duplicates based on `_id` and `email`.
  Outputs processed leads in user defined 2nd parameter or `result.json`.
  Creates logs when a certain lead is removed with reason provided in user defined 3rd parameter or `logs.txt`.

  Input: Make sure user defined 1st parameter or `leads.json` is in same directory as this program. 
          It should be a valid JSON file with the following format:
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
  Output: Processed Leads and Logs will be in the same directory as this program.
*/
;(function() {
'use strict'

  const inputFile = (process.argv[2] !== undefined) ? process.argv[2] : "leads.json",
        outputFile = (process.argv[3] !== undefined) ? process.argv[3] : "result.json",
        logFile = (process.argv[4] !== undefined) ? process.argv[4] : "logs.txt",
        fs = require('fs');

  let input = fs.readFileSync(inputFile, 'utf8'),
      log = ""; // Log text

  /*  Since it is not guaranteed or mentioned that the input file will be sorted, the program will sort it.
      Sort based on descending epoch date first and then id.
      Sorting this way ensures the fastest way to deduplicate leads.
  */
  function leadCompare(a,b){
    return (b.entryDateEpoch == a.entryDateEpoch)?b.id-a.id:b.entryDateEpoch - a.entryDateEpoch;
  }

  // Add epoch date and initial index, for easy sorting.
  function initLeads(leads){
    let result = JSON.parse(leads),
        inDate = undefined;

    result.leads.forEach((obj,id,arr) => {
      inDate = Date.parse(obj['entryDate']);
      obj['entryDateEpoch'] = isNaN(inDate)?0:inDate;
      obj['id'] = id;
    });

    result['leads'].sort(leadCompare);
    return result;
  }

  // Appends new logs when the program drops a lead
  function logNewDrop(lead,id,email){
    log += new Date().toString().slice(0,24) + " Lead #" + lead['id'] + " has been dropped because of duplicate ";
    log += (id === true && email === true)?"_id and email\n":id === true?"_id\n":"email\n";
  }

  // Remove duplicated leads based on `_id` and `email`. Checking for duplicates is done with a dictionary for fast lookup.
  function runDedup(leads){
    let dict = {},
        id = false,
        email = false,
        result = [];

    for(let i=0;i<leads.length;i++){
      id = dict[leads[i]['_id']];
      email = dict[leads[i]['email']];
      if(id === undefined && email === undefined){
        dict[leads[i]['_id']] = true;
        dict[leads[i]['email']] = true;
        result.push(leads[i]);
      } else {
        logNewDrop(leads[i],id,email);
      }
    }
    return result;
  }

  // Main run function aka THE CONTROLLER
  function run(input){
    let result = [], // To store processed results,
        leads = initLeads(input);

    result = runDedup(leads.leads);
    result.reverse(); // Reverse so it is in the same order as input file, presumably the oldest leads should get looked at first.
    return {leads:result};
  }

  fs.writeFileSync(outputFile, JSON.stringify(run(input), null, '\t'), 'utf8');
  fs.writeFileSync(logFile, log, 'utf8');
  console.log("Leads Processing Success!\nResults are in " + outputFile + ".\nLogs are in " + logFile + ".");
})();