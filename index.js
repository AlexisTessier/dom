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

dom.getStyle = function domGetStyle(el, ruleName) {
	return typeof ruleName === 'string' ? dom.getStyle(el)[ruleName] : window.getComputedStyle(el);
};

dom.getWidth = function domGetWidth(el) {
	return el.clientWidth || el.innerWidth;
};

dom.getHeight = function domGetHeight(el) {
	return el.clientHeight || el.innerHeight;
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

dom.addClass = function domAddClass(el, className) {
	el.classList ? el.classList.add(className) : (el.className += ' ' + className);
};

dom.removeClass = function domRemoveClass(el, className) {
	el.classList ? el.classList.remove(className) : (el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '));
};

dom.hasClass = function domHasClass(el, className) {
	return el.classList ? el.classList.contains(className) : (function () {
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	})();
}

dom.setClass = function domSetClass(el, className, add) {
	dom[add ? "addClass" : "removeClass"](el, className);
};

dom.toggleClass = function domToggleClass(el, className) {
	dom.setClass(el, className, !dom.hasClass(el, className));
};

dom.prependChild = function domPrependChild(parent, child) {
	parent.insertBefore(child, parent.firstChild);
};

dom.appendChild = function domAppendChild(parent, child) {
	parent.appendChild(child);
};

dom.clone = function domClone(el) {
	return el.cloneNode(true);
};

dom.contains = function domContains(parent, el) {
	return parent !== el && parent.contains(el);
};

dom.positionTop = function domPositionTop(el) {
	return el.offsetTop;
};

dom.positionLeft = function domPositionLeft(el) {
	return el.offsetLeft;
};

dom.position = function domPosition(el) {
	return {left: el.offsetLeft, top: el.offsetTop};
};

dom.offset = function domOffset(el) {
	return el.getBoundingClientRect();
};

dom.remove = function domRemove(el) {
	el.parentNode.removeChild(el);
},

module.exports = dom;