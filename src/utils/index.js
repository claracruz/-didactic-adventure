export function orderArrayOfObjectsByProp (arr, prop) {
	return arr.sort((a, b) => b[prop] - a[prop]);
}

export function getItemFromArrayById (arr, id) {
	return arr.filter((item) => item.id === id)[0];
}
