# Restaurant map module

Three files, no new npm dependencies:

| File                   | What it is                                                                |
| ---------------------- | ------------------------------------------------------------------------- |
| `RestaurantMap.svelte` | The whole module: map, rank pins, pentagon chart, expandable detail card. |
| `restaurants.ts`       | The data. Add an entry per visit.                                         |
| `+page.svelte`         | The `/restaurants` page: intro copy, the map, and the ranking legend.     |

`RestaurantMap.svelte` is self-contained — drop it anywhere under `src/` and use it. The Google
Maps JS API is loaded lazily from inside the component at runtime, so there is nothing to install.

## Setup

1. Create a Google Maps JavaScript API key in the
   [Google Cloud console](https://console.cloud.google.com/google/maps-apis/credentials). Enable
   the **Maps JavaScript API**, and restrict the key to your site's HTTP referrers — it ships to
   the browser, so referrer restriction is what keeps it from being used elsewhere.
2. Create a **Map ID** under
   [Map management](https://console.cloud.google.com/google/maps-apis/studio/maps) with the
   JavaScript / Vector map type. Advanced markers need one. `DEMO_MAP_ID` works while developing
   but is not meant for production.
3. Put both in `.env` (see `.env.example`), and set the same variables in the Vercel project
   settings so they exist in production:

   ```
   PUBLIC_GOOGLE_MAPS_API_KEY=...
   PUBLIC_GOOGLE_MAPS_MAP_ID=...
   ```

Without a key the map area shows a short notice and the list below it keeps working, so the page
never breaks in an environment that has no key.

## Adding a restaurant

Append an entry to `restaurants.ts`. For `lat`/`lng`, right-click the place in Google Maps and
click the coordinates to copy them.

```ts
{
	id: 'unique-slug',
	name: 'Restaurant name',
	cuisine: 'Ramen',
	area: 'East Village, Manhattan',
	price: '$$',
	lat: 40.7276,
	lng: -73.9866,
	rank: 'S',                       // S | A | B | C | D
	visited: '2026-04-18',
	metrics: {                       // each 0-5, these are the pentagon axes
		deliciousness: 5,
		dailyness: 4,
		novelty: 3,
		preference: 5,
		completeness: 4
	},
	dishes: ['What I had', 'Another dish'],
	notes: 'The long-form note, shown once the card is expanded.',
	link: 'https://optional-link'
}
```

## Props

| Prop          | Default                          | Notes                                        |
| ------------- | -------------------------------- | -------------------------------------------- |
| `restaurants` | required                         | The array above.                             |
| `apiKey`      | `''`                             | Maps JS API key. Empty renders the fallback. |
| `mapId`       | `'DEMO_MAP_ID'`                  | Required for advanced markers.               |
| `center`      | `{ lat: 40.7128, lng: -74.006 }` | Only used before the map fits the pins.      |
| `zoom`        | `11`                             | Same.                                        |
| `height`      | `'32rem'`                        | Any CSS length.                              |
| `maxScore`    | `5`                              | Top of the metric scale.                     |

The module also exports `Restaurant`, `Rank`, `RestaurantMetrics`, `METRIC_AXES`, `RANKS`,
`RANK_COLORS` and `RANK_BLURBS`, which is what `+page.svelte` uses to build the legend — change a
rank colour or a metric label in one place and both the map and the legend follow.
