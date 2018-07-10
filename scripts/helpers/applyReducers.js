
export default function applyReducers(reducers, object) {
	return reducers.reduce(
		(object, reducer) => reducer(object),
		object
	);
}
