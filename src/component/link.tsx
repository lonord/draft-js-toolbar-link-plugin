import { ContentState } from 'draft-js'
import * as React from 'react'
import { Anchor as DefaultAnchor, AnchorComponentClass } from './styled'

export interface LinkProps {
	onClick?(e: React.MouseEvent<HTMLAnchorElement>, url: string)
	theme?: { anchor: string, anchorSelect: string }
	target?: string
	anchorComponent?: AnchorComponentClass
	contentState: ContentState
	entityKey: string
	children: React.ReactNode
}

export default class Link extends React.Component<LinkProps, any> {

	state = {
		selected: false
	}

	handleKeyDown = (e: any) => {
		const event = e as React.KeyboardEvent<HTMLAnchorElement>
		if (event.keyCode === 91 || event.keyCode === 17) {
			this.setState({
				selected: true
			})
		}
	}

	handleKeyUp = () => {
		this.setState({
			selected: false
		})
	}

	componentDidMount() {
		window.document.addEventListener('keydown', this.handleKeyDown)
		window.document.addEventListener('keyup', this.handleKeyUp)
	}

	componentWillUnmount() {
		window.document.removeEventListener('keydown', this.handleKeyDown)
		window.document.removeEventListener('keyup', this.handleKeyUp)
	}

	render() {
		const { children, contentState, entityKey, onClick, theme, anchorComponent, target } = this.props
		const { selected } = this.state
		const AnchorComp = anchorComponent || DefaultAnchor
		const entity = contentState.getEntity(entityKey)
		const url = entity && entity.getData().url || ''
		return theme
			? <a href={url} target={target || '_blank'}
				onClick={e => onClick && onClick(e, url)}
				className={theme.anchor + (selected ? ' ' + theme.anchorSelect : '')}>{children}</a>
			: <AnchorComp href={url} target={target || '_blank'}
				onClick={e => onClick && onClick(e, url)}
				modifierKeyDown={selected}>{children}</AnchorComp>
	}
}
