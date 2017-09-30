import * as React from 'react'
import { URLInput, URLInputComponentClass, URLInputWrapper, URLInputWrapperComponentClass } from './styled'

export interface LinkUrlInputProps {
	onChange(event: React.SyntheticEvent<HTMLInputElement>)
	value: string
	placeholder?: string
	theme?: { wrapper: string, input: string }
	wrapperComponent?: URLInputWrapperComponentClass
	inputComponent?: URLInputComponentClass
}

export default class LinkUrlInput extends React.Component<LinkUrlInputProps, any> {
	render() {
		const { onChange, value, placeholder, theme, wrapperComponent, inputComponent } = this.props
		const URLInputWrapperComp = wrapperComponent || URLInputWrapper
		const URLInputComp = inputComponent || URLInput
		const plactholderText = placeholder || 'Input url ...'
		return theme
			? <div className={theme.wrapper}>
				<input className={theme.input} onChange={onChange} value={value} placeholder={plactholderText} />
			</div>
			: <URLInputWrapperComp>
				<URLInputComp onChange={onChange} value={value} placeholder={plactholderText} />
			</URLInputWrapperComp>
	}
}
