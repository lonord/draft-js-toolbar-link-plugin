import debug from 'debug'
import decorateComponentWithProps from 'decorate-component-with-props'
import createPicker from 'draft-js-plugin-editor-toolbar-picker'
import * as React from 'react'

import { EditorState } from 'draft-js'
import LinkSubMenu from './component/link-sub-menu'
import LinkTriggerButton from './component/link-trigger-button'
import { isCurrentEntityLink } from './util/link-entity-util'

const d = debug('draft-js-toolbar-link-plugin:example')

interface PluginFunctions {
	setEditorState(editorState: EditorState)
	getEditorState(): EditorState
}

export interface ToolbarLinkPluginOptions {
	overrideInputClass?: string
	overrideInputPlaceholder?: string
}

export default function createToolbarLinkPlugin(options?: ToolbarLinkPluginOptions) {
	options = options || {}
	const { overrideInputClass, overrideInputPlaceholder } = options

	let pluginFunctions: PluginFunctions

	const isLinkActive = () => {
		if (!pluginFunctions) {
			return false
		}
		return isCurrentEntityLink(pluginFunctions.getEditorState())
	}

	const Link = createPicker({
		triggerItem: decorateComponentWithProps(LinkTriggerButton, { styleIsActive: isLinkActive }),
		items: [
			decorateComponentWithProps(LinkSubMenu, {
				overrideInputClass,
				overrideInputPlaceholder,
				...{ pluginFunctions }
			})
		]
	})

	return {
		initialize: (fns: PluginFunctions) => {
			pluginFunctions = fns
		},
		Link
	}
}
