function drawCircle() {

// set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#my_dataviz2")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
    var data = {a: 9, b: 20, c:30, d:8, e:12}

// set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);

// Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return "grp " + d.data.key})
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)

}
function drawBars() {

// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// get the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", function(data) {

        // X axis: scale and draw:
        var x = d3.scaleLinear()
            .domain([0, 40])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function(d) { return d.price; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(70)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(data);

        // Y axis: scale and draw:
        var y = d3.scaleLinear()
            .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
        // Its opacity is set to 0: we don't see it by default.
        var tooltip = d3.select("#my_dataviz")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("color", "white")
            .style("border-radius", "5px")
            .style("padding", "10px")

        // A function that change this tooltip when the user hover a point.
        // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
        var showTooltip = function(d) {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 1)
            tooltip
                .html("Range: " + d.x0 + " - " + d.x1)
                .style("left", (d3.mouse(this)[0]+20) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
        }
        var moveTooltip = function(d) {
            tooltip
                .style("left", (d3.mouse(this)[0]+20) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
        }
        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        var hideTooltip = function(d) {
            tooltip
                .transition()
                .duration(100)
                .style("opacity", 0)
        }

        // append the bar rectangles to the svg element
        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")
            // Show tooltip on hover
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip )

    });
}

$(document).ready(function () {
    drawCircle()
    drawBars()
})

// Deleting a user
function deleteUserAjax(userId) {
    $.ajax({
        url: '/api/user/deleteUser/' + userId,
        type: 'delete'
    }); 
}

// Deleting a supplier
function deleteSupplierAjax(supplierId) {
    console.log("The supplier id is:" + supplierId);
    $.ajax({
        url: '/api/supplier/deleteSupplier/' + supplierId,
        type: 'delete'       
    });
}

// Deleting an item
function deleteItemAjax(itemId) {
    $.ajax({
        url: '/api/item/deleteItem/' + itemId,
        type: 'delete'
    });
}
// Deleting a warehouse
function deleteWarehouseAjax(warehouseId) {
    $.ajax({
        url: '/api/warehouse/deleteWarehouse/' + warehouseId,
        type: 'delete'
    });
}


// Updating a user
function updateUserAjax(userId, index) {
    
    // The relevant DATA to send in the req!
    fname= $('#firstNameEditUser' + index).val()
    lname= $('#lastNameEditUser' + index).val()
    email= $('#emailEditUser' + index).val()
    telephone= $('#phoneNumberEditUser' + index).val()
    city= $('#cityEditUser' + index).val()
    address= $('#addressEditUser' + index).val()
    postal= $('#postalEditUser' + index).val()
    
    errorDiv= '#invalidErrorEditUser'+ index

    console.log('#invalidErrorEditUser'+ index)
    
    if(UserValidation(fname, lname, telephone, email, city, address, postal, errorDiv))
    {
        console.log("The user id is:" + userId);
        console.log("The index is: " + index);
        let data = { updatedData: JSON.stringify({
                        fname: $('#firstNameEditUser' + index).val(),
                        lname: $('#lastNameEditUser' + index).val(),
                        email: $('#emailEditUser' + index).val(),
                        telephone: $('#phoneNumberEditUser' + index).val(),
                        city: $('#cityEditUser' + index).val(),
                        address: $('#addressEditUser' + index).val(),
                        postal: $('#postalEditUser' + index).val()        
                    })
            }
        $.ajax({
            url: '/api/user/updateUserById/' + userId,
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("user updated");
                // Adding render the file!
            }
        }); 

        $('#editUserModalForm' + index).modal('toggle');
    }       
}

