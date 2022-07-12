import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const initialState = {
	view: window.location.hash.slice(1),
	users: [],
	things: []
};

const viewReducer = (state = window.location.hash.slice(1), action) => {
	if (action.type === 'SET_VIEW') {
		return action.view;
	}
	return state;
};

const usersReducer = (state = [], action) => {
	if (action.type === 'SET_USERS') {
		return action.users;
	}
	if (action.type === 'DELETE_USER') {
		const newUsers = state.users.filter(user => user.id !== action.userId);
		return newUsers;
	}
	return state;
};

const thingsReducer = (state = [], action) => {
	if (action.type === 'SET_THINGS') {
		return action.things;
	}
	if (action.type === 'CREATE_THING') {
		return [...state.things, action.thing];
	}
	if (action.type === 'DELETE_THING') {
		const newThings = state.things.filter(item => item.id !== action.thingId);
		return newThings;
	}
	if (action.type === 'CHANGE_RANK') {
		const thingArr = state.things.filter(item => item.id !== action.thingId);
		return { ...state, things: [...thingArr, action.updatedThing] };
	}
	return state;
};

const reducer = combineReducers({
	users: usersReducer,
	things: thingsReducer,
	view: viewReducer
});

const store = createStore(reducer, applyMiddleware(logger));

export default store;

