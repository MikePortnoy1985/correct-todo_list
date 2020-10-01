import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@material-ui/core'

type EditableSpanPropsType = {
	value: string
	onChange: (value: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
	console.log('span')
	let [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState(props.value)

	const activatedEditMode = () => {
		setEditMode(true)
		setTitle(props.value)
	}

	const deactivatedEditMode = () => {
		setEditMode(false)
		props.onChange(title)
	}

	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return editMode ? (
		<TextField
			variant={'outlined'}
			value={title}
			onBlur={deactivatedEditMode}
			autoFocus={true}
			onChange={onChangeTitle}
		/>
	) : (
		<span onDoubleClick={activatedEditMode}>{props.value}</span>
	)
})

export default EditableSpan
