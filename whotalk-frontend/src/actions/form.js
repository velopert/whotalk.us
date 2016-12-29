import FORM from './ActionTypes/form';
import { createAction } from 'redux-actions';

/*
    payload: {
        form,
        name,
        value
    }
*/
export const changeInput = createAction(FORM.CHANGE_INPUT);


/*
    payload: {
        form,
        name,
        error
    }
*/

export const setInputError = createAction(FORM.SET_INPUT_ERROR);

/* empty payload */
export const formReset = createAction(FORM.FORM_RESET);

export const resetError = createAction(FORM.ERROR_RESET);