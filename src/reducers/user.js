import { USER_LOGGED_IN } from "../types";

export default function user( state = {}, action = {}) {
	switch ( action.type ) {
		case USER_LOGGED_IN:
		// return new state action.user if action type is USER_LOGGED_IN
		return action.user;
		default: return state;
	}
}
