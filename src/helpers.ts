
if (typeof Node === 'function' && Node.prototype) {
	const originalRemoveChild = Node.prototype.removeChild;

	(Node as any).prototype.removeChild = function (child: Element) {
		if (child.parentNode !== this) {
			return child;
		}
		const args: any = arguments
		return originalRemoveChild.apply(this, args);
	};

	const originalInsertBefore = Node.prototype.insertBefore;
	(Node as any).prototype.insertBefore = function (newNode: Element, referenceNode: Element) {
		if (referenceNode && referenceNode.parentNode !== this) {
			return newNode;
		}
		const args: any = arguments
		return originalInsertBefore.apply(this, args);
	};
}


if (typeof window !== 'undefined') {
	const id = '_draggi'
	const isStyled = document?.getElementById(id)
	if (!isStyled) {
		const style = document.createElement('style')
		style.id = id

		document.head.appendChild(style)
		style.innerHTML = `
		.gu-mirror {
			position: fixed !important;
			margin: 0 !important;
			z-index: 9999 !important;
			opacity: 0.8;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
			filter: alpha(opacity=80);
		}
		.gu-hide {
			display: none !important;
		}
		.gu-unselectable {
			-webkit-user-select: none !important;
			-moz-user-select: none !important;
			-ms-user-select: none !important;
			user-select: none !important;
		}
		.gu-transit {
			pointer-events: none;
			opacity: 0.2;
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
			filter: alpha(opacity=20);
		}
		[data-handler]{
			position: relative;
			cursor: move
		}
		[data-handler]::after{
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			zIndex: 1;
		}
		`
	}
}
