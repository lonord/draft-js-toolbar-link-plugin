import debug from 'debug'
import decorateComponentWithProps from 'decorate-component-with-props'
import createPicker from 'draft-js-plugin-editor-toolbar-picker'
import * as React from 'react'

import { ContentBlock, EditorState } from 'draft-js'
import Link from './component/link'
import LinkSubMenu from './component/link-sub-menu'
import LinkTriggerButton from './component/link-trigger-button'
import { AnchorComponentClass, URLInputComponentClass, URLInputWrapperComponentClass } from './component/styled'
import { findLinkEntityRanges, isCurrentEntityLink } from './util/link-entity-util'

const d = debug('draft-js-toolbar-link-plugin:example')

interface PluginFunctions {
	setEditorState(editorState: EditorState)
	getEditorState(): EditorState
	getReadOnly(): boolean
}

export interface ToolbarLinkPluginOptions {
	inputTheme?: { wrapper: string, input: string }
	inputPlaceholder?: string
	inputWrapperComponent?: URLInputWrapperComponentClass
	inputComponent?: URLInputComponentClass
	linkTheme?: { anchor: string, anchorSelect: string }
	linkComponent?: AnchorComponentClass
	linkTarget?: string
}

export default function createToolbarLinkPlugin(options?: ToolbarLinkPluginOptions) {
	options = options || {}
	const { inputTheme, inputPlaceholder, inputComponent, inputWrapperComponent, linkTheme, linkComponent, linkTarget } = options

	let pluginFunctions: PluginFunctions

	const isLinkActive = () => {
		if (!pluginFunctions) {
			return false
		}
		return isCurrentEntityLink(pluginFunctions.getEditorState())
	}

	const LinkButton = createPicker({
		triggerItem: decorateComponentWithProps(LinkTriggerButton, { styleIsActive: isLinkActive }),
		items: [
			decorateComponentWithProps(LinkSubMenu, {
				theme: inputTheme,
				inputPlaceholder,
				inputComponent,
				wrapperComponent: inputWrapperComponent,
				...{ pluginFunctions }
			})
		]
	})

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
		if (pluginFunctions) {
			const getReadOnly = pluginFunctions.getReadOnly
			if ((!getReadOnly || !getReadOnly()) && (e.metaKey || e.ctrlKey)) {
				e.stopPropagation()
				e.preventDefault()
				window.open(url, linkTarget || 'blank')
			}
		}
	}

	return {
		initialize: (fns: PluginFunctions) => {
			pluginFunctions = fns
		},
		decorators: [{
			strategy: findLinkEntityRanges,
			component: decorateComponentWithProps(Link, {
				onClick: handleLinkClick,
				theme: linkTheme,
				anchorComponent: linkComponent,
				target: linkTarget
			})
		}],
		LinkButton
	}
}
