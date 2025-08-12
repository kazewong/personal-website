import anime from 'animejs';

export function fadeSlideIn(node: HTMLElement, { duration = 400, delay = 0 }) {
	const a = anime({
		targets: node,
		opacity: [0, 1],
		translateY: [20, 0],
		duration,
		delay,
		easing: 'easeInOutQuad',
		autoplay: false
	});

	return {
		delay,
		duration,
		tick: (t: number) => {
			a.seek(a.duration * t);
		}
	};
}

export function fadeSlideOut(node: HTMLElement, { duration = 400, delay = 0 }) {
	const a = anime({
		targets: node,
		opacity: [1, 0],
		translateY: [0, -20],
		duration,
		delay,
		easing: 'easeInOutQuad',
		autoplay: false
	});

	return {
		delay,
		duration,
		tick: (t: number) => {
			a.seek(a.duration * t);
		}
	};
}
