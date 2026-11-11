# BC Sail

A lightweight installable web app for sailing on the BC coast: forecast wind and gusts, tidal currents, water temperature and live observed wind on one map.

## Data sources (all free and open)
- **Animated wind and gust field:** ECCC HRDPS 2.5 km grids (MSC GeoMet WCS, GeoTIFF), drawn as flow lines in the browser
- **Point wind forecast:** ECCC GEM/HRDPS via Open-Meteo, in knots
- **Animated currents:** ECCC/DFO CIOPS-SalishSea (500 m, when zoomed in) and CIOPS-West (2 km)
- **Waves:** ECCC RDWPS 2.5 km (significant height, peak period, direction) via MSC GeoMet WCS, animated; hourly point waves from Open-Meteo marine
- **Water temperature:** CIOPS surface temperature grids (MSC GeoMet WCS)
- **Tide heights:** Canadian Hydrographic Service IWLS API, 337 Pacific tide stations (15-min predictions, highs and lows)
- **Tidal current predictions:** Canadian Hydrographic Service IWLS API, 27 Pacific current stations
- **Marine forecasts & warnings:** ECCC marine weather (api.weather.gc.ca marineweather-realtime), per forecast sub-area
- **Observed wind:** ECCC SWOB real-time observations (lightstations, buoys, coastal stations); the nearest station within 30 km also adjusts the next few hours of the wind forecast

Contains information licensed under the Open Government Licence – Canada.

**Not for navigation.** Always check official forecasts and the Canadian Tide and Current Tables.

## Experimental surf model (Comox → Williams Beach)
Spot geometry was precomputed from the CIOPS 500 m land mask (beach facing, open-water fetch every 10°) and CHS NONNA 10 m / 100 m bathymetry (depth profile offshore). Each hour the app estimates wind-wave height and period from HRDPS wind, the fetch and how long the wind has held (SPM 1984 growth curves, ±60° directional spread, ~4 h decay after the wind eases), converts that to breaking height (Komar–Gaughan), and uses the CHS tide and seabed profile to place the break and classify it (spilling / plunging / shorebreak). Local wind (onshore / cross / offshore) and period adjust a 0–5★ rating. Uncalibrated.
