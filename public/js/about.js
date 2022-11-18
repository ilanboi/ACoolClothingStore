// Initialize and add the map
function initMap() {
    // The location of Uluru
    //const uluru = { lat: -25.344, lng: 131.031 };
    let result = get_request(`/api/warehouse/getAllWarehouses/`)
    let sum = 0;
    //let items = result.Cart
    if (!result.length) {
        console.log("error")
    }

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(31.985060092192455, 34.78767853499693),
      });

    for (let object of result.warehouses.data) {
        const location = { lat: parseFloat(object.lat), lng: parseFloat(object.lng) };
          new google.maps.Marker({
            position: location,
            map: map,
          });
    }



  }
  
  window.initMap = initMap;