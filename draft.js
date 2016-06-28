import {
	isArray
} from "lodash";

let dom = {};

dom.ready = function domReady(callback) {
	if (document.readyState != 'loading'){
		callback();
	}
	else {
		document.addEventListener('DOMContentLoaded', callback);
	}
}

dom.getById = function domGetById(id) {
	return document.getElementById(id);
}

dom.get = function(selector, node = document) {
	return node.querySelector(selector);
}

dom.getAll = function(selector, node = document) {
	return node.querySelectorAll(selector);
}

dom.forEach = function domForEach(nodeList, block) {
	for(var i = 0, imax = nodeList.length;i<imax;i++){
		block(nodeList.item(i), i);
	}
}

dom.chain.getAll('.truc').filter('.to-ignore').addClass('.to-ignore').nodeList;

dom.chain.get('.selector').getAll('.descendant').forEach((node, index) => {
	dom(node).get('');
	//or
	dom.chain(node).get('');
});
dom.chain(node).get('.descendant').node.innerHTML;
dom.chain(node).getAll('.descendant').nodeList;

/*-----------*/

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

/*------------------*/

/*dom.create('div#mydivId.hellodiv')*/
dom.create = function domCreateContainer(tag, id, classList) {
	let classList = typeof classList === "string" ? [classList] : classList;
	let node = document.createElement(tag);

	if (isArray(classList)) {
		for(var i=0, imax=classList.length;i<imax;i++){
			dom.addClass(node, classList[i]);
		}
	}

	return node;
};

//after
//el.insertAdjacentHTML('afterend', htmlString);

//before
//el.insertAdjacentHTML('beforebegin', htmlString);

dom.prependChild = function domPrependChild(parent, child) {
	parent.insertBefore(child, parent.firstChild);
};

dom.appendChild = function domAppendChild(parent, child) {
	parent.appendChild(child);
};

dom.insertBefore(node, target){
	target.parent.insertBefore(node, target);
}

dom.insertAfter(node, target){
	target.parent.insertBefore(node, dom.next(target));
}

dom.clone = function domClone(el) {
	return el.cloneNode(true);
};

dom.remove = function domRemove(el) {
	el.parentNode.removeChild(el);
},

/*--------------*/

//index

//parent

//children
//el.children

//next

//prev

//siblings

//filter

//not

//is => el === node
//var matches = function(el, selector) {
//  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
//};

matches(el, '.my-class');

dom.contains = function domContains(parent, el) {
	return parent !== el && parent.contains(el);
};

//toArray

/*---------*/

//on

//off

/*---------*/

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

//getAttribute

//setAttribute

dom.computedStyle = function domGetStyle(el, ruleName) {
	return typeof ruleName === 'string' ? dom.getStyle(el)[ruleName] : window.getComputedStyle(el);
};

dom.width = function domGetWidth(el) {
	return el.clientWidth || el.innerWidth;
};

dom.height = function domGetHeight(el) {
	return el.clientHeight || el.innerHeight;
};

//outerWidth
//outerHeight

dom.positionTop = function domPositionTop(el) {
	return el.offsetTop;
};

dom.positionLeft = function domPositionLeft(el) {
	return el.offsetLeft;
};

dom.position = function domPosition(el) {
	return {left: el.offsetLeft, top: el.offsetTop};
};

dom.viewportPosition = function domOffset(el) {
	return el.getBoundingClientRect();
};