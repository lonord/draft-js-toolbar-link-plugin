import * as React from 'react'
import { URLInput, URLInputComponentClass, URLInputWrapper, URLInputWrapperComponentClass } from './styled'

export interface LinkUrlInputProps {
	onChange(event: React.SyntheticEvent<HTMLInputElement>)
	onConfirm?()
	onDismiss?()
	value: string
	placeholder?: string
	theme?: { wrapper: string, input: string }
	wrapperComponent?: URLInputWrapperComponentClass
	inputComponent?: URLInputComponentClass
}

export default class LinkUrlInput extends React.Component<LinkUrlInputProps, any> {

	editor: HTMLInputElement

	handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { onConfirm, onDismiss, value } = this.props
		if (e.keyCode === 13 && onConfirm && value) {
			e.preventDefault()
			e.stopPropagation()
			onConfirm()
		} else if (e.keyCode === 27 && onDismiss) {
			e.preventDefault()
			e.stopPropagation()
			onDismiss()
		}
	}

	componentDidMount() {
		setTimeout(() => this.editor && this.editor.focus(), 100)
	}

	render() {
		const { onChange, value, placeholder, theme, wrapperComponent, inputComponent } = this.props
		const URLInputWrapperComp = wrapperComponent || URLInputWrapper
		const URLInputComp = inputComponent || URLInput
		const plactholderText = placeholder || 'Input url ...'
		return theme
			? <div className={theme.wrapper}>
				<input ref={ref => this.editor = ref}
					className={theme.input}
					onKeyDown={this.handleKeyDown}
					onChange={onChange}
					value={value}
					placeholder={plactholderText} />
			</div>
			: <URLInputWrapperComp>
				<URLInputComp
					innerRef={ref => this.editor = ref}
					onKeyDown={this.handleKeyDown}
					onChange={onChange}
					value={value}
					placeholder={plactholderText} />
			</URLInputWrapperComp>
	}
}
