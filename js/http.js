const LICHESS_API = 'https://lichess.org/api';

const FIVE_SECS = 5 * 1000;
const ONE_MIN = 60 * 1000;

let _requests = [ ];
let _request_timeout = FIVE_SECS;

const processRequest = function() {
	_request_timeout = FIVE_SECS;
	if (_requests.length > 0) {
		const query = _requests.shift();
		var xmlHttp = new XMLHttpRequest();
		const token = db.getObject('oauth2authcodepkce-state').accessToken.value;
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				if (xmlHttp.status == 200) {
					query.callback(xmlHttp.responseText);
				}
				if (xmlHttp.status == 429) {
					_request_timeout = ONE_MIN;
					_requests.unshift(query);
				}
			}
		}
		xmlHttp.open("GET", `${LICHESS_API}${query.endpoint}`, true); // true for asynchronous
		xmlHttp.setRequestHeader("Authorization", `Bearer ${token}`);
		xmlHttp.send(null);
	}
	setTimeout(processRequest, _request_timeout);
}

const http = {
	get: function(endpoint, callback) {
		_requests.push({
			endpoint: endpoint,
			callback: callback
		});
	}
}

processRequest();
