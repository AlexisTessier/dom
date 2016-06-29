import {
	specsFactory,
	specsValue,
	specsErrorMessage
} from '../specs-factory'

import {
	dom
} from '../world'

export default function storyBasicUsage() {

let spec = specsFactory('basic usage');

/*---------------*/

spec('dom must have a ready method');

/*---------------*/

	return spec.report();
}