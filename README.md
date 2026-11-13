# BC Sail

A lightweight installable web app for sailing on the BC coast: forecast wind and gusts, tidal currents, water temperature and live observed wind on one map.

## Data sources (all free and open)
- **Animated wind and gust field:** ECCC HRDPS 2.5 km grids (MSC GeoMet WCS, GeoTIFF), drawn as flow lines in the browser
- **Point wind forecast:** ECCC GEM/HRDPS via Open-Meteo, in knots
- **Animated currents:** ECCC/DFO CIOPS-SalishSea (500 m, when zoomed in) and CIOPS-West (2 km)
- **Waves:** ECCC RDWPS 2.5 km (significant height, peak period, direction) via MSC GeoMet WCS, animated; hourly point waves from Open-Meteo marine
- **Point current forecast:** tapping water in the Current view loads 48 hourly CIOPS values for that point (GeoMet GetFeatureInfo)
- **Water temperature:** CIOPS surface temperature grids (MSC GeoMet WCS)
- **Tide heights:** Canadian Hydrographic Service IWLS API, 337 Pacific tide stations (15-min predictions, highs and lows)
- **Tidal current predictions:** Canadian Hydrographic Service IWLS API, 27 Pacific current stations
- **Marine forecasts & warnings:** ECCC marine weather (api.weather.gc.ca marineweather-realtime), per forecast sub-area
- **Observed wind:** ECCC SWOB real-time observations (lightstations, buoys, coastal stations); the nearest station within 30 km also adjusts the next few hours of the wind forecast

Contains information licensed under the Open Government Licence – Canada.

**Not for navigation.** Always check official forecasts and the Canadian Tide and Current Tables.

## Experimental surf model (Comox → Williams Beach)
Spot geometry was precomputed from the CIOPS 500 m land mask (beach facing, open-water fetch every 10°) and CHS NONNA 10 m / 100 m bathymetry (depth profile offshore). Each hour the app estimates wind-wave height and period from HRDPS wind, the fetch and how long the wind has held (SPM 1984 growth curves, ±60° directional spread, ~4 h decay after the wind eases), converts that to breaking height (Komar–Gaughan), and uses the CHS tide and seabed profile to place the break and classify it (spilling / plunging / shorebreak). Local wind (onshore / cross / offshore) and period adjust a 0–5★ rating. Wave shape: the crest angle at breaking (Snell refraction from deep water) separates closeouts (straight-on, < 4–8°) from peeling waves (8–35°); point breaks (Little River / Denny Rd) let swell wrap ~50° and get a peel bonus. Size has diminishing returns and wave shape multiplies it (a clean 2 ft peeler outrates a 4 ft closeout). Period (short wind chop ≈ ×0.3, 7 s+ ×1) and surface texture from the local wind (glassy ×1 … 12–16 kn ×0.55) also multiply the rating; points only wrap longer-period swell. Ratings are capped in > 20 kn wind. Calibration log: 13 Nov 2026 Little River, SE 13–14 kn, observed ~2 ft choppy and unsurfed → breaking height × 0.8. Uncalibrated.

## Experimental wing-foil & kite scores (Ride → Wing / Kite)
Spots: Goose Spit outside (faces S, Strait) and inside (faces N, enclosed Comox Harbour – geometry from the basemap shoreline and CHS NONNA 10 m), Kye Bay, Little River. Score = wind in the usable window from published guidance (Experienced: 12–32 kn, best 15–25; Learning: 12–24 kn, best 15–20; set in the ≡ menu) × gust spread (≤5 kn normal) × direction to the beach (side-on/side-shore best, onshore OK, offshore 0 and flagged unsafe – except inside the spit, where wind across/over the spit into the enclosed harbour is the classic big-wind flat-water setup; Experienced gets a bonus there from 20 kn) × water depth at the launch for the tide (walk-out distance to ≥1.2 m for a foil, ≥0.8 m for a kite), zero after dark. Water state shown from the surf model (outside spots) or "flat water" (inside the spit).
