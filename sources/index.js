let dom = {};

import {
	isArray,
	isNumber,
	isString
} from 'lodash'

/*---------------*/

export function domReady(callback){
	if (document.readyState != 'loading'){
		callback();
	}
	else {
		document.addEventListener('DOMContentLoaded', callback);
	}
}

dom.ready = domReady;

/*---------------*/

export function domGetById(id) {
	return document.getElementById(id);
}

dom.getById = domGetById;

export function domGet(selector, parent = document) {
	return parent.querySelector(selector);
}

dom.get = domGet;

export function domGetAll(selector, parent = document) {
	return parent.querySelectorAll(selector);
}

dom.getAll = domGetAll;

/*---------------*/

export function domForEach(nodeList, block) {
	if(nodeList instanceof NodeList){
		for(let i = 0, imax = nodeList.length;i<imax;i++){
			block(nodeList.item(i), i);
		}
		return null
	}
	if(isString(nodeList)){
		dom.forEach(dom.getAll(nodeList), block);
		return null;
	}
	if(isArray(nodeList)){
		for(let i = 0, imax = nodeList.length;i<imax;i++){
			block(nodeList[i], i);
		}
		return null;
	}
	if(nodeList){
		block(nodeList, 0);
	}
};

dom.forEach = domForEach;

/*---------------*/

function forEachWrap(func){
	return function(el) {
		if(el instanceof NodeList || isArray(el)){
			dom.forEach(el, e=>{
				func(...arguments);
			});
		}
		else{
			func(...arguments);
		}
	}
}

function getAllWrap(func){
	return function(...args) {
		let el = args.shift();
		if(isString(el)){
			let all = dom.getAll();
			func(all, ...args);
		}
		else{
			func(el, ...args);
		}
	}
}

function wrap(func){
	return getAllWrap(forEachWrap(func));
}

export let domAddClass = wrap(function domAddClass(el, className) {
	el.classList ? el.classList.add(className) : (el.className += ' ' + className);
});

dom.addClass = domAddClass;

/*---------------*/

