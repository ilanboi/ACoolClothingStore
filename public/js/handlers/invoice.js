const userData = JSON.parse(getCookie("userdata"))

function putAddressOnInvoice() {
    let thankyoumsg = `Thank you, ${userData.fname}`
    let fullname = `${userData.fname} ${userData.lname}`
    let shipAddress = `The package will be shipped to, ${userData.address}, ${userData.city} - ${userData.postal}`
    let inTouchMsg = `We will be in touch o your phone -, ${userData.telephone}`
    $('#thankyou-name').text(thankyoumsg)
    $('#fullname').text(fullname)
    $('#fulladdress').text(shipAddress)
    // $('#fulladdress').text(shipAddress)
}

function clearCart() {
    const dataaa = JSON.stringify({
        email: userData.email,
    })
    $.ajax({
        url: '/api/user/clearCart',
        type: 'post',
        data: JSON.parse(dataaa),
        success: function (res) {
            console.log(res)
        }
    });
}

$(document).ready(function () {
    clearCart()
    putAddressOnInvoice();
});