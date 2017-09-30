# draft-js-toolbar-link-plugin
This is a plugin for the `draft-js-plugins-editor`, basing on `draft-js-plugin-editor-toolbar-picker` and working together with `draft-js-static-toolbar-plugin`.

## Install

```bash
$ npm install draft-js-toolbar-link-plugin
```

## Usage

```js
import createToolbarLinkPlugin from 'draft-js-toolbar-link-plugin'

// Create plugin with an optional argument
const toolbarLinkPlugin = createToolbarLinkPlugin({
	/*
	Custom theme of input element
	inputTheme?: { wrapper: string, input: string }

	Custom placeholder text of input element
	inputPlaceholder?: string

	Custom theme of anchor element in link decorator
	linkTheme?: { anchor: string, anchorSelect: string }

	Target attrbute of anchor element, default value is `_blank`
	linkTarget?: string

	Custom input wrapper component, it does not take effect if `inputTheme` is set
	inputWrapperComponent?: React.Component

	Custom input component, it does not take effect if `inputTheme` is set
	inputComponent?: React.Component

	Custom anchor component, it does not take effect if `linkTheme` is set
	linkComponent?: React.Component
	*/
})
const { LinkButton } = toolbarLinkPlugin

// Use `LinkButton` in `draft-js-static-toolbar-plugin`
const toolbarPlugin = createToolbarPlugin({
	structure: [
		BoldButton,
		ItalicButton,
		UnderlineButton,
		CodeButton,
		LinkButton,   // Use `LinkButton` as an item button
		Separator,
		UnorderedListButton,
		OrderedListButton,
		BlockquoteButton,
		CodeBlockButton
	]
})
```

## License
MIT