const api = {
	me: function(cb) {
		http.get('/account', cb);
	}
}
