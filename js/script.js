// table.html --> show all product image & hover edit + delete button activity
db.collection('products').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var product = '<div class="column">'   //image section
         + '<img style="width:100%" class="image" src="images/' + doc.data().image + '">'
         +'<div class="middle">'
         +"<a><button onClick=updateData('"
         +doc.id+'\')><i class="fa fa-edit" style="font-size:22px; color: #008CBA"></i></button>'
         +"<button onClick=deleteData('"
         +doc.id+'\')><i class="fa fa-close" style="font-size:22px; color: #f44336"></i></button></a>'
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
