$('input[name="client_type"]').on("click", function () {
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(".box").not(targetBox).hide();
    $(targetBox).show();
});

$('#loginForm').submit(function (e) {
    if ($('#company_radio_login').is(":checked")) {
        $.ajax({
            url: '/api/supplier/login',
            type: 'post',
            data: $('#loginForm').serialize(),
            success: function (res) {
                const supplier_details = JSON.stringify(res['supplierDetails'])
                addToCookies("userdata", supplier_details, addYears(new Date(), 1))
                addToCookies("usertype", 'supplier', addYears(new Date(), 1))

                alert("works login comp")
            }
        });

    } else if ($('#private_radio_login').is(":checked")) {

        $.ajax({
            url: '/api/user/login',
            type: 'post',
            data: $('#loginForm').serialize(),
            success: function (res) {
                const user_details = JSON.stringify(res['userDetails'])
                addToCookies("userdata", user_details, addYears(new Date(), 1))
                addToCookies("usertype", 'user', addYears(new Date(), 1))
                window.location = "/";

            }
        });
    }
    e.preventDefault();
});

$('#createUserForm').submit(function (e) {
    if ($('#company_radio').is(":checked")) {
        $.ajax({
            url: '/api/supplier/createSupplier',
            type: 'post',
            data: $('#createUserForm').serialize(),
            success: function (res) {
                const user_details = JSON.stringify(res['Supplier'])
                addToCookies("userdata", user_details, addYears(new Date(), 1))
                addToCookies("usertype", 'supplier', addYears(new Date(), 1))
                alert("works")
            }
        });

    } else if ($('#private_radio').is(":checked")) {

        $.ajax({
            url: '/api/user/createUser',
            type: 'post',
            data: $('#createUserForm').serialize(),
            success: function (res) {
                const user_details = JSON.stringify(res['User'])
                addToCookies("userdata", user_details, addYears(new Date(), 1))
                addToCookies("usertype", 'user', addYears(new Date(), 1))
                alert("works")
            }
        });
    }
    e.preventDefault();
});

function execRegister() {
    execSupplierRegister()
    execUserRegister()
}

function execLogin() {
    let userType = $("#login-user-type").val()
    userType === "Supplier" ? execSupplierLogin() : execUserLogin()
}

function execSupplierLogin() {
    $.ajax({
        url: '/api/supplier/login',
        type: 'post',
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val(),
        },
        success: function (res) {
            if (res.success) {
                // console.log(res);
                const user_details = JSON.stringify(res['supplier'])
                addToCookies("userdata", user_details, addYears(new Date(), 1))
                addToCookies("usertype", 'supplier', addYears(new Date(), 1))
                alert("works")
                window.location = '/'
            }
        }
    });
}

function execUserLogin() {
    $.ajax({
        url: '/api/user/login',
        type: 'post',
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val(),
        },
        success: function (res) {
            if (res.success) {
                // console.log(res);
                const user_details = JSON.stringify(res['user'])
                addToCookies("userdata", user_details, addYears(new Date(), 1))
                addToCookies("usertype", 'user', addYears(new Date(), 1))
                alert("works")
                window.location = '/'
            }
        }
    });
}

function execSupplierRegister() {
    if ($('#supplier').hasClass("active")) {
        
        email = $('#cemail').val();
        cname = $('#compName').val();
        telephone = $('#supplier-telephone').val();
        errorDiv= '#invalidErrorSupplier'

        if(SupplierValidation(cname,  telephone, email, errorDiv))
        {
            console.log("validation worked")
            $.ajax({
                url: '/api/supplier/createSupplier',
                type: 'post',
                data: {
                    email: $('#cemail').val(),
                    password: $('#supplierPassword').val(),
                    cname: $('#compName').val(),
                    telephone: $('#supplier-telephone').val(),
                },
                success: function (res) {
                    if (res.success) {
                        const user_details = JSON.stringify(res['User'])
                        addToCookies("supplierdata", user_details, addYears(new Date(), 1))
                        addToCookies("usertype", 'supplier', addYears(new Date(), 1))
                        alert("works")
                        window.location = '/'
                    }
                }
            });
        }
    }
}

function execUserRegister() {
    if ($('#buyer').hasClass("active")) {

        email = $('#user-email').val();
        //password= $('#user-password').val();
        fname = $('#fname').val();
        lname = $('#lname').val();
        address = $('#user-address').val();
        city = $('#user-city').val();
        postal = $('#user-postal').val();
        telephone = $('#user-phone').val();
        errorDiv= '#invalidErrorUser';

        if(UserValidation(fname, lname, telephone, email, city, address, postal, errorDiv))
        {
            $.ajax({
                url: '/api/user/createUser',
                type: 'post',
                data: {
                    email: $('#user-email').val(),
                    password: $('#user-password').val(),
                    fname: $('#fname').val(),
                    lname: $('#lname').val(),
                    address: $('#user-address').val(),
                    city: $('#user-city').val(),
                    postal: $('#user-postal').val(),
                    telephone: $('#user-phone').val(),
                },
                success: function (res) {
                    console.log(res)
                    const user_details = JSON.stringify(res['User'])
                    addToCookies("userdata", user_details, addYears(new Date(), 1))
                    addToCookies("usertype", 'user', addYears(new Date(), 1))
                    alert("works")
                    window.location = '/'
                }
            });
        } 
    }
}

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

function SupplierValidation(cName,  phoneNumber, email, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const PhoneStart = /(050|054|053|052)\d+/
    const emailRgx = /^[a-zA-Z0-9~#%\$\*+-\.!?]+@[a-zA-Z0-9~#%\$\*+-\.!?]+\.[a-zA-Z0-9~#%\$\*+-\.!?]+/
    
    if(cName == "")
    {
        $(errorDiv).text("Invalid input - Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(cName))
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
    else
    {
        $(errorDiv).text("");
        return true;
    }
}

$(document).ready(function () {
    if (getCookie("usertype")) {
        $('#login-btn').html("profile");
        $('#login-btn').on('click', () => {
            window.location = '/profile'
        })
    } else {
        $('#login-btn').on('click', () => {
            window.location = '/login'
        })
    }
})

