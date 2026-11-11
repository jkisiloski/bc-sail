# BC Sail

A lightweight installable web app for sailing on the BC coast: forecast wind and gusts, tidal currents, water temperature and live observed wind on one map.

## Data sources (all free and open)
- **Animated wind and gust field:** ECCC HRDPS 2.5 km grids (MSC GeoMet WCS, GeoTIFF), drawn as flow lines in the browser
- **Point wind forecast:** ECCC GEM/HRDPS via Open-Meteo, in knots
- **Animated currents:** ECCC/DFO CIOPS-SalishSea (500 m, when zoomed in) and CIOPS-West (2 km)
- **Water temperature map:** CIOPS (MSC GeoMet WMS)
- **Tide heights:** Canadian Hydrographic Service IWLS API, 337 Pacific tide stations (15-min predictions, highs and lows)
- **Tidal current predictions:** Canadian Hydrographic Service IWLS API, 27 Pacific current stations
- **Observed wind:** ECCC SWOB real-time observations (lightstations, buoys, coastal stations)

Contains information licensed under the Open Government Licence – Canada.

**Not for navigation.** Always check official forecasts and the Canadian Tide and Current Tables.
