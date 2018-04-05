window.onload = function() {

  document.getElementById("myModal").style.display = "none";
  
      //document.getElementById("demo").innerHTML = 
  //"The full URL of this page is:<br>" + window.location.href;

  var url_string = window.location.href;
  console.log(url_string);
  var url2 = new URL(url_string);
  var a = url2.searchParams.get("a");
  console.log(a);

  document.getElementById("btnsubmit").addEventListener("click", function(){
    //var fs = require('fs');
    var code = document.getElementById("secret-code").value;
    console.log(code); 

    var message = document.getElementById("secret-message").value;
    console.log(message);

    var number = Math.floor(Math.random() * 90000000) + 10000000;



    var uinput = {  "publicK" : number,
                    "scode" : code,
                    "smessage" : message
                    };

     console.log(uinput);

     writeUserData(number, code, message);

     function writeUserData(publicK, code, message) {
        firebase.database().ref('post/' + publicK).set({
        secretCode: code,
        message: message,
        publicKey: publicK
      });

      }

      //Create URL now
      var urlReturn = "file:///Users/Josh/Desktop/Encrypty/index.html?Key=" + number;
      console.log(urlReturn);
      document.getElementById("demo").innerHTML = urlReturn;
      document.getElementById("demo").href = urlReturn;
      document.getElementById("demoText").innerHTML = "Your new encrypted message is stored in the following URL";
      document.getElementById("demoText2").innerHTML = "Copy and paste this to your social media sites and give your secret code to your closest friends!";
      document.getElementById("URLBox").classList.add("URLBox2");

  });


  document.getElementById("btnsubmit2").addEventListener("click", function(){

    var fullURL = window.location.href;
    console.log(fullURL);

    var url = new URL(url_string);
    var pubKey = url.searchParams.get("Key");
    console.log(pubKey);

    var poo = firebase.database().ref("post").toJSON();
    console.log(poo);

    var poo2 = firebase.database().ref("post/"+pubKey).toJSON();
    console.log(poo2);

    var codey = document.getElementById("secret-code2").value;
    console.log(codey);

    var firCode = firebase.database().ref("post/"+pubKey+"/secretCode").toJSON();
    console.log("Secret code returned from firebase is " + firCode);

    var leadsRef = firebase.database().ref("post/"+pubKey);
    //console.log("firs");
    leadsRef.on('value', function(snapshot) {
      //console.log("first");
      var testChild = snapshot.val();
      console.log(testChild);
      var secChild = testChild.secretCode;
      console.log(secChild);
      var messageChild = testChild.message;

      if(codey == secChild){
      console.log("Codes match");
      console.log("message is " + messageChild);
      //alert(messageChild);
      var span = document.getElementsByClassName("close")[0];
      document.getElementById("myModal").style.display = "block";
      document.getElementById("modText").innerHTML = "The secret message is: " + messageChild;
      span.onclick = function() {
        document.getElementById("myModal").style.display = "none";
      }

    }
      //snapshot.forEach(function(childSnapshot) {
       // console.log("first1");
       // var childData = childSnapshot.val();
       // console.log(childData);
        //console.log("first11");
      //});
    }); 

    


/*
    var ref = firebase.database().ref("users/ada");
    ref.once("value")
    .then(function(snapshot) {
      var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
      var firstName = snapshot.child("name/first").val(); // "Ada"
      var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
      var age = snapshot.child("age").val(); // null
    });
*/


  });


}