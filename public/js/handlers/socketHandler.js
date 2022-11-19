let socket = io();
socket.emit("filteredRequest",{"asd":"ASd"})

socket.on('filteredData', function(msg){
    // socket.emit('whatever', 'baz');
    console.log(msg);
});

