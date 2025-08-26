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

		const labels = processedResults.map((item) => {
			if (item.timestamp !== undefined) {
				const dateObj = new Date(item.timestamp * 1000 + startDate);
				const month = dateObj.toLocaleString('default', { month: 'short' });
				const year = dateObj.getFullYear();
				return `${month} ${year}`;
			} else {
				return item.Date;
			}
		});

		const data = processedResults.map((item) => {
			const heightNum = Number(item.Height);
			return !isNaN(heightNum) ? heightNum : null;
		});

		chartInstance = new chartjs(context, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Height (cm)',
						data: data,
						borderWidth: 2,
						fill: false,
						tension: 0.2,
						pointRadius: 6,
						pointBackgroundColor: data.map((v) => (v === null ? '#a3a3a3' : '#2563eb')),
						borderColor: '#2563eb',
						spanGaps: true
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
						suggestedMin: Math.min(...data.filter((v) => v !== null), 180) - 5,
						suggestedMax: Math.max(...data.filter((v) => v !== null), 200) + 5
					},
					x: {
						title: {
							display: true,
							text: 'Competition',
							color: '#fff'
						},
						ticks: {
							color: '#fff'
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
								return processedResults[idx]?.Competition || '';
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
