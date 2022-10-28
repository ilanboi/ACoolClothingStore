// function getAllItems() {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             let response = JSON.parse(readBody(xhr));
//             console.log(response.data);
//             return response
//
//         }
//     }
//     xhr.open('GET', 'api/item/getAllItems', false);
//     xhr.send(null);
//
// }
function showAllItemsHomeGrid() {
    let res = getAllItems()
    const items = res.data
    for (let item of items) {
        showSingleItemInHome(item.title, item.price, item.image_url)
    }
}

function showAllItemsInList() {
    let res = getAllItems()
    const items = res.data
    for (let item of items) {
        showSingleItemInList(item.title, item.price, item.image_url, item.description)
    }
}


function getAllItems() {
    return get_request('api/item/getAllItems');
}


function showSingleItemInList(item_name, item_price, item_image, item_desc) {
    const div_all_items_new_arrival = document.getElementById('all_items_list_rows');
    const data = `<div class="row row_item">
                        <div class="col-sm-4">
                            <figure>
<!--                                <span class="ribbon off">-30%</span>-->
                                <a href="product-detail-1.html">
                                    <img class="img-fluid lazy" src="${item_image}"
                                         data-src="${item_image}" alt="">
                                </a>
                            </figure>
                        </div>
                        <div class="col-sm-8">
<!--                            <div class="rating">-->
<!--                                <i class="icon-star voted"></i>-->
<!--                                <i class="icon-star voted"></i>-->
<!--                                <i class="icon-star voted"></i>-->
<!--                                <i class="icon-star voted"></i>-->
<!--                                <i class="icon-star"></i>-->
<!--                            </div>-->
                            <a href="product-detail-1.html">
                                <h3>${item_name}</h3>
                            </a>
                            <p>${item_desc}</p>
                            <div class="price_box">
                                <span class="new_price">₪ ${item_price}</span>
                                <span class="old_price">$60.00</span>
                            </div>
                            <ul>
                                <li><a href="#0" class="btn_1">Add to cart</a></li>
                                <li><span/></li>
                               
                            </ul>
                        </div>
                    </div>`
    div_all_items_new_arrival.innerHTML += data;
}


function showSingleItemInHome(item_name, item_price, item_image, item_tag = 'sale') {
    const div_all_items_new_arrival = document.getElementById('all_items_new_arrival');
    const data = `<div class="col-6 col-md-4 col-xl-3 isotope-item ${item_tag}">
                        <div class="grid_item">
                            <span class="ribbon new">New</span>
                            <figure>
                                <a href="product-detail-1.html">
                                    <img class="img-fluid lazy" src="${item_image}"
                                         data-src="${item_image}" alt="">
                                    <img class="img-fluid lazy" src="${item_image}"
                                         data-src="${item_image}" alt="">
                                </a>
                            </figure>
                            <div class="rating"><i class="icon-star voted"></i><i class="icon-star voted"></i><i
                                    class="icon-star voted"></i><i class="icon-star voted"></i><i class="icon-star"></i>
                            </div>
                            <a href="product-detail-1.html">
                                <h3>${item_name}</h3>
                            </a>
                            <div class="price_box">
                                <span class="new_price">₪ ${item_price}</span>
                            </div>
                            <ul>
                                <li><span/></li>
                                <li><span/></li>
                                <li><a href="#0" class="tooltip-1" data-toggle="tooltip" data-placement="left"
                                       title="Add to cart"><i class="ti-shopping-cart"></i><span>Add to cart</span></a>
                                </li>
                            </ul>
                        </div>
                        <!-- /grid_item -->
                    </div>`
    div_all_items_new_arrival.innerHTML += data;
}

function createItem() {

}
