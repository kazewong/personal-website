<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import annotationPlugin from 'chartjs-plugin-annotation';

	Chart.register(...registerables);
	Chart.register(annotationPlugin);

	export let resultsData: { items: Array<{ Competition: string; Date: string; Height: string }> };

	let canvas: HTMLCanvasElement;

	type ResultItem = {
		Competition: string;
		Date: string;
		Height: string;
		timestamp?: number;
	};

	// Chart instance for cleanup
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let chartInstance: any = null;

	function processResults(items: ResultItem[]) {
		// Parse date into timestamp
		const processedResults: ResultItem[] = items.map((item) => {
			let timestamp: number | undefined = undefined;
			if (item.Date && item.Date.match(/^\d{2}-\d{2}-\d{4}$/)) {
				const [day, month, year] = item.Date.split('-').map(Number);
				timestamp = new Date(year, month - 1, day).getTime();
			}
			return { ...item, timestamp };
		});
		// Sort by timestamp
		processedResults.sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
		const startDate = new Date(2013, 10, 1).getTime(); // November is month 10 (0-based)
		processedResults.forEach((item) => {
			if (item.timestamp !== undefined) {
				item.timestamp = (item.timestamp - startDate) / 1000; // convert ms to seconds
			}
		});
		return { processedResults, startDate };
	}
	function renderChart() {
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		// Clean up previous chart instance if exists
		if (chartInstance) {
			chartInstance.destroy();
			chartInstance = null;
		}

		const { processedResults, startDate } = processResults(resultsData.items);

		// Define the compression range
		const compressStart = new Date(2017, 0, 1).getTime(); // Jan 1, 2017
		const compressEnd = new Date(2021, 11, 31).getTime(); // Dec 31, 2021
		const compressStartSec = (compressStart - startDate) / 1000;
		const compressEndSec = (compressEnd - startDate) / 1000;
		const compressFactor = 3;

		// Helper to compress x value
		function compressX(x: number) {
			if (x < compressStartSec) return x;
			if (x > compressEndSec)
				return (
					(compressEndSec - compressStartSec) / compressFactor +
					(x - compressEndSec) +
					compressStartSec
				);
			return compressStartSec + (x - compressStartSec) / compressFactor;
		}

		// Prepare scatter data: {x: timestamp, y: height}
		let prevHeight: number | null = null;
		const scatterData = processedResults
			.map((item) => {
				const heightNum = Number(item.Height);
				let isImputed = false;
				let y: number | null = null;
				if (item.timestamp !== undefined && !isNaN(heightNum)) {
					y = heightNum;
					prevHeight = heightNum;
				} else if (item.timestamp !== undefined && prevHeight !== null) {
					y = prevHeight;
					isImputed = true;
				}
				if (item.timestamp !== undefined && y !== null) {
					const origX = item.timestamp;
					const compressedX = compressX(origX);
					return {
						x: compressedX,
						_origX: origX,
						y: y,
						_competition: item.Competition,
						_date: item.Date,
						_isImputed: isImputed
					};
				} else {
					return null;
				}
			})
			.filter((point) => point !== null);

		// Set end date to September 2028
		const endDate = new Date(2028, 8, 30).getTime(); // September is month 8 (0-based), day 30

		const xMin = 0;
		const origXMax = (endDate - startDate) / 1000;
		const xMax = compressX(origXMax);

		
		
		chartInstance = new Chart(context, {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: 'Height (cm)',
						data: scatterData,
						borderWidth: 2,
						showLine: false,
						pointRadius: 6,
						pointBackgroundColor: scatterData.map((v) =>
							v && v._isImputed ? 'rgba(255,255,255,0)' : '#2563eb'
						),
						borderColor: scatterData.map((v) => (v && v._isImputed ? '#fff' : '#2563eb')),
						pointStyle: scatterData.map((v) => (v && v._isImputed ? 'triangle' : 'circle'))
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: false,
						title: {
							display: true,
							text: 'Height (cm)',
							color: '#fff'
						},
						ticks: {
							color: '#fff'
						},
						grid: {
							color: '#fff2'
						},
						suggestedMin: Math.min(...scatterData.map((v) => v!.y), 180) - 5,
						suggestedMax: Math.max(...scatterData.map((v) => v!.y), 200) + 5
					},
					x: {
						type: 'linear',
						title: {
							display: true,
							text: 'Date',
							color: '#fff'
						},
						ticks: {
							color: '#fff',
							callback: function (value) {
								const compressedX = Number(value);
								// Invert the compression to get the original timestamp
								let origX: number;
								if (compressedX < compressStartSec) {
									origX = compressedX;
								} else if (
									compressedX <
									compressStartSec + (compressEndSec - compressStartSec) / compressFactor
								) {
									origX = compressStartSec + (compressedX - compressStartSec) * compressFactor;
								} else {
									origX =
										compressEndSec +
										(compressedX -
											(compressStartSec + (compressEndSec - compressStartSec) / compressFactor));
								}
								const dateObj = new Date(origX * 1000 + startDate);
								const month = dateObj.toLocaleString('default', { month: 'short' });
								const year = dateObj.getFullYear();
								return `${month} ${year}`;
							},
							maxRotation: 45,
							minRotation: 45,
							autoSkip: true
						},
						grid: {
							color: '#fff2'
						},
						min: xMin,
						max: xMax
						// Removed afterBuildTicks that enforced Feb 2022
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						callbacks: {
							title: function (tooltipItems) {
								const idx = tooltipItems[0].dataIndex;
								const dataPoint = scatterData[idx];
								return dataPoint?._competition || '';
							},
							label: function (tooltipItem) {
								const dataPoint = scatterData[tooltipItem.dataIndex];
								// Use the original x for the tooltip date
								const origX = dataPoint._origX !== undefined ? dataPoint._origX : dataPoint.x;
								const dateObj = new Date(origX * 1000 + startDate);
								const dateStr = dateObj.toLocaleDateString();
								let label = `Date: ${dateStr}, Height: ${dataPoint.y} cm`;
								if (dataPoint._isImputed) {
									label += ' (imputed)';
								}
								return label;
							}
						}
					},
					annotation:
						window.innerWidth < 1000
							? false
							: {
									annotations: {
										gaveUpHJ: {
											type: 'label',
											xValue: (() => {
												const nov2016 = new Date(2018, 10, 1).getTime(); // November is month 10 (0-based)
												const nov2016Sec = (nov2016 - startDate) / 1000;
												return compressX(nov2016Sec);
											})(),
											yValue: Math.max(...scatterData.map((v) => v!.y), 205),
											content: ['Gave up HJ', 'for grad school'],
											color: '#fff',
											backgroundColor: 'rgba(255, 0, 0, 0.3)',
											font: {
												size: 16,
												weight: 'bold'
											},
											position: {
												x: 'center',
												y: 'start'
											},
											padding: 8
										}
									}
								}
				}
			}
		});
	}

	onMount(() => {
		renderChart();
	});
</script>

<canvas
	bind:this={canvas}
	width="100%"
	{...{
		height: typeof window !== 'undefined' ? (window.innerWidth < 1000 ? '80' : '60') : '60'
	}}
></canvas>