// Updating a supplier
function updateSupplierAjax(supplierId, index) {
    cname =  $('#CNameEditSupplier' + index).val();
    email = $('#emailEditSupplier' + index).val();
    telephone = $('#phoneNumberEditSupplier' + index).val();
    
    errorDiv= '#invalidErrorEditSuppliers'+ index;

    if(SupplierValidation(cname,  telephone, email, errorDiv))
    {
        console.log("The supplier id is:" + supplierId);
        console.log("The index is: " + index);
        let data = { updatedData: JSON.stringify({
                        cname: $('#CNameEditSupplier' + index).val(),
                        email: $('#emailEditSupplier' + index).val(),
                        telephone: $('#phoneNumberEditSupplier' + index).val()
                    })
            }
        $.ajax({
            url: '/api/supplier/updateSupplierById/' + supplierId,
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("supplier updated");
                // Adding render the file!
            }
        }); 

        console.log($('#CNameEditSupplier' + index).val())

        $('#editSupplierModalForm' + index).modal('toggle');
    }
}

// Updating an item
function updateItemAjax(itemId, index) {
    
    title = $('#titleEditItem' + index).val();
    desc = $('#descEditItem' + index).val();
    kind = $('#kindEditItem' + index).val();
    price = $('#priceEditItem' + index).val();
    size = $('#sizeEditItem' + index).val();
    rating = $('#ratingEditItem' + index).val();
    image_url = $('#imgUrlEditItem' + index).val();
    company = $('#companyEditItem' + index).val();
    
    errorDiv= '#invalidErrorEditItem'+ index;

    if(ItemValidation(title, image_url, rating, desc, kind, price, size, company,  errorDiv))
    {
    
        console.log("The item id is:" + itemId);
        console.log("The index is: " + index);
        let data = { updatedData: JSON.stringify({
                        title: $('#titleEditItem' + index).val(),
                        description: $('#descEditItem' + index).val(),
                        kind: $('#kindEditItem' + index).val(),
                        price: $('#priceEditItem' + index).val(),
                        image_url: $('#imgUrlEditItem' + index).val(),
                        rating: $('#ratingEditItem' + index).val(),
                        size: $('#sizeEditItem' + index).val(),
                        company: $('#companyEditItem' + index) 
                    })
            }
        $.ajax({
            url: '/api/item/updateItemById/' + itemId,
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("item updated");
                // Adding render the file!
            }
        }); 

        console.log($('#titleEditItem' + index).val())
        console.log($('#priceEditItem' + index).val())
    
        $('#editItemModalForm' + index).modal('toggle');
    }
}

// Updating a Warehouse
function updateWarehouseAjax(warehouseId, index) {
    

    console.log($('#nameEditWarehouse' + index).val())
    console.log($('#houseNumberEditWarehouse' + index).val())
   
    wName = $('#nameEditWarehouse' + index).val();
    street = $('#streetEditWarehouse' + index).val();
    city = $('#cityEditWarehouse' + index).val();
    houseNumber = $('#houseNumberEditWarehouse' + index).val();
    lat = $('#latEditWarehouse' + index).val();
    lng = $('#lngEditWarehouse' + index).val();
    errorDiv = '#invalidErrorEditWarehouse' + index;
    
    if(WarehouseValidation(wName, street, city, houseNumber, lat, lng, errorDiv))
    {   
        console.log("The Warehouse id is:" + warehouseId);
        console.log("The index is: " + index);
        let data = { updatedData: JSON.stringify({
                    name: $('#nameEditWarehouse' + index).val(),
                    city: $('#cityEditWarehouse' + index).val(),
                    street: $('#streetEditWarehouse' + index).val(),
                    houseNumber: $('#houseNumberEditWarehouse' + index).val(),
                    lat: $('#latEditWarehouse' + index).val(),
                    lng: $('#lngEditWarehouse' + index).val()       
                })
            }
        $.ajax({
            url: '/api/warehouse/updateWarehouseById/' + warehouseId,
            type: 'post' ,
            dataType: 'json',
            data: data,
            success: function(res){
                console.log("warehouse updated");
            // Adding render the file!
            }
        }); 

        $('#editWarehouseModalForm' + index).modal('toggle');
        
    }       
    
    
}

