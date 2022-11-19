const getAllCheckedFilters = () => {
    let kind = publicKind
    let sizes = getAllSizesFilters()
    let companies = getAllCompaniesFilters()
    let prices = getAllPricesFilters()
    socket.emit("filteredRequest", {kind, sizes, companies, prices})

};

const getAllSizesFilters = () => {
    let selected = [];
    $('#listAllSizeFilters input:checked').each(function () {
        selected.push($("label[for='" + $(this).attr('id') + "']").text());
    });
    let sizes = []
    for (let size of selected) {
        sizes.push({
            "size": size
        })
    }
    return sizes
};

const getAllCompaniesFilters = () => {
    let selected = [];
    $('#listAllCompaniesFilters input:checked').each(function () {
        selected.push($("label[for='" + $(this).attr('id') + "']").text());
    });
    let companies = []
    for (let company of selected) {
        companies.push({
            "company": company
        })
    }
    return companies
};

const getAllPricesFilters = () => {
    let selected = [];
    $('#listAllPricesFilters input:checked').each(function () {
        selected.push($("label[for='" + $(this).attr('id') + "']").text());
    });
    let prices = []
    for (let val of selected) {
        console.log(val)
        if (val.startsWith('less then')) {
            prices.push({
                "price": {$lte: parseInt(val.replace('less then ', ''))}
            })
        }
        if (val.startsWith('between')) {
            let pricesRange = val.replace('between ', '').replace(" ", '').split('and');
            prices.push({
                "price": {$gte: parseInt(pricesRange[0]), $lte: parseInt(pricesRange[1])}
            })
        }
        if (val.startsWith('greater then')) {
            prices.push({
                "price": {$gte: parseInt(val.replace('greater then ', ''))}
            })
        }
    }
    return prices
};

//{ $gte:req.query.priceMin, $lte: req.query.priceMax }
$(document).ready(function () {

    $('#submitAllFilters').on('click', () => {
        const checkedItems = getAllCheckedFilters()
        console.log(checkedItems)
    })
})