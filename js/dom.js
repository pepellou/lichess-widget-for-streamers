const onPageLoad = (callback) => {
	document.addEventListener("DOMContentLoaded", callback);
};

function DomElement(element) {
	this.element = element;

	this.addEventListener = (event, callback) => {
		this.element.addEventListener(event, callback);
	};

	this.onClick = (callback) => this.addEventListener('click', callback);

	return this;
}

const getById = (id) => new DomElement(document.getElementById(id));
