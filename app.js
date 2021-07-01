var express= require("express");
var app = express();
var bodyparser= require("body-parser");
const axios = require('axios');
var http = require('http').Server(app);
const port = process.env.PORT || 3000







app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
	res.render("clinic.ejs");
});

app.get("/agora.ejs",function(req,res){
	res.render("agora.ejs");
});


app.post("/connectVideo", function(req,res){
        
 
        var channel_id=req.body.clinic_id;
        var url="http://54.162.56.164:5000/connectVideo?channelName=";
        var url=encodeURI(url);
        var add=String(channel_id);

        var newUrl=url + add;

        var URL=decodeURI(newUrl);

		 var data = {"channel_id":channel_id};
				
				var config = {
				  method: 'post',
				  url: URL,
				  headers: { 
				    'Content-Type': 'text/plain'
				  },
				  data : data
				};

				axios(config) 
				.then(function (response) {
				  console.log(JSON.stringify(response.data));
				  var token=response.data["token"];

				  (async () => {
						try{
						    const ans=await axios.get('http://54.162.56.164:5000/get?id=1150200');
						    var bp=(ans.data["Blood Pressure"]).toFixed(1);
						    var bt=(ans.data["Body Temp"]).toFixed(1);
						    var bw=(ans.data["Body weight"]).toFixed(1);
						    var bg=(ans.data["Blood Glucose"]).toFixed(1);
						    var pr=(ans.data["Pulse"]).toFixed(1);
						    var rr=(ans.data["Respiration Rate"]).toFixed(1);

						    res.render("agora.ejs",{token:token, channel_id:channel_id,bp:bp,bt:bt,bw:bw,bg:bg,pr:pr,rr:rr});
						}

						catch(err){
							console.log(err);
						}
				})();





				  				  // res.render("agora.ejs",{token:token, channel_id:channel_id});
				  
				  // res.render("agora.ejs",{token:token, channel_id:channel_id,bp:bp,bt:bt,bw:bw,bg:bg,pr:pr,rr:rr});
				})
				.catch(function (error) {
				  console.log(error);
				});


});






// app.get("/connectVideo",function(req,res){

// 	(async () => {
// 			try{
// 				const val=await axios.get('http://54.162.56.164:5000/same');
// 				const ans=await axios.get('http://54.162.56.164:5000/connectVideo?channelName=12345');
// 			    const response=await axios.get('http://54.162.56.164:5000/get?id=1150200');
// 			    var token=ans.data["token"];
// 			    var patient_id1=ans.data["patient_id"];
// 			    var bp=(response.data["Blood Pressure"]).toFixed(1);
// 			    var bt=(response.data["Body Temp"]).toFixed(1);
// 			    var bw=(response.data["Body weight"]).toFixed(1);
// 			    var bg=(response.data["Blood Glucose"]).toFixed(1);
// 			    var pr=(response.data["Pulse"]).toFixed(1);
// 			    var rr=(response.data["Respiration Rate"]).toFixed(1);

// 			    var channel_id=val.data["clinic_id"];
// 			    var patient_id2=val.data["patient_id"];
// 			    res.render("agora.ejs",{token:token, channel_id:channel_id,bp:bp,bt:bt,bw:bw,bg:bg,pr:pr,rr:rr});
// 			}

// 			catch(err){
// 				console.log(err);
// 			}
// 	})();
// });



http.listen(port, () => console.log(`Active on ${port} port`))