// doesn't really work!!
function createWarehouseAjax() {
    let data = { updatedData: JSON.stringify({
                    name: $('#nameEditWarehouse').val(),
                    city: $('#cityEditWarehouse').val(),
                    street: $('#streetEditWarehouse').val(),
                    houseNumber: $('#houseNumberEditWarehouse').val(),
                    lat: $('#latEditWarehouse').val(),
                    lng: $('#lngEditWarehouse').val()
                })
        }
    $.ajax({
        url: '/api/warehouse/createWarehouse/' ,
        type: 'post' ,
        dataType: 'json',
        data: data,
        success: function(res){
            console.log("warehouse created");
            // Adding render the file!
        }
    }); 

    console.log($('#nameAddWarehouse').val())
    console.log($('#cityAddWarehouse').val())
    console.log($('#streetAddWarehouse').val())
    console.log($('#latAddWarehouse').val())
    console.log($('#lngAddWarehouse').val())
    
    $('#addWarehouseModalForm').modal('toggle');
}


// Validation
function UserValidation(fName, lName, phoneNumber, email, city, address, postal, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const PhoneStart = /(050|054|053|052)\d+/
    const emailRgx = /^[a-zA-Z0-9~#%\$\*+-\.!?]+@[a-zA-Z0-9~#%\$\*+-\.!?]+\.[a-zA-Z0-9~#%\$\*+-\.!?]+/
    
    const addressRgx = /^[A-Za-z]+\s[A-Za-z0-9\s]+$/

    if(fName == "")
    {
        $(errorDiv).text("Invalid input - First Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(fName))
    {
        $(errorDiv).text("Invalid input - First Name must have only letters and spaces");
        return false;
    }
    if(lName == "")
    {
        $(errorDiv).text("Invalid input - Last Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(lName))
    {
        $(errorDiv).text("Invalid input - Last Name must have only letters and spaces");
        return false;
    }
    if(phoneNumber == "")
    {
        $(errorDiv).text("Invalid input - Phone Number is required");
        return false;
    }
    else if(!onlyNumbers.test(phoneNumber))
    {
        $(errorDiv).text("Invalid input - Phone Number must have only numbers");
        return false;
    }
    else if(onlyNumbers.test(phoneNumber) && !PhoneStart.test(phoneNumber))
    {
        $(errorDiv).text("Invalid input - Phone Number must start with one of the following: 050/052/053/054");
        return false;
    }
    else if(onlyNumbers.test(phoneNumber) && PhoneStart.test(phoneNumber) && (phoneNumber.length != 10))
    {
        $(errorDiv).text("Invalid input - Phone Number must have 10 digits");
        return false;
    }
    if(email == "")
    {
        $(errorDiv).text("Invalid input - Email is required");
        return false;
    }
    else if(!emailRgx.test(email))
    {
        $(errorDiv).text("Invalid input - Email must contain @ and a .");
        return false;
    }
    if(address == "")
    {
        $(errorDiv).text("Invalid input - Address is required");
        return false;
    }
    else if(!addressRgx.test(address))
    {
        $(errorDiv).text("Invalid input - Address must start with letters and contains only letters and numbers");
        return false;
    }
    if(city == "")
    {
        $(errorDiv).text("Invalid input - City is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(city))
    {
        $(errorDiv).text("Invalid input - City must have only letters and spaces");
        return false;
    }
    if(postal == "")
    {
        $(errorDiv).text("Invalid input - Postal is required");
        return false;
    }
    else if(!onlyNumbers.test(postal))
    {
        $(errorDiv).text("Invalid input - Postal must have only numbers");
        return false;
    }
    else if((postal.length == 5) || (postal.length == 7 ) )
    {
        $(errorDiv).text("Invalid input - Postal must have 5 or 7 digits");
        return false;
    }
    else
    {
        $(errorDiv).text("");
        return true;
    }
}


function ItemValidation(title, image_url, rating, desc, kind, price, size, company,  errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const sizeRgx = /[0-9\.]+/
    const onlyLettersAndNumbers = /^[A-Za-z0-9\.\s]*$/
    
    if(title == "")
    {
        $(errorDiv).text("Invalid input - Title is required");
        return false;
    }
    else if(!onlyLettersAndNumbers.test(title))
    {
        $(errorDiv).text("Invalid input - Title must have only letters, numbers and spaces");
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
    if(rating == "")
    {
        $(errorDiv).text("Invalid input - Rating is required");
        return false;
    }
    else if (!onlyNumbers.test(rating))
    {
        $(errorDiv).text("Invalid input - Rating must have only numbers");
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

function SupplierValidation(cName,  phoneNumber, email, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const PhoneStart = /(050|054|053|052)\d+/
    const emailRgx = /^[a-zA-Z0-9~#%\$\*+-\.!?]+@[a-zA-Z0-9~#%\$\*+-\.!?]+\.[a-zA-Z0-9~#%\$\*+-\.!?]+/
    
    if(cName == "")
    {
        $(errorDiv).text("Invalid input - Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(cName))
    {
        $(errorDiv).text("Invalid input - Name must have only letters and spaces");
        return false;
    }
    if(phoneNumber == "")
    {
        $(errorDiv).text("Invalid input - Phone Number is required");
        return false;
    }
    else if(!onlyNumbers.test(phoneNumber))
    {
        $(errorDiv).text("Invalid input - Phone Number must have only numbers");
        return false;
    }
    else if(onlyNumbers.test(phoneNumber) && !PhoneStart.test(phoneNumber))
    {
        $(errorDiv).text("Invalid input - Phone Number must start with one of the following: 050/052/053/054");
        return false;
    }
    else if(onlyNumbers.test(phoneNumber) && PhoneStart.test(phoneNumber) && (phoneNumber.length != 10))
    {
        $(errorDiv).text("Invalid input - Phone Number must have 10 digits");
        return false;
    }
    if(email == "")
    {
        $(errorDiv).text("Invalid input - Email is required");
        return false;
    }
    else if(!emailRgx.test(email))
    {
        $(errorDiv).text("Invalid input - Email must contain @ and a .");
        return false;
    }
    else
    {
        $(errorDiv).text("");
        return true;
    }
}

function WarehouseValidation(name,  street, city, houseNumber, lat, lng, errorDiv){
    const onlyLettersAndSpaces = /^[A-Za-z\s]*$/
    const onlyNumbers = /[0-9]+/
    const coordinates = /^[-+]?[0-9]+$/
    
    if(name == "")
    {
        $(errorDiv).text("Invalid input - Warehouse Name is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(name))
    {
        $(errorDiv).text("Invalid input - Name must have only letters and spaces");
        return false;
    }
    if(street == "")
    {
        $(errorDiv).text("Invalid input - Warehouse street is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(street))
    {
        $(errorDiv).text("Invalid input - Street must have only letters and spaces");
        return false;
    }
    if(city == "")
    {
        $(errorDiv).text("Invalid input - Warehouse city is required");
        return false;
    }
    else if(!onlyLettersAndSpaces.test(city))
    {
        $(errorDiv).text("Invalid input - City must have only letters and spaces");
        return false;
    }
    
    if(houseNumber == "")
    {
        $(errorDiv).text("Invalid input - House Number is required");
        return false;
    }
    else if(!onlyNumbers.test(houseNumber))
    {
        $(errorDiv).text("Invalid input - house Number must have only numbers");
        return false;
    }
    if(lat == "")
    {
        $(errorDiv).text("Invalid input - Latitude is required");
        return false;
    }
    else if(!coordinates.test(lat))
    {
        $(errorDiv).text("Invalid input - Latitude must have only numbers and -+");
        return false;
    }
    if(lng == "")
    {
        $(errorDiv).text("Invalid input - Longitude is required");
        return false;
    }
    else if(!coordinates.test(lng))
    {
        $(errorDiv).text("Invalid input - Longitude must have only numbers -+");
        return false;
    }
   
    else
    {
        $(errorDiv).text("");
        return true;
    }
}


