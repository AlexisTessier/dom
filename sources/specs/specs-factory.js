import assert from 'assert'
import {chain, map, replace, repeat, isPlainObject, isArray, isNull, forEach} from 'lodash'
import report from '@alexistessier/report'

export function specsErrorMessage(msg){
	return '\n/*\n'+msg+'\n*/\n';
};

export function specsValue(value){
	switch(typeof value){
		case 'boolean':
			return value ? 'true' : 'false';
		break;

		case 'string':
			return '"'+value+'"';
		break

		case 'function':
			return 'function '+value.name+'(){}';
		break;

		case 'object':
			if(isPlainObject(value) || isArray(value)){
				return JSON.stringify(value);
			}
			return isNull(value) ? 'null' : '[Object '+value.constructor.name+']';
		break;

		default:
		return value;
	}
};

export function specsFactory(name) {
	let specs = [];
	let draftCount = 0;
	let errorList = [];
	
	function wrap(func, log, assertionList){
		let _assert = function () {
			assertionList.push([func]);
			try{
				func(...arguments, log);
			}
			catch(e){
				errorList.push(e);
			}
			finally{
				return _assert;
			}
		}

		return _assert;
	}

	function wrapAssert(log, assertionList){
		let _assert = wrap(assert, log, assertionList);
		for(let key in assert){
			if(typeof assert[key] === 'function'){
				_assert[key] = wrap(assert[key], log, assertionList);
			}
		}

		return _assert;
	}

	let spec = description => {
		let assertionList = [];
		let sub = [];
		specs.push([description, sub, assertionList]);

		return wrapAssert(description, assertionList);
	}

	function isDraft(str){
		return str.indexOf('DRAFT') === 0;
	}

	spec.report = () => {
		let sep = '\n[Spec report] ';
		let err = null;
		
		if(errorList.length){
			report('error', chain(errorList).map(err => err.message).join(sep));
			err = errorList[0];
		}

		if(draftCount){
			report('warning', sep+'Still '+draftCount+' draft spec'+(draftCount > 1 ? 's' : '')+' not fully tested in '+name+'.');
		}

		forEach(specs, ([spec, subList, assertionList], number) => {
			if(assertionList.length === 0 && !isDraft(spec)){
				report('warning', sep+'Spec #'+(number+1)+' is not a draft but has no assertion defined.');
			}
		});

		return {
			test: ()=>{
				if(err) throw err;
			},
			all: ()=>specs
		};
	};

	spec.sub = description => {
		let last = specs.pop();
		let [spec, subList, assertionList] = last;

		subList.push(description);
		specs.push(last);

		return wrapAssert([spec, description].join(' => '), assertionList);
	}

	spec.draft = description => {
		spec('DRAFT : '+description);
		draftCount++;
	}

	return spec;
}