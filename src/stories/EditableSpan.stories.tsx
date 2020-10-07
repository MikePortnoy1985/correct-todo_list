import React from 'react'
import EditableSpan from '../EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Editable Span',
	component: EditableSpan,
}

export const EditableSpanExample = (props: any) => {
	return <EditableSpan value={'StartValue'} onChange={action('Value Changed')} />
}
