$(document).ready(()=>{
    let usertype = getCookie("usertype")
    if (usertype === 'supplier') {
        window.location = '/supplier'
    }

})
