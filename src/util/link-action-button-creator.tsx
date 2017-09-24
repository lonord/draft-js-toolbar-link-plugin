import * as React from 'react'
import styled from 'styled-components'

const Button = styled.button`
	${props => props.disabled
		? `
			cursor: not-allowed;
			opacity: 0.5;
		`
		: ''}
`

export interface ActionButtonProps {
	theme?: any
	onClick?(e: React.SyntheticEvent<HTMLButtonElement>)
	isDisabled?: boolean
}

export default ({ children }) => (
	class ActionButton extends React.Component<ActionButtonProps, any> {

		preventBubblingUp = (event) => { event.preventDefault() }

		handleClick = e => {
			const { onClick } = this.props
			onClick && onClick(e)
		}

		render() {
			const { theme, isDisabled } = this.props
			return (
				<div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
					<Button
						className={theme.button}
						onClick={this.handleClick}
						disabled={!!isDisabled}
						type="button"
						children={children}/>
				</div>
			)
		}
	}
)
