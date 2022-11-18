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

function execUserRegister() {
    if ($('#buyer').hasClass("active")) {
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

