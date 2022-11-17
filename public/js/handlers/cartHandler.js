function showCartItem(userId) {
    let result = get_request(`/api/user/getCartItemsOfUser/${userId}`)
    let sum = 0;
    let items = result.Cart
    if (!items.length) {
        $("#checkoutBTN").prop('disabled', true)
    }
    for (let item of items) {
        showItems(item.title, item.price, item.image_url, item.description)
        sum += item.price;
        console.log(item)
    }

    $("#numOfItems").text(items.length + " Items");
    $("#sumNum").text(items.length + " Items");
    $("#price").text(sum  + "$");

}


function showItems(item_name, item_price, item_image, item_desc) {
    let div_cart_items = document.getElementById('cart_items_rows');
    const data = `<div class="row border-top border-bottom">
                <div class="row main align-items-center">
                    <div class="col-2"><img class="img-fluid" src="${item_image}"></div>
                    <div class="col">
                        <div class="row text-muted">${item_name}</div>
                        <div class="row">${item_desc}</div>
                    </div>
                    <div class="col">
                        <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                    </div>
                    <div class="col">${item_price}₪ <span class="close">&#10005;</span></div>
                </div>
            </div>`
    div_cart_items.innerHTML += data;
}

$(document).ready(function () {
    showCartItem(JSON.parse(getCookie('userdata'))._id);
})

