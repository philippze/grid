
import {
	GRID_LOADING,
	GRID_BOX_EDIT,
} from '../actions/types';

export default function updateUI(state, action){
	switch (action.type) {
		case GRID_LOADING:
			return {
				...state,
				is_loading: action.payload.is_loading,
			};
			break;
		case GRID_BOX_EDIT:
			return {
				...state,
				edit_box: action.payload.box,
			}
		default:
			return state;
	}
}