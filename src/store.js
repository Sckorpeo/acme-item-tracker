import { createStore } from 'redux';

const initialState = {
	view: window.location.hash.slice(1),
	users: [],
	things: []
};

const store = createStore((state = initialState, action) => {
	if (action.type === 'SET_THINGS') {
		return { ...state, things: action.things };
	}
	if (action.type === 'SET_USERS') {
		return { ...state, users: action.users };
	}
	if (action.type === 'SET_VIEW') {
		return { ...state, view: action.view };
	}
	if (action.type === 'CREATE_THING') {
		return { ...state, things: [...state.things, action.thing] };
	}
	if (action.type === 'DELETE_THING') {
		const newThings = state.things.filter(item => item.id !== action.thingId);
		return { ...state, things: newThings };
	}
	if (action.type === 'DELETE_USER') {
		const newUsers = state.users.filter(user => user.id !== action.userId);
		return { ...state, users: newUsers };
	}
	if (action.type === 'CHANGE_RANK') {
		const thingArr = state.things.filter(item => item.id !== action.thingId);
		return { ...state, things: [...thingArr, action.updatedThing] };
	}
	return state;
});

export default store;

