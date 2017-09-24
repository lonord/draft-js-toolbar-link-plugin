import * as React from 'react'

import { createOrUpdateLinkEntity, getCurrentEntityLinkUrl, removeLinkEntity } from '../util/link-entity-util'
import LinkCommitButton from './link-commit-button'
import LinkRemoveButton from './link-remove-button'
import LinkUrlInput from './link-url-input'

export default class LinkSubMenu extends React.Component<any, any> {

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
		const { onPickerClose, setEditorState, getEditorState } = this.props
		if (setEditorState && getEditorState) {
			setEditorState(createOrUpdateLinkEntity(getEditorState(), this.state.inputValue))
		}
		onPickerClose && onPickerClose()
	}

	handleRemoveClick = () => {
		const { onPickerClose, setEditorState, getEditorState } = this.props
		if (setEditorState && getEditorState) {
			setEditorState(removeLinkEntity(getEditorState()))
		}
		onPickerClose && onPickerClose()
	}

	render() {
		const { overrideInputClass, overrideInputPlaceholder, ...rest } = this.props
		return (
			<span>
				<LinkUrlInput
					value={this.state.inputValue}
					onChange={this.handleInputChange}
					placeholder={overrideInputPlaceholder}
					className={overrideInputClass}/>
				<LinkCommitButton isDisabled={!this.state.inputValue} onClick={this.handleCommitClick} {...rest} />
				<LinkRemoveButton onClick={this.handleRemoveClick} {...rest}/>
			</span>
		)
	}
}
