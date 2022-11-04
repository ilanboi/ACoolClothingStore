const userDataCookieName = "userdata";
const userTypeCookieName = "usertype";

function addToCookies(cookie_key, cookie_val, exp) {
    document.cookie = `${cookie_key}=${cookie_val}; expires=${exp}; path=/;`;
}

function deleteCookie(cookie_key) {
    document.cookie = `${cookie_key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function getCookie(cookie_key) {
    let name = cookie_key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function addYears(date, years) {
    date.setFullYear(date.getFullYear() + years);
    return date;
}


