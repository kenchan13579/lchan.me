export let jsonToUrlParams = function(json) {
	return Object.keys(json).map((k, i) => {
		if (json[k] instanceof Array) {
			return json[k].map((v, i) => `${k}=${v}`).join("&"); 
		}
		return `${k}=${json[k]}`;	
	}).join("&");
}