export let domRemoveClass = wrap(function domRemoveClass(el, className) {
	el.classList ? el.classList.remove(className) : (el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '));
});

dom.removeClass = domRemoveClass;

/*---------------*/

export function domHasClass(el, className) {
	return el.classList ? el.classList.contains(className) : (function () {
		return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	})();
}

dom.hasClass = domHasClass;

/*---------------*/

export let domSetClass = wrap(function domSetClass(el, className, add) {
	dom[add ? "addClass" : "removeClass"](el, className);
});

dom.setClass = domSetClass;

/*---------------*/

export let domToggleClass = wrap(function domToggleClass(el, className) {
	dom.setClass(el, className, !dom.hasClass(el, className));
});

dom.toggleClass = domToggleClass;

/*----------------*/

export function domGetData(node, key) {
	var dataValue = typeof node.dataset === 'object' ? node.dataset[_.camelCase(key)] : (function () {
		return node.getAttribute(_.kebabCase('data-'+key));
	})();

	return dataValue;
};

dom.getData = domGetData;

/*----------------*/

export let domSetData = wrap(function domSetData(node, key, value) {
	typeof node.dataset === 'object' ? node.dataset[_.camelCase(key)] = value : (function () {
		node.setAttribute(_.kebabCase('data-'+key), value);
	})();
});

dom.setData = domSetData;

/*----------------*/

export function domCreate(tag = 'div', id = null, classList = null) {
	let idIndex = tag.indexOf('#');
	let classIndex = tag.indexOf('.');
	if(idIndex >= 0 || classIndex >= 0){
		let _tag = tag.substring(0, Math.min(idIndex, classIndex));
		let meta = tag.substring(_tag.length);
		let _id = id || null;
		let _classList = isArray(classList) ? classList : [];

		while(meta.length > 0){
			let type = meta.charAt(0);
			let next = Math.max(meta.indexOf('.'), meta.indexOf('#'));
			meta = meta.substring(1);
			next--;
			switch(type){
				case '#':
					_id = meta.substring(0, (next >= 0 ? next : undefined));
				break;

				case '.':
					_classList.push(meta.substring(0, (next >= 0 ? next : undefined)));
				break;

				default:
				break;
			}
			meta = type ? meta.substring((next >= 0 ? next : 0)) : meta;
			type = null;
		}

		return domCreateContainer(_tag, _id, _classList);
	}

	classList = typeof classList === "string" ? [classList] : classList;
	let node = document.createElement(tag);

	if (isArray(classList)) {
		for(var i=0, imax=classList.length;i<imax;i++){
			dom.addClass(node, classList[i]);
		}
	}

	return node;
};

dom.create = domCreate;

/*--------------*/

export function domPrependChild(parent, child) {
	parent.insertBefore(child, parent.firstChild);
};

dom.prependChild = domPrependChild;

/*--------------*/

export function domInsertChild(parent, child, target = (parent.children.length-1)) {
	target = isNumber(target) ? parent.children[target] : target;
	parent.insertBefore(child, target);
};

dom.insertChild = domInsertChild;

/*----------------*/

export function domAppendChild(parent, child) {
	parent.appendChild(child);
};

dom.appendChild = domAppendChild;

/*--------------*/

export function domClone(el) {
	return el.cloneNode(true);
};

dom.clone = domClone;

export let domRemove = wrap(function domRemove(el) {
	el.parentNode.removeChild(el);
});

dom.remove = domRemove;

/*--------------*/

export function domContains(parent, el) {
	return parent !== el && parent.contains(el);
};

dom.contains = domContains;

/*--------------*/

export function domToArray(nodeList){
	if(isArray(nodeList)){return nodeList;}

	let list = [];
	dom.forEach(nodeList, node => {
		list.push(node);
	});
	return list;
}

dom.toArray = domToArray;

/*---------*/

export function domComputedStyle(el, ruleName) {
	return typeof ruleName === 'string' ? dom.getStyle(el)[ruleName] : window.getComputedStyle(el);
};

dom.computedStyle = domComputedStyle;

/*---------*/

export function domWidth(el) {
	return el.clientWidth || el.innerWidth;
};

dom.width = domWidth;

/*---------*/

export function domHeight(el) {
	return el.clientHeight || el.innerHeight;
};

dom.height = domHeight;

/*---------*/

export function domOuterWidthWithMargin(el) {
  let width = el.offsetWidth;
  let style = window.getComputedStyle(el);

  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}

dom.outerWidthWithMargin = domOuterWidthWithMargin;

/*---------*/

export function domOuterWidth(el, flag = '') {
	if(flag === 'margin'){
		return dom.outerWidthWithMargin(el);
	}

	return el.offsetWidth;
};

dom.outerWidth = domOuterWidth;

/*---------*/

export function domOuterHeightWithMargin(el) {
  let height = el.offsetHeight;
  let style = window.getComputedStyle(el);

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}

dom.outerHeightWithMargin = domOuterHeightWithMargin;

/*---------*/

export function domOuterHeight(el, flag = '') {
	if(flag === 'margin'){
		return dom.outerHeightWithMargin(el);
	}

	return el.offsetHeight;
};

dom.outerHeight = domOuterHeight;

/*---------*/

export function domOffsetParent(el){
	return el.offsetParent || el;
}

dom.offsetParent = domOffsetParent;

/*---------*/

export function domOffset(el) {
	return {left: el.offsetLeft, top: el.offsetTop};
};

dom.offset = domOffset;

/*---------*/

export function domPositionTop(el) {
	return el.getBoundingClientRect().top + document.body.scrollTop;
};

dom.positionTop = domPositionTop;

/*---------*/

export function domPositionLeft(el) {
	return el.getBoundingClientRect().left + document.body.scrollLeft;
};

dom.positionLeft = domPositionLeft;

/*---------*/

export function domPosition(el) {
	var rect = el.getBoundingClientRect();

	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	}
};

dom.position = domPosition;

/*---------*/

export function domViewportPosition(el) {
	return el.getBoundingClientRect();
};

dom.viewportPosition = domViewportPosition;

export default dom;