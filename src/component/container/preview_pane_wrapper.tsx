import PreviewPane from '../../lsg/patterns/panes/preview-pane';
import * as React from 'react';

export interface ElementWrapperState {
	isResizing: boolean;
	direction: number;
	width: number;
	maxWidth: number;
	mousePosition?: number;
}

export class PreviewPaneWrapper extends React.Component<{}, ElementWrapperState> {
	public constructor(props: {}) {
		super(props);

		this.state = {
			isResizing: false,
			direction: 1,
			width: 0,
			maxWidth: 0
		};

		this.handleMouseDownRight = this.handleMouseDownRight.bind(this);
		this.handleMouseDownLeft = this.handleMouseDownLeft.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handlePreviewWidthUpdate = this.handlePreviewWidthUpdate.bind(this);
	}

	private handleMouseDownRight(e: React.MouseEvent<HTMLElement>): void {
		this.setState({
			isResizing: true,
			mousePosition: e.pageX,
			direction: 1
		});
	}

	private handleMouseDownLeft(e: React.MouseEvent<HTMLElement>): void {
		this.setState({
			isResizing: true,
			mousePosition: e.pageX,
			direction: -1
		});
	}

	private handleMouseUp(): void {
		this.setState({
			isResizing: false,
			mousePosition: undefined
		});
	}

	private handleMouseLeave(): void {
		const { mousePosition, maxWidth } = this.state;

		if (!mousePosition) {
			return;
		}

		this.setState({
			isResizing: false,
			mousePosition: undefined,
			width: maxWidth
		});
	}

	private handleMouseMove(e: React.MouseEvent<HTMLElement>): void {
		const { mousePosition, width, direction } = this.state;

		if (!mousePosition) {
			return;
		}
		e.preventDefault();

		const newWidth = width - (mousePosition - e.pageX) * 2 * direction;
		this.setState({
			width: newWidth >= 300 ? newWidth : 300,
			mousePosition: e.pageX
		});
	}

	private handlePreviewWidthUpdate(previewWidth: number): void {
		this.setState({
			width: previewWidth,
			maxWidth: previewWidth
		});
	}

	public render(): JSX.Element {
		return (
			<PreviewPane
				handleMouseDownLeft={this.handleMouseDownLeft}
				handleMouseDownRight={this.handleMouseDownRight}
				handleMouseLeave={this.handleMouseLeave}
				handleMouseMove={this.handleMouseMove}
				handleMouseUp={this.handleMouseUp}
				handlePreviewWidthUpdate={this.handlePreviewWidthUpdate}
				width={this.state.width}
			/>
		);
	}
}
