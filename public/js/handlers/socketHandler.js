let socket = io();
// socket.emit("filteredRequest",{"asd":"ASd"})

function AppendSingleShoeToElement1(element_id, item_id, item_name, item_price, item_size, item_image, item_tag = 'sale') {
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
                <p class="text-muted">price: ${item_price} ₪ </p>
                
                <small class="text-muted"${item_size}</small>
              </div>
            </div>
          </div>
        </div>`
    div_all_items_new_arrival.innerHTML += data;
}

function showItemsAfterFilter(res) {
    const div_all_items_new_arrival = document.getElementById('album-shoes');
    div_all_items_new_arrival.innerHTML = "";

    const items = res.data
    for (let item of items) {
        AppendSingleShoeToElement1("album-shoes", item._id, item.title, item.price, item.size, item.image_url)
    }
}

socket.on('filteredData', function (msg) {
    // socket.emit('whatever', 'baz');
    showItemsAfterFilter(JSON.parse(msg));
});
