import * as React from 'react'
import unionClassNames from 'union-class-names'
import LinkSvg from './svg/link'

export interface LinkTriggerButtonProps {
	theme: any
	onClick(e: React.SyntheticEvent<any>)
	children: JSX.Element
	styleIsActive?(): boolean
}

export default class LinkTriggerButton extends React.Component<LinkTriggerButtonProps, any> {

	preventBubblingUp = (event) => { event.preventDefault() }

	render() {
		const { theme, onClick, styleIsActive, children } = this.props
		const className = (styleIsActive && styleIsActive())
			? unionClassNames(theme.button, theme.active)
			: theme.button
		return (
			<div className={theme.buttonWrapper}
				onMouseDown={this.preventBubblingUp} >
				<button className={className} onClick={onClick} type="button">
					<LinkSvg/>
				</button>
			</div>
		)
	}
}
