import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'

export type AnchorProps = React.HTMLProps<HTMLAnchorElement> & { modifierKeyDown?: boolean }
export type AnchorComponentClass = StyledComponentClass<AnchorProps, any>
export const Anchor = styled.a`
	${(props: AnchorProps) => props.modifierKeyDown ? 'cursor: pointer;' : ''}
` as AnchorComponentClass

export type URLInputComponentClass = StyledComponentClass<React.HTMLProps<HTMLInputElement>, any>
export const URLInput = styled.input`
	outline: none;
	vertical-align: bottom;
	height: 34px;
	width: 250px;
	padding: 0px 5px;
	border: none;
	background: #f0f0f0;
	&::-webkit-input-placeholder {
		color: #b0b0b0;
	}
	&:-moz-placeholder {
		color: #b0b0b0;
	}
	&::-moz-placeholder {
		color: #b0b0b0;
	}
	&:-ms-input-placeholder {
		color: #b0b0b0;
	}
` as URLInputComponentClass

export type URLInputWrapperComponentClass = StyledComponentClass<any, any>
export const URLInputWrapper = styled.div`
	display: inline-block;
` as URLInputWrapperComponentClass
