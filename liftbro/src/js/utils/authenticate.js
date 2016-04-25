import cookies from "cookies-js";

export let isLoggedIn = function() {
    console.log("called");
    return cookies.get('id') && cookies.get('token');
};
