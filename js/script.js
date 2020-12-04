// table.html --> show all product image & hover edit + delete button activity
db.collection('products').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      
        var product = '<div class="column">'   //image section
         + '<img style="width:100%" class="image" src="images/' + doc.data().image + '">'
         +'<div class="middle">'
         +"<div class='button' onClick=updateData('"
         +doc.id+'\')><i class="fa fa-edit" style="font-size:22px"></i></div>'
         +"<div class='button' onClick=deleteData('"
         +doc.id+'\')><span aria-hidden="true" style="font-size:40px">&times;</span></div>'
         + '</div>'
         + '</div>';


        $("#showProduct").append(product);
    });
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// chart.html --> put 'About' data in textArea
db.collection('settings').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    var aboutTextArea = document.getElementById("exampleInputTextAreaAbout1");
    aboutTextArea.value = doc.data().about;
    updateAbout(doc.id);
    });
}).catch(function(error) {
    console.log("Error getting document:", error);
});

//dashboard.html --> put settings data in all input fields
db.collection('settings').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    var tittle_input = document.getElementById("exampleInputTittle1");
    var heading_input = document.getElementById("exampleInputHeading1");
    var address_input = document.getElementById("exampleInputAddress1");
    var faddress_input = document.getElementById("exampleInputFullAddress1");
    var email_input = document.getElementById("exampleInputEmail1");
    var mobile_input = document.getElementById("exampleInputMobile1");
    var copyright_input = document.getElementById("exampleInputCopyright1");

    tittle_input.value = doc.data().tittle;
    heading_input.value = doc.data().heading;
    address_input.value = doc.data().address;
    faddress_input.value = doc.data().fullAddress;
    email_input.value = doc.data().email;
    mobile_input.value = doc.data().mobile;
    copyright_input.value = doc.data().copyright;
    updateAbout(doc.id,tittle_input.value,heading_input.value,address_input.value,
      faddress_input.value,email_input.value,mobile_input.value,copyright_input.value);
    });
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// update about section after clicking update button of chart.html
function updateAbout(id) {
  var aboutTextArea = document.getElementById("exampleInputTextAreaAbout1");
  var about = document.getElementById("updateAbout");

  about.addEventListener('click', (e) => { // Update data into Firebase
    e.preventDefault();
    db.collection("settings").doc(id).update({ 
      about: aboutTextArea.value,
    })
    .then(function () {
      alert("Yeah Updated!!");
      location.reload();  //reload to load all the product
      return false;
    })
    .catch(function (error) {
      console.log('Update failed: ' + error.message);
    });
  });
}

// delete button funtionality
function deleteData(id) {

    if (confirm("The Product will be Removed!")) {
      //remove that product 
      db.collection("products").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    } else {
      //disapper the alert box
    }
}

// update button funtionality
function updateData(id) {
  
    document.getElementById("updateProduct").style.display = "block";
    window.scrollTo(0,document.body.scrollHeight);
    var despUp = document.getElementById("exampleInputTextAreaDescription1");
    var imageUp = document.getElementById("exampleInputImageName1");
    var submit = document.getElementById("submitProduct");
  
    // show value of description and image in input field
    db.collection('products').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
      despUp.value = doc.data().description;
      imageUp.value = doc.data().image;
      })
    });
     
    submit.addEventListener('click', (e) => { // Update data into Firebase
      e.preventDefault();

      db.collection("products").doc(id).update({ 
          description: despUp.value,
          image: imageUp.value })
        .then(function () {
          alert("Product Updated!!");
          location.reload();  //reload to load all the product
          return false;
        })
        .catch(function (error) {
          console.log('Update failed: ' + error.message);
        });
    });
}
