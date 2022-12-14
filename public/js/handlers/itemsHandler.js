function showAllItemsHomeGrid() {
    let res = getAllItems()
    const items = res.data
    const latestitems = items.slice(items.length - 6, items.length)
    for (let item of latestitems) {
        AppendSingleShoeToElement("featured-items-sec1", item._id, item.title, item.price, item.size, item.image_url)
    }
    const hotestitems = items.slice(0, 6)
    for (let item of hotestitems) {
        AppendSingleShoeToElement("featured-items-sec2", item._id, item.title, item.price, item.size, item.image_url)
    }
    for(let item of items) {
        AppendSingleShoeToElement("featured-items-sec3", item._id, item.title, item.price, item.size, item.image_url)
    }
}

function showItemsByGender(gender) {
    let res = get_request('api/item/getItemsByGender/' + gender)
    console.log(res.data)
    const items = res.data
    for (let item of items) {
        AppendSingleShoeToElement("album-shoes", item._id, item.title, item.price, item.size, item.image_url)
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
                                <span class="new_price">??? ${item_price}</span>
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
// <a href="/video?id=<%= videos[i].id %>" class="btn btn-primary">Watch</a>


function AppendSingleShoeToElement(element_id, item_id, item_name, item_price, item_size, item_image, item_tag = 'sale') {
    const div_all_items_new_arrival = document.getElementById(element_id);
    const data = `<div class="col">
          <div class="card shadow-sm">
            <img class="img-fluid lazy" src="${item_image}"
                                         data-src="${item_image}" alt="">
            <div class="card-body">
              <p class="card-text">${item_name}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <a href="/single-item?id=${item_id}" class="btn btn-primary">Watch</a>
                </div>
                <p class="text-muted">price: ${item_price} ??? </p>
                
                <small class="text-muted"${item_size}</small>
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
            AppendSingleShoeToElement("album-shoes", item._id, item.title, item.price, item.size, item.image_url)
        }
    }

}

function setItemsOnAlbumByGender(gender) {
    const filteredItems = showItemsByGender(gender)
    const items = filteredItems.data
    for (let item of items) {
        AppendSingleShoeToElement("album-shoes", item._id, item.title, item.price, item.size, item.image_url)
    }

}

let publicKind = ""
$(document).ready(function () {
    const urln = window.location.href.replace('#', '')
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextQueryParam = urlParams.get('searchText');


    const QueryItemId = urlParams.get('id');
    if (QueryItemId) {
        let response = "";
        $.ajax({
            url: '/api/item/getSpecificItem/' + QueryItemId,
            type: 'get',
            success: function (res) {
                console.log(res);
                $("#item_image").attr("src", res.data.image_url);
                $("#item_description").text(res.data.description);
                $("#item_title").text(res.data.title);
                $("#item_size").text("Size available: " + res.data.size)
                $("#item_price").text(res.data.price + " ???");
            }
        });
    }
    console.log(searchTextQueryParam)
    console.log(window.location.href.split('/').length)

    if (searchTextQueryParam) {
        setItemsOnAlbum(searchTextQueryParam);
    } else if (urln.split('/')[urln.split('/').length - 1] === 'items') {
        publicKind = [{kind: "women"}, {kind: "men"}]
        setItemsOnAlbum("");
    } else if (window.location.href.split('/')[window.location.href.split('/').length - 1] === 'supplier') {
        setItemsOnAlbum("");
    } else if (urln.split('/')[urln.split('/').length - 1] === 'men') {
        publicKind = [{kind: "men"}]
        setItemsOnAlbumByGender("men");
    } else if (urln.split('/')[urln.split('/').length - 1] === 'women') {
        publicKind = [{kind: "women"}]
        setItemsOnAlbumByGender("women");
    } else if (searchTextQueryParam === '') {
        publicKind = [{kind: "women"}, {kind: "men"}]
        setItemsOnAlbum("");
    } else {
        publicKind = [{kind: "women"}, {kind: "men"}]
        showAllItemsHomeGrid();
    }
});

function addToCartRequest() {
    const urlParams = new URLSearchParams(window.location.search);
    const QueryItemId = urlParams.get('id');
    $.ajax({
        url: '/api/user/addToCart',
        type: 'put',
        data: {
            email: JSON.parse(getCookie('userdata')).email,
            item_id: QueryItemId
        },
        success: function (res) {
            if (res.success) {
                // console.log(res);
                alert("item added to cart")
                // window.location = '/'
            }
        }
    });
}

function createItemAjax() {
    
    title = $('#titleItem').val();
    desc = $('#descItem').val();
    kind = $('#kindItem').val();
    price = $('#priceItem').val();
    size = $('#sizeItem').val();
    image_url = $('#imgUrlItem').val();
    company = $('#companyItem').val();
    
    errorDiv= '#invalidErrorItem';

    if(ItemValidation(title, image_url, desc, kind, price, size, company,  errorDiv))
    {
        let data = { 
                        title: $('#titleItem').val(),
                        description: $('#descItem' ).val(),
                        kind: $('#kindItem').val(),
                        price: $('#priceItem').val(),
                        image_url: $('#imgUrlItem' ).val(),
                        size: $('#sizeItem').val(),
                        company: $('#companyItem' ).val()
                    
            }
            console.log(data)
        $.ajax({
            url: '/api/item/createItem/',
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("item created");
                // Adding render the file!
            }
        }); 

        console.log($('#titleItem').val())
        console.log($('#priceItem' ).val())
    
        $('#addNewItemModalForm').modal('toggle');
    }
}

function ItemValidation(title, image_url,  desc, kind, price, size, company,  errorDiv){
    const onlyLettersAndNumbers = /^[A-Za-z0-9.\s]*$/
    const onlyNumbers = /[0-9]+/
    const sizeRgx = /[0-9\.]+/
   
    
    if(title == "")
    {
        $(errorDiv).text("Invalid input - Title is required");
        return false;
    }
    else if(!onlyLettersAndNumbers.test(title))
    {
        $(errorDiv).text("Invalid input - Title must have only letters and numbers");
        return false;
    }

    if(desc == "")
    {
        $(errorDiv).text("Invalid input - Description is required");
        return false;
    }
    if(price == "")
    {
        $(errorDiv).text("Invalid input - Price is required");
        return false;
    }
    else if (!onlyNumbers.test(price))
    {
        $(errorDiv).text("Invalid input - Price must have only numbers");
        return false;
    }
    if(kind == "")
    {
        $(errorDiv).text("Invalid input - Kind is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(kind))
    {
        $(errorDiv).text("Invalid input - Kind must have only letters and spaces");
        return false;
    }
    else if(kind.toLowerCase() != "women" && kind.toLowerCase() != "men")
    {
        $(errorDiv).text("Invalid input - Kind must be women/men ");
        return false;
    }
    if(image_url == "")
    {
        $(errorDiv).text("Invalid input - Image Url is required");
        return false;
    }
    if(size == "")
    {
        $(errorDiv).text("Invalid input - Size is required");
        return false;
    }
    else if (!sizeRgx.test(size))
    {
        $(errorDiv).text("Invalid input - Size must have only numbers and a .");
        return false;
    }
    if(company == "")
    {
        $(errorDiv).text("Invalid input - Company is required");
        return false;
    }
    else
    {
        $(errorDiv).text("");
        return true;
    }
}