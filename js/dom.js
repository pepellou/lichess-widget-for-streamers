const onPageLoad = (callback) => {
	document.addEventListener("DOMContentLoaded", callback);
};

function DomElement(element) {
	this.element = element;

	this.addEventListener = (event, callback) => {
		this.element.addEventListener(event, callback);
	};

	this.onClick = (callback) => this.addEventListener('click', callback);

	this.content = (html) => {
		if (html) {
			this.element.innerHTML = html;
		}
		return this.element.innerHTML;
	};

	return this;
}

const getById = (id) => new DomElement(document.getElementById(id));
