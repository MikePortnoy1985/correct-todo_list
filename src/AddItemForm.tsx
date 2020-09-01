import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField, IconButton } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
	let [title, setTitle] = useState<string>('')
	let [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addTask()
		}
	}

	const addTask = () => {
		if (title.trim()) {
			props.addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required!!!')
		}
	}

	return (
		<div>
			<TextField
				variant={'filled'}
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				helperText={error}
				label={'Title'}
			/>
			<IconButton  color={'primary'} onClick={addTask}>
				<AddBox/>
			</IconButton>
		</div>
	)
}

export default AddItemForm
