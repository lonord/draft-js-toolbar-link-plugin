import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
`

export interface LinkUrlInputProps {
	onChange(event: React.SyntheticEvent<HTMLInputElement>)
	value: string
	placeholder?: string
	className?: string
}

export default class LinkUrlInput extends React.Component<LinkUrlInputProps, any> {
	render() {
		const { onChange, value, placeholder, className } = this.props
		const plactholderText = placeholder || 'Input url ...'
		return className
			? <input className={className} onChange={onChange} value={value} placeholder={plactholderText} />
			: <Input onChange={onChange} value={value} placeholder={plactholderText} />
	}
}
