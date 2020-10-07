import React from 'react'
import AddItemForm from '../AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Add Item Form',
	component: AddItemForm,
}

export const AddItemFormExample = (props: any) => {
	return <AddItemForm addItem={action('Title add')} />
}
