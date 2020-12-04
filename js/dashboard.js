//dashboard.html --> put settings data in all input fields
db.collection('settings').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      var tittle_input = document.getElementById("exampleInputTittle1");
      var banner_input = document.getElementById("exampleInputBanner1");
      var address_input = document.getElementById("exampleInputAddress1");
      var faddress_input = document.getElementById("exampleInputFullAddress1");
      var email_input = document.getElementById("exampleInputEmail1");
      var mobile_input = document.getElementById("exampleInputMobile1");
      var copyright_input = document.getElementById("exampleInputCopyright1");
  
      tittle_input.value = doc.data().tittle;
      banner_input.value = doc.data().banner;
      address_input.value = doc.data().address;
      faddress_input.value = doc.data().fullAddress;
      email_input.value = doc.data().email;
      mobile_input.value = doc.data().mobile;
      copyright_input.value = doc.data().copyright;
      updateSettings(doc.id);
      });
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  
  // update settings data after clicking update button of dashboard.html
  function updateSettings(id){
  
      var tittle_input = document.getElementById("exampleInputTittle1");
      var banner_input = document.getElementById("exampleInputBanner1");
      var address_input = document.getElementById("exampleInputAddress1");
      var faddress_input = document.getElementById("exampleInputFullAddress1");
      var email_input = document.getElementById("exampleInputEmail1");
      var mobile_input = document.getElementById("exampleInputMobile1");
      var copyright_input = document.getElementById("exampleInputCopyright1");
  
      var updateSettings = document.getElementById("updateSettings");
  
      updateSettings.addEventListener('click', (e) => { // Update data into Firebase
        e.preventDefault();
        db.collection("settings").doc(id).update({ 
          tittle: tittle_input.value,
          banner: banner_input.value,
          address: address_input.value,
          fullAddress: faddress_input.value,
          email: email_input.value,
          mobile: mobile_input.value,
          copyright: copyright_input.value,
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
