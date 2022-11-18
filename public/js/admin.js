// Deleting a user
function deleteUserAjax(userId) {
    $.ajax({
        url: '/api/user/deleteUser/' + userId,
        type: 'delete'
    }); //.done( function(resultArr) {

        // Render the file with all the relevant data BUT activate the USER "pills-users"
        // Another option -> trying to add here the info to the file using ajax
        // somehow get only the users data again OR getting all the data(users, item, suppliers) and 
        // "show active" the specific tap according to what was deleted/updated
        //});
}

// Deleting a supplier
function deleteSupplierAjax(supplierId) {
    console.log("The supplier id is:" + supplierId);
    $.ajax({
        url: '/api/supplier/deleteSupplier/' + supplierId,
        type: 'delete'       
    });
}

// Deleting an item
function deleteItemAjax(itemId) {
    $.ajax({
        url: '/api/item/deleteItem/' + itemId,
        type: 'delete'
    });
}


// Updating a user
function updateUserAjax(userId, index) {
    console.log("The user id is:" + userId);
    console.log("The index is: " + index);
    $.ajax({
        url: '/api/user/updateUser/' + userId,
        type: 'update' ,
        // data:  {
        //     fname: $('#firstNameEdit' + index).val(),
        //     email: $('#emailEdit' + index).val(),
        //     password: $('#phoneNumberEdit' + index).val(),
        // },      
    }); //.done(()=>{
    //     $('.modal').modal('toggle');
    // })
  // $('#editUserModalForm' + index).modal('toggle');
    
    // The relevant DATA to send in the req!
    fname= $('#firstNameEditUser' + index).val()
    email= $('#emailEditUser' + index).val()
    telephone= $('#phoneNumberEditUser' + index).val()
    errorDiv= '#invalidErrorEditUser'+ index
    
    console.log("fname: "+fname)
    console.log("email: "+email)
    console.log("telephone: "+telephone)
    console.log('#invalidErrorEditUser'+ index)

    if(validation(fname, telephone, email, errorDiv))
    {
        $('#editUserModalForm' + index).modal('toggle');
        // And send the request!!!
    }       
}

// Updating a supplier
function updateSupplierAjax(supplierId, index) {
    console.log("The supplier id is:" + supplierId);
    $.ajax({
        url: '/api/supplier/updateSupplier/' + supplierId,
        type: 'update'       
    });

    $('#editSupplierModalForm' + index).modal('toggle');
}
// Updating an item
function updateItemAjax(itemId, index) {
    console.log("The item id is:" + itemId);
    $.ajax({
        url: '/api/item/updateItem/' + itemId,
        type: 'update'       
    });

    $('#editItemModalForm' + index).modal('toggle');
}

// ADD VALIDATION OR EDIT
// ONLY AFTER VALIDATION ---> CALLING THE RELEVANT UPDATE FUNC!!!

// Validation
function validation(fName,  phoneNumber, email, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const PhoneStart = /(050|054|053|052)\d+/
    
    if(fName == "")
    {
        $(errorDiv).text("Invalid input - Full Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(fName))
    {
        $(errorDiv).text("Invalid input - Name must have only letters and spaces");
        return false;
    }
    
    if(phoneNumber == "")
    {
        $(errorDiv).text("Invalid input - Phone Number is required");
        return false;
    }
    else if(!onlyNumbers.test(phoneNumber))
    {
        $(errorDiv).text("Invalid input - Phone Number must have only numbers");
        return false;
    }
    else if(onlyNumbers.test(phoneNumber) && !PhoneStart.test(phoneNumber))
    {
        $(errorDiv).text("Invalid input - Phone Number must start with one of the following: 050/052/053/054");
        return false;
    }
    else if(onlyNumbers.test(phoneNumber) && PhoneStart.test(phoneNumber) && (phoneNumber.length != 10))
    {
        $(errorDiv).text("Invalid input - Phone Number must have 10 digits");
        return false;
    }
    else
    {
        $(errorDiv).text("");
        return true;
    }
}