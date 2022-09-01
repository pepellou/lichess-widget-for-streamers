const LICHESS_API = 'https://lichess.org/api';

const http = {
	get: function(endpoint, callback) {
		var xmlHttp = new XMLHttpRequest();
		const token = db.getObject('oauth2authcodepkce-state').accessToken.value;
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
				callback(xmlHttp.responseText);
		}
		xmlHttp.open("GET", `${LICHESS_API}${endpoint}`, true); // true for asynchronous
		xmlHttp.setRequestHeader("Authorization", `Bearer ${token}`);
		xmlHttp.send(null);
	}
}
