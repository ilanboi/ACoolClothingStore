function readBody(xhr) {
    let data;
    if (!xhr.responseType || xhr.responseType === "text") {
        data = xhr.responseText;
    } else if (xhr.responseType === "document") {
        data = xhr.responseXML;
    } else {
        data = xhr.response;
    }
    return data;
}

function get_request(path) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log('ok')
        }
    }
    xhr.open('GET', path, false);
    xhr.send(null);
    return JSON.parse(readBody(xhr))

}
