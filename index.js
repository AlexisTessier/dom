var _ = require('lodash');
var dom = {};

dom.ready = function domReady(callback) {
	if (document.readyState != 'loading'){
		callback();
	}
	else {
		document.addEventListener('DOMContentLoaded', callback);
	}
};

dom.getData = function domGetData(node, key) {
	var dataValue = typeof node.dataset === 'object' ? node.dataset[_.camelCase(key)] : (function () {
		return node.getAttribute(_.kebabCase('data-'+key));
	})();

	return dataValue;
};

dom.setData = function domSetData(node, key, value) {
	typeof node.dataset === 'object' ? node.dataset[_.camelCase(key)] = value : (function () {
		node.setAttribute(_.kebabCase('data-'+key), value);
	})();
};

dom.selectById = function domSelectById(id) {
	return document.getElementById(id);
};

dom.select = function domSelect(selector) {
	return document.querySelectorAll(selector);
};

dom.selectOne = function domSelectOne(selector) {
	return document.querySelector(selector);
};

dom.forEach = function domForEach(nodeList, block) {
	for(var i = 0, imax = nodeList.length;i<imax;i++){
		block(nodeList.item(i), i);
	}
};

dom.getStyle = function domGetStyle(element) {
	return typeof window.getComputedStyle === 'function' ? window.getComputedStyle(element) : {
		content : ""
	};
};

dom.getWidth = function domGetWidth(element) {
	return element.clientWidth || element.innerWidth;
};

dom.getHeight = function domGetHeight(element) {
	return element.clientHeight || element.innerHeight;
};

dom.createNode = function domCreateContainer(tag, classList) {
	var classList = typeof classList === "string" ? [classList] : classList,

		node = document.createElement(tag);

	for(var i=0, imax=classList.length;i<imax;i++){
		dom.addClass(node, classList[i]);
	}

	return node;
};

dom.createDiv = function domCreateDiv(classList) {
	return dom.createNode('div', classList);
};

dom.createSpan = function domCreateDiv(classList) {
	return dom.createNode('span', classList);
};

dom.addClass = function domAddClass(element, className) {
	element.classList ? element.classList.add(className) : (element.className += ' ' + className);
};

dom.removeClass = function domRemoveClass(element, className) {
	element.classList ? element.classList.remove(className) : (element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '));
};

dom.hasClass = function domHasClass(element, className) {
	return element.classList ? element.classList.contains(className) : (function () {
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
	})();
}

dom.toggleClass = function domToggleClass(element, className) {
	dom[dom.hasClass(element, className) ? "removeClass" : "addClass"](element, className);
};

dom.prependChild = function domPrependChild(parent, child) {
	parent.insertBefore(child, parent.firstChild);
};

module.exports = dom;