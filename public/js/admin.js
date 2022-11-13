// Deleting a user
function deleteUserAjax(userId) {
    $.ajax({
        url: '/api/user/deleteUser/'+userId,
        type: 'delete'
    });
}

// Deleting a supplier
// function deleteSupplierAjax(supplierId) {
//     $.ajax({
//         url: '/api/supplier/deleteSupplier/'+supplierId,
//         type: 'delete'
//     });
// }

// Deleting an item
function deleteItemAjax(itemId) {
    $.ajax({
        url: '/api/item/deleteItem/'+itemId,
        type: 'delete'
    });
}