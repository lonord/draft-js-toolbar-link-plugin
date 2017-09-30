import * as React from 'react'
import createActionButton, { ActionButtonProps } from '../util/link-action-button-creator'
import RemoveSvg from './svg/remove'

export default createActionButton({
	children: <RemoveSvg />
})

export {
	ActionButtonProps
}
