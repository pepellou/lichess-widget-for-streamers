const db = {
	getObject: (key) => JSON.parse(localStorage.getItem(key)),
	saveObject: (key, obj) => {
		localStorage.setItem(key, JSON.stringify(obj));
	},
}
