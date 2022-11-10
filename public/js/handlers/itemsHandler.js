function showAllItemsHomeGrid() {
    let res = getAllItems()
    const items = res.data
    for (let item of items) {
        AppendSingleShoeToElement("featured-items-sec1", item.title, item.price, item.image_url)
        AppendSingleShoeToElement("featured-items-sec2", item.title, item.price, item.image_url)
    }
}
//
// function showAllItemsOn() {
//     let res = getAllItems()
//     const items = res.data
//     for (let item of items) {
//         AppendSingleShoeToElement("featured-items-sec1", item.title, item.price, item.image_url)
//     }
// }

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

function getFilteredItems(searchText) {
    return get_request(`api/item/search?searchText=${searchText}`);
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

// window.onload = function () {
//     index2ShowItems()
// }


function AppendSingleShoeToElement(element_id, item_name, item_price, item_image, item_tag = 'sale') {
    const div_all_items_new_arrival = document.getElementById(element_id);
    const data = `<div class="col">
          <div class="card shadow-sm">
            <img class="img-fluid lazy" src="${item_image}"
                                         data-src="${item_image}" alt="">
            <div class="card-body">
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">${item_price}</small>
              </div>
            </div>
          </div>
        </div>`
    div_all_items_new_arrival.innerHTML += data;
}

function setItemsOnAlbum(filter) {
    console.log(filter)
    if (filter !== null) {
        const filteredItems = getFilteredItems(filter)
        console.log(filteredItems)
        const items = filteredItems.data
        for (let item of items) {
            AppendSingleShoeToElement("album-shoes", item.title, item.price, item.image_url)
        }
    }

}

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextQueryParam = urlParams.get('searchText');
    console.log(searchTextQueryParam)
    console.log(window.location.href.split('/').length)
    if (searchTextQueryParam) {
        setItemsOnAlbum(searchTextQueryParam);
    } else if (window.location.href.split('/')[window.location.href.split('/').length - 1] === 'items') {
        setItemsOnAlbum("");
    } else {
        showAllItemsHomeGrid();
    }
});