import * as React from 'react'
import styled from 'styled-components'

const Input = styled.input`
	outline: none;
	vertical-align: bottom;
	height: 34px;
	width: 250px;
	padding: 0px 5px;
	border: none;
	background: #f0f0f0;
	&::-webkit-input-placeholder {
		color: #b0b0b0;
	}
	&:-moz-placeholder {
		color: #b0b0b0;
	}
	&::-moz-placeholder {
		color: #b0b0b0;
	}
	&:-ms-input-placeholder {
		color: #b0b0b0;
	}
`

const Wrapper = styled.div`
	display: inline-block;
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
		return (
			<Wrapper>
				{className
					? <input className={className} onChange={onChange} value={value} placeholder={plactholderText} />
					: <Input onChange={onChange} value={value} placeholder={plactholderText} />}
			</Wrapper>
		)
	}
}
