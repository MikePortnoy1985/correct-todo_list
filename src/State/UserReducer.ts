type UserType = {
	name: string
	age: number
	childrenCount: number
}

type ActionType = {
	type: string
	[key:string]: any
}




export const userReducer = (state:UserType, action: ActionType) => {
	switch(action.type){
		case 'INCREMENT_AGE':
			return {...state, age: state.age + 1}
		case 'INCREMENT_CHILDREN':
			return {...state, childrenCount: state.childrenCount + 1}
		case 'CHANGE_NAME':
			return {...state, name: action.newName}
		default:
			throw new Error("I don't understand this action type")
	}
}


