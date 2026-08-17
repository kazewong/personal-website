import type { Restaurant } from './RestaurantMap.svelte';

/**
 * The restaurant log. Add a new entry to the top of this array after every visit.
 *
 * Ranks:  S = worth a trip, A = excellent, B = solid, C = fine, D = not worth the calories.
 * Metrics are scored 0-5:
 *   deliciousness - how good it tastes, full stop.
 *   dailyness     - could I eat this every week without getting tired of it?
 *   novelty       - did it show me something I had not had before?
 *   preference    - how much I personally like it, taste be damned.
 *   completeness  - does the whole package (service, room, drinks, pacing) hold up?
 *
 * `lat`/`lng` are easiest to grab from Google Maps: right-click the pin and click the
 * coordinates to copy them.
 *
 * The entries below are placeholders so the page renders out of the box — replace them.
 */
export const restaurants: Restaurant[] = [
	{
		id: 'sample-noodle-counter',
		name: 'Sample Noodle Counter',
		cuisine: 'Ramen',
		area: 'East Village, Manhattan',
		price: '$$',
		lat: 40.7276,
		lng: -73.9866,
		rank: 'S',
		visited: '2026-04-18',
		metrics: {
			deliciousness: 5,
			dailyness: 4,
			novelty: 3,
			preference: 5,
			completeness: 4
		},
		dishes: ['Shio ramen with extra chashu', 'Seasoned egg', 'Cold hojicha'],
		notes:
			'Placeholder entry. Write the long-form note here: what the broth tasted like, whether the wait was worth it, who I went with, and what I would order differently next time.'
	},
	{
		id: 'sample-dumpling-house',
		name: 'Sample Dumpling House',
		cuisine: 'Northern Chinese',
		area: 'Flushing, Queens',
		price: '$',
		lat: 40.7594,
		lng: -73.8301,
		rank: 'A',
		visited: '2026-03-02',
		metrics: {
			deliciousness: 4,
			dailyness: 5,
			novelty: 2,
			preference: 4,
			completeness: 3
		},
		dishes: ['Lamb and coriander dumplings', 'Cucumber salad', 'Hot and sour soup'],
		notes:
			'Placeholder entry. Cheap, fast, and the kind of place I would happily rotate through every other week.'
	},
	{
		id: 'sample-harbor-grill',
		name: 'Sample Harbor Grill',
		cuisine: 'Seafood',
		area: 'Fells Point, Baltimore',
		price: '$$$',
		lat: 39.2819,
		lng: -76.5931,
		rank: 'B',
		visited: '2026-01-25',
		metrics: {
			deliciousness: 3,
			dailyness: 2,
			novelty: 4,
			preference: 3,
			completeness: 4
		},
		dishes: ['Crab cake', 'Grilled rockfish', 'Charred broccolini'],
		notes:
			'Placeholder entry. Good room and good service, but the kitchen played it safe. Fine for a dinner out, not something I daydream about.'
	}
];
