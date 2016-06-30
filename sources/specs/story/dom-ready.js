import {
	specsFactory,
	specsValue,
	specsErrorMessage
} from '../specs-factory'

import {
	dom
} from '../world'

import {
	forEach,
	isFunction
} from 'lodash'

export default function storyDomReady() {

let spec = specsFactory('dom ready');

/*---------------*/

spec('dom must have a ready method')
(isFunction(dom.ready));

spec(`dom ready method accept a callback function`)
/*((success=>{
	let functionCount = 0;
	let calledFunctionCount = 0;
	let func = function() {calledFunctionCount++;}

	let parametersList = [
		{count:1, args:[func]},
		{count:2, args:[func, func]},
		{count:3, args:[func, func, func]},
		{count:5, args:[func, [func, func, func], func]},
		{count:9, args:[func, [func, func, func], [func], [func, func, [func, func]]]}
	];

	forEach(parametersList, ({count, args}) => {
		functionCount += count;
		dom.ready(...args);
	});

	return functionCount === calledFunctionCount;
})());*/
/*---------------*/

	return spec.report();
}