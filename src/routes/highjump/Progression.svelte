<script lang="ts">
	import { onMount } from 'svelte';
	import chartjs from 'chart.js/auto';

	export let resultsData: { items: Array<{ Competition: string; Date: string; Height: string }> };

	let canvas: HTMLCanvasElement;

	type ResultItem = {
		Competition: string;
		Date: string;
		Height: string;
		timestamp?: number;
	};

	// Chart instance for cleanup
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
		const startDate = new Date(2021, 10, 1).getTime(); // November is month 10 (0-based)
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

		// Prepare scatter data: {x: timestamp, y: height}
		const scatterData = processedResults.map((item) => {
			const heightNum = Number(item.Height);
			if (item.timestamp !== undefined && !isNaN(heightNum)) {
				return {
					x: item.timestamp,
					y: heightNum,
					_competition: item.Competition,
					_date: item.Date
				};
			} else {
				return null;
			}
		}).filter((point) => point !== null);

		chartInstance = new chartjs(context, {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: 'Height (cm)',
						data: scatterData,
						borderWidth: 2,
						showLine: false,
						pointRadius: 6,
						pointBackgroundColor: scatterData.map((v) => v ? '#2563eb' : '#a3a3a3'),
						borderColor: '#2563eb'
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
							callback: function(value) {
								const timestamp = Number(value);
								const dateObj = new Date(timestamp * 1000 + startDate);
								const month = dateObj.toLocaleString('default', { month: 'short' });
								const year = dateObj.getFullYear();
								return `${month} ${year}`;
							}
						},
						grid: {
							color: '#fff2'
						}
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
								const dateObj = new Date(dataPoint.x * 1000 + startDate);
								const dateStr = dateObj.toLocaleDateString();
								return `Date: ${dateStr}, Height: ${dataPoint.y} cm`;
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

<canvas bind:this={canvas} width="800" height="400"></canvas>
