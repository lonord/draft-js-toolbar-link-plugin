import 'babel-polyfill'

import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'normalize.css'

import debug from 'debug'
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import {
	BlockquoteButton,
	BoldButton,
	CodeBlockButton,
	CodeButton,
	HeadlineOneButton,
	HeadlineThreeButton,
	HeadlineTwoButton,
	ItalicButton,
	OrderedListButton,
	UnderlineButton,
	UnorderedListButton
} from 'draft-js-buttons'
import Editor from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import * as React from 'react'
import createRenderOrderFixer from 'react-render-order-fixer'
import styled, { injectGlobal } from 'styled-components'

import createToolbarLinkPlugin from '../src/'

declare var process
process.env.NODE_ENV !== 'production' && debug.enable('*')

const d = debug('draft-js-toolbar-link-plugin:example')

// tslint:disable-next-line:no-unused-expression
injectGlobal`
	button {
		cursor: pointer;
		outline: none;
	}
`

// tslint:disable-next-line:variable-name
const Main = styled.div`
	margin: 30px;
`

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
	padding: 10px;
	border: 1px solid #eee;
`

// tslint:disable-next-line:variable-name
const ToolBarWrapper = styled.div`
	margin-bottom: 10px;
`

// tslint:disable-next-line:variable-name
const Button = styled.button`
	outline: none;
	border: 1px solid #ddd;
    border-radius: 4px;
    padding: 2px 10px;
    background: #fff;
	font-size: 14px;
	margin-top: 10px;

    &:hover {
		opacity: 0.6;
    }
`

const toolbarLinkPlugin = createToolbarLinkPlugin()
const { LinkButton } = toolbarLinkPlugin

const toolbarPlugin = createToolbarPlugin({
	structure: [
		BoldButton,
		ItalicButton,
		UnderlineButton,
		CodeButton,
		LinkButton,
		Separator,
		UnorderedListButton,
		OrderedListButton,
		BlockquoteButton,
		CodeBlockButton
	]
})

const renderOrderFixer = createRenderOrderFixer()
const Toolbar = renderOrderFixer.withOrderFixer(toolbarPlugin.Toolbar)
const { ReRenderTrigger } = renderOrderFixer

interface AppState {
	editorState: EditorState
}

class App extends React.Component<any, AppState> {

	selection: SelectionState
	editor = null

	state: AppState = {
		editorState: createEditorState()
	}

	handleChange = (editorState: EditorState) => {
		d('editorState updated')
		const sel = editorState.getSelection()
		if (!this.selection || !(this.selection.getStartKey() === sel.getStartKey()
			&& this.selection.getStartOffset() === sel.getStartOffset()
			&& this.selection.getEndKey() === sel.getEndKey()
			&& this.selection.getEndOffset() === sel.getEndOffset())) {
			d('select changed -> start key: %s, start offset: %d, end key: %s, end offset: %d',
				sel.getStartKey(), sel.getStartOffset(),
				sel.getEndKey(), sel.getEndOffset())
		}
		this.selection = sel
		this.setState({
			editorState
		})
	}

	handleLogState = () => {
		console.log(convertToRaw(this.state.editorState.getCurrentContent()))
	}

	render() {
		return (
			<Main>
				<Wrapper onClick={() => this.editor && this.editor.focus()}>
					<ToolBarWrapper>
						<Toolbar />
					</ToolBarWrapper>
					<Editor
						ref={el => this.editor = el}
						plugins={[toolbarPlugin, toolbarLinkPlugin]}
						editorState={this.state.editorState}
						onChange={this.handleChange} />
					<ReRenderTrigger/>
				</Wrapper>
				<Button onClick={this.handleLogState}>Log State</Button>
			</Main>
		)
	}
}

export default App

const HTML_CONTENT = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
	'<a href="http://www.baidu.com">Example link</a>'

function createEditorState() {
	const blocksFromHTML = convertFromHTML(HTML_CONTENT)
	const state = ContentState.createFromBlockArray(
		blocksFromHTML.contentBlocks,
		blocksFromHTML.entityMap
	)
	return EditorState.createWithContent(state)
}
