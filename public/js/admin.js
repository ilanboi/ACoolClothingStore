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
// Deleting a warehouse
function deleteWarehouseAjax(warehouseId) {
    $.ajax({
        url: '/api/warehouse/deleteWarehouse/' + warehouseId,
        type: 'delete'
    });
}


// Updating a user
function updateUserAjax(userId, index) {
    
    // The relevant DATA to send in the req!
    fname= $('#firstNameEditUser' + index).val()
    lname= $('#lastNameEditUser' + index).val()
    email= $('#emailEditUser' + index).val()
    telephone= $('#phoneNumberEditUser' + index).val()
    city= $('#cityEditUser' + index).val()
    address= $('#addressEditUser' + index).val()
    postal= $('#postalEditUser' + index).val()
    
    errorDiv= '#invalidErrorEditUser'+ index

    console.log('#invalidErrorEditUser'+ index)
    
    if(UserValidation(fname, lname, telephone, email, city, address, postal, errorDiv))
    {
        console.log("The user id is:" + userId);
        console.log("The index is: " + index);
        let data = { updatedData: JSON.stringify({
                        fname: $('#firstNameEditUser' + index).val(),
                        lname: $('#lastNameEditUser' + index).val(),
                        email: $('#emailEditUser' + index).val(),
                        telephone: $('#phoneNumberEditUser' + index).val(),
                        city: $('#cityEditUser' + index).val(),
                        address: $('#addressEditUser' + index).val(),
                        postal: $('#postalEditUser' + index).val()
                        
                    })
            }
        $.ajax({
            url: '/api/user/updateUserById/' + userId,
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("user updated");
                // Adding render the file!
            }
        }); 

        $('#editUserModalForm' + index).modal('toggle');
    }       
}

// Updating a supplier
function updateSupplierAjax(supplierId, index) {
    console.log("The supplier id is:" + supplierId);
    console.log("The index is: " + index);
    let data = { updatedData: JSON.stringify({
                    cname: $('#CNameEditSupplier' + index).val(),
                    email: $('#emailEditSupplier' + index).val(),
                    telephone: $('#phoneNumberEditSupplier' + index).val()
                    // Adding all fields
                })
        }
    $.ajax({
        url: '/api/supplier/updateSupplierById/' + supplierId,
        type: 'post' ,
        dataType: 'json',
        data: data,
        success: function(res){
            console.log("supplier updated");
            // Adding render the file!
        }
    }); 

    console.log($('#CNameEditSupplier' + index).val())

    $('#editSupplierModalForm' + index).modal('toggle');
}

// Updating an item
function updateItemAjax(itemId, index) {
    console.log("The item id is:" + itemId);
    console.log("The index is: " + index);
    let data = { updatedData: JSON.stringify({
                    title: $('#titleEditItem' + index).val(),
                    description: $('#descEditItem' + index).val(),
                    kind: $('#kindEditItem' + index).val(),
                    price: $('#priceEditItem' + index).val()
                    // Adding all fields
                })
        }
    $.ajax({
        url: '/api/item/updateItemById/' + itemId,
        type: 'post' ,
        dataType: 'json',
        data: data,
        success: function(res){
            console.log("item updated");
            // Adding render the file!
        }
    }); 

    console.log($('#titleEditItem' + index).val())
    console.log($('#priceEditItem' + index).val())
    
    $('#editItemModalForm' + index).modal('toggle');
}

// Updating a Warehouse
function updateWarehouseAjax(warehouseId, index) {
    

    console.log($('#nameEditWarehouse' + index).val())
    console.log($('#houseNumberEditWarehouse' + index).val())
   
    wName = $('#nameEditWarehouse' + index).val();
    street = $('#streetEditWarehouse' + index).val();
    city = $('#cityEditWarehouse' + index).val();
    houseNumber = $('#houseNumberEditWarehouse' + index).val();
    lat = $('#latEditWarehouse' + index).val();
    lng = $('#lngEditWarehouse' + index).val();
    errorDiv = '#invalidErrorEditWarehouse' + index;
    
    if(WarehouseValidation(wName, street, city, houseNumber, lat, lng, errorDiv))
    {   
        console.log("The Warehouse id is:" + warehouseId);
        console.log("The index is: " + index);
        let data = { updatedData: JSON.stringify({
                    name: $('#nameEditWarehouse' + index).val(),
                    city: $('#cityEditWarehouse' + index).val(),
                    street: $('#streetEditWarehouse' + index).val(),
                    houseNumber: $('#houseNumberEditWarehouse' + index).val(),
                    lat: $('#latEditWarehouse' + index).val(),
                    lng: $('#lngEditWarehouse' + index).val()       
                })
            }
        $.ajax({
            url: '/api/warehouse/updateWarehouseById/' + warehouseId,
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("warehouse updated");
            // Adding render the file!
            }
        }); 

        $('#editWarehouseModalForm' + index).modal('toggle');
        
    }       
    
    
}

// doesn't really work!!
function createWarehouseAjax() {
    let data = { updatedData: JSON.stringify({
                    name: $('#nameEditWarehouse').val(),
                    city: $('#cityEditWarehouse').val(),
                    street: $('#streetEditWarehouse').val(),
                    houseNumber: $('#houseNumberEditWarehouse').val(),
                    lat: $('#latEditWarehouse').val(),
                    lng: $('#lngEditWarehouse').val()
                })
        }
    $.ajax({
        url: '/api/warehouse/createWarehouse/' ,
        type: 'post' ,
        dataType: 'json',
        data: data,
        success: function(res){
            console.log("warehouse created");
            // Adding render the file!
        }
    }); 

    console.log($('#nameAddWarehouse').val())
    console.log($('#cityAddWarehouse').val())
    console.log($('#streetAddWarehouse').val())
    console.log($('#latAddWarehouse').val())
    console.log($('#lngAddWarehouse').val())
    
    $('#addWarehouseModalForm').modal('toggle');
}


// ADD VALIDATION OR EDIT
// ONLY AFTER VALIDATION ---> CALLING THE RELEVANT UPDATE FUNC!!!

// Validation
function UserValidation(fName, lName, phoneNumber, email, city, address, postal, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const PhoneStart = /(050|054|053|052)\d+/
    const emailRgx = /^[a-zA-Z0-9~#%\$\*+-\.!?]+@[a-zA-Z0-9~#%\$\*+-\.!?]+\.[a-zA-Z0-9~#%\$\*+-\.!?]+/
    
    const addressRgx = /^[A-Za-z]+\s[A-Za-z0-9\s]+$/

    if(fName == "")
    {
        $(errorDiv).text("Invalid input - First Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(fName))
    {
        $(errorDiv).text("Invalid input - First Name must have only letters and spaces");
        return false;
    }
    if(lName == "")
    {
        $(errorDiv).text("Invalid input - Last Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(lName))
    {
        $(errorDiv).text("Invalid input - Last Name must have only letters and spaces");
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
    if(email == "")
    {
        $(errorDiv).text("Invalid input - Email is required");
        return false;
    }
    else if(!emailRgx.test(email))
    {
        $(errorDiv).text("Invalid input - Email must contain @ and a .");
        return false;
    }
    if(address == "")
    {
        $(errorDiv).text("Invalid input - Address is required");
        return false;
    }
    else if(!addressRgx.test(address))
    {
        $(errorDiv).text("Invalid input - Address must start with letters and contains only letters and numbers");
        return false;
    }
    if(city == "")
    {
        $(errorDiv).text("Invalid input - City is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(city))
    {
        $(errorDiv).text("Invalid input - City must have only letters and spaces");
        return false;
    }
    if(postal == "")
    {
        $(errorDiv).text("Invalid input - Postal is required");
        return false;
    }
    else if(!onlyNumbers.test(postal))
    {
        $(errorDiv).text("Invalid input - Postal must have only numbers");
        return false;
    }
    else if((postal.length == 5) || (postal.length == 7 ) )
    {
        $(errorDiv).text("Invalid input - Postal must have 5 or 7 digits");
        return false;
    }
    else
    {
        $(errorDiv).text("");
        return true;
    }
}


function ItemValidation(title, image_url, rating, desc, kind, price, size, company,  errorDiv){
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

function SupplierValidation(cName,  phoneNumber, email, errorDiv){
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

function WarehouseValidation(name,  street, city, houseNumber, lat, lng, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const coordinates = /^[-+]?[0-9]+$/
    
    if(name == "")
    {
        $(errorDiv).text("Invalid input - Warehouse Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(name))
    {
        $(errorDiv).text("Invalid input - Name must have only letters and spaces");
        return false;
    }
    if(street == "")
    {
        $(errorDiv).text("Invalid input - Warehouse street is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(street))
    {
        $(errorDiv).text("Invalid input - Street must have only letters and spaces");
        return false;
    }
    if(city == "")
    {
        $(errorDiv).text("Invalid input - Warehouse city is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(city))
    {
        $(errorDiv).text("Invalid input - City must have only letters and spaces");
        return false;
    }
    
    if(houseNumber == "")
    {
        $(errorDiv).text("Invalid input - House Number is required");
        return false;
    }
    else if(!onlyNumbers.test(houseNumber))
    {
        $(errorDiv).text("Invalid input - house Number must have only numbers");
        return false;
    }
    if(lat == "")
    {
        $(errorDiv).text("Invalid input - Latitude is required");
        return false;
    }
    else if(!coordinates.test(lat))
    {
        $(errorDiv).text("Invalid input - Latitude must have only numbers and -+");
        return false;
    }
    if(lng == "")
    {
        $(errorDiv).text("Invalid input - Longitude is required");
        return false;
    }
    else if(!coordinates.test(lng))
    {
        $(errorDiv).text("Invalid input - Longitude must have only numbers -+");
        return false;
    }
   
    else
    {
        $(errorDiv).text("");
        return true;
    }
}