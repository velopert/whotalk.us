/*
    Creates $NAME_INIT, $NAME_SUCESS, $NAME_FAILURE actions
    accessed by $NAME.$STATE, e.g. FETCH_MESSAGE.REQUEST
*/

const INIT = 'INIT'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export default function createRequestTypes(base) {
  return [INIT, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}