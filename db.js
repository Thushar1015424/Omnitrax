function uploadSecurityCheckMain(){
   var number_plate = document.getElementById("securityNumberPlate").value;
   var weight = document.getElementById("securityCoalWeight").value;
   var departed = document.getElementById("securityDepartChk").value;
   const url = 'http://localhost:8080/getDetails?a='+number_plate+"&b="+weight+"&c="+departed;
   //const url = 'http://localhost:8080/getDetails?a=a&b=b&c=c';
   xml_http_request = new XMLHttpRequest(url);
   xml_http_request.open("GET", url, false);
   xml_http_request.send();
   console.log("Finished");
}


function displayTable(){
   console.log("Here");
   //window.location.href = 'vehicleListDatabase.html';
   const url = 'http://localhost:8080/fetchDetails';
   xml_http_request = new XMLHttpRequest(url);
   xml_http_request.open("GET", url, false);
   xml_http_request.send();
   console.log("Finished");
   var json_file = JSON.parse(xml_http_request.responseText);
   console.log(json_file);
   var x = document.getElementById("tempBodyId");
   x.innerHTML = `
   
   <div style="margin-top:20vh; margin-left: 3cm; margin-right:3cm;align-items:center;text-align:center;">
   <h3>Vehicle Status Details</h3>
   <table id="vehiclesTable" style="margin: auto;" class="table table-striped">
   <thead>
       <tr><th>Number Plate</th><th>Driver Name</th><th>Coal Weight</th><th>Departed</th><th>Passed Junctions</th><th>Failed Junctions</th>
       </tr>
   </thead>
   <tbody id="vehicleTableBody">   
   `;
   var y = document.getElementById("vehicleTableBody");
    for (var i = 0; i < json_file.length; i++) {
      var junctions = json_file[i].junctions;
      var passed='', failed='';
      for (var j=0; j<junctions.length; j++){
         if(junctions[j].status == "pass" && j!=junctions.length-1)passed += junctions[j].region +', ';
         else failed +=junctions[j].region+'\n';
      }
      y.innerHTML +=`
      <tr>
         <td>${json_file[i].truck_number_plate}</td>
         <td>${json_file[i].truck_driver_name}</td>
         <td>${json_file[i].coal_weight}</td>
         <td>${json_file[i].departed}</td>
         <td>${passed}</td>
         <td>${failed}</td>
      </tr>
      `
    } 
    x.innerHTML += `</tbody>
    </table>
    </div>
    <section class="footer">
      <div class="icons">
          <img src="twitter.png"style="width: 25px;height: 25px;">
          <img src="linkedin.png"style="width: 25px;height: 25px;">
          <img src="instagram icon.png"style="width: 25px;height: 25px;">
      </div>
      <p>&copy; Copyrights by Detect Infinty. All rights reserved</p>    
      </section>
    
    `;
}

/*
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://detect_infinity:thunderbolts@cluster0.osjc5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
const dbName = "vehicle";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("basicVehicleData");

         // Construct a document                                                                                                                                                              
         let personDocument = {
            truck_number_plate:"MP-09-HH-7891",
            RFID:"8072132236",
            truck_driver:"krishna",
            color:"green"
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
*/

junctions: [{
   junction_name:"hghd",
   status: "Pass"
},
{
   junction_name:"hghd",
   status: "Pass"
}]