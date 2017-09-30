import * as React from 'react'

import { EditorState } from 'draft-js'
import { createOrUpdateLinkEntity, getCurrentEntityLinkUrl, removeLinkEntity } from '../util/link-entity-util'
import LinkCommitButton from './link-commit-button'
import LinkRemoveButton from './link-remove-button'
import LinkUrlInput from './link-url-input'
import { URLInputComponentClass, URLInputWrapperComponentClass } from './styled'

export interface LinkSubMenuProps {
	setEditorState?(editorState: EditorState)
	getEditorState?(): EditorState
	onPickerClose?()
	requestEditorFocus?()
	inputPlaceholder?: string
	urlInputTheme?: { wrapper: string, input: string }
	wrapperComponent?: URLInputWrapperComponentClass
	inputComponent?: URLInputComponentClass
}

export default class LinkSubMenu extends React.Component<LinkSubMenuProps, any> {

	componentDidMount() {
		const { getEditorState } = this.props
		if (getEditorState) {
			const url = getCurrentEntityLinkUrl(getEditorState()) || ''
			this.setState({
				inputValue: url
			})
		}
	}

	state = {
		inputValue: ''
	}

	handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		this.setState({
			inputValue: e.currentTarget.value
		})
	}

	handleCommitClick = () => {
		const { onPickerClose, setEditorState, getEditorState, requestEditorFocus } = this.props
		if (setEditorState && getEditorState) {
			setEditorState(createOrUpdateLinkEntity(getEditorState(), this.state.inputValue))
		}
		onPickerClose && onPickerClose()
		setTimeout(() => requestEditorFocus && requestEditorFocus(), 100)
	}

	handleRemoveClick = () => {
		const { onPickerClose, setEditorState, getEditorState, requestEditorFocus } = this.props
		if (setEditorState && getEditorState) {
			setEditorState(removeLinkEntity(getEditorState()))
		}
		onPickerClose && onPickerClose()
		setTimeout(() => requestEditorFocus && requestEditorFocus(), 100)
	}

	handleKeyboardInputDismiss = () => {
		const { onPickerClose, requestEditorFocus } = this.props
		onPickerClose && onPickerClose()
		requestEditorFocus && requestEditorFocus()
	}

	render() {
		const { urlInputTheme, inputPlaceholder, wrapperComponent, inputComponent, ...rest } = this.props
		return (
			<span>
				<LinkUrlInput
					value={this.state.inputValue}
					onChange={this.handleInputChange}
					onConfirm={this.handleCommitClick}
					onDismiss={this.handleKeyboardInputDismiss}
					placeholder={inputPlaceholder}
					theme={urlInputTheme}
					wrapperComponent={wrapperComponent}
					inputComponent={inputComponent}/>
				<LinkCommitButton isDisabled={!this.state.inputValue} onClick={this.handleCommitClick} {...rest} />
				<LinkRemoveButton onClick={this.handleRemoveClick} {...rest}/>
			</span>
		)
	}
}
