$(document).ready(()=>{
    let usertype = getCookie("usertype")
    let userdata = getCookie("userdata")
    if (usertype === 'supplier') {
        window.location = '/supplier'
    }
    if (JSON.parse(userdata).isAdmin){
        $('#adminBtn').removeAttr('hidden');
    }

})
