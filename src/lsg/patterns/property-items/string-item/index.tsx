import { colors } from '../../colors';
import { fonts } from '../../fonts';
import * as React from 'react';
import { getSpace, Size } from '../../space';
import styled from 'styled-components';

export interface StringItemProps {
	label: string;
	value?: string;
	className?: string;
	handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const StyledStringItem = styled.div`
	width: 100%;
`;

const StyledLabel = styled.span`
	display: block;
	margin-bottom: ${getSpace(Size.XS)}px;
	font-size: 12px;
	font-family: ${fonts().NORMAL_FONT};
	color: ${colors.black.toString()};
`;

const StyledTextarea = styled.textarea`
	box-sizing: border-box;
	display: block;
	width: 100%;
	height: 28px;
	padding-bottom: ${getSpace(Size.M) / 2}px;
	border: none;
	border-bottom: 1px solid transparent;
	margin-bottom: ${getSpace(Size.L)}px;
	background: transparent;
	font-family: ${fonts().NORMAL_FONT};
	font-size: 15px;
	text-overflow: ellipsis;
	color: ${colors.grey36.toString()};
	transition: all 0.2s;
	resize: vertical;

	::-webkit-input-placeholder {
		color: ${colors.grey60.toString()};
	}

	&:hover {
		border-color: ${colors.grey60.toString()};
		color: ${colors.black.toString()};
	}

	&:focus {
		border-color: ${colors.blue40.toString()};
		color: ${colors.black.toString()};
		outline: none;
	}
`;

export const StringItem: React.StatelessComponent<StringItemProps> = props => {
	const { className, handleChange, label, value } = props;

	return (
		<StyledStringItem className={className}>
			<label>
				<StyledLabel>{label}</StyledLabel>
				<StyledTextarea onChange={handleChange} placeholder="Type in">
					{value}
				</StyledTextarea>
			</label>
		</StyledStringItem>
	);
};

export default StringItem;
