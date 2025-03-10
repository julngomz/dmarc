import { useEffect, useRef } from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as pmtiles from "pmtiles";
import { center } from "@turf/center";


function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const lng = -93.63103503160843;
  const lat = 41.58736757438154;
  const bounds: maplibregl.LngLatBoundsLike = [
    [-94.21, 41.14], // South-West 
    [-92.95, 42.05], // North-East
  ]



  // const dsmZipCodes = ["50309", "50310", "50311", "50312", "50313", "50314", "50315", "50316", "50317", "50319", "50320", "50321"];

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            "osm": {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            },
            'dsm-metro-zips': {
              type: 'vector',
              url: 'pmtiles:///pmtiles/dsm-metro-zips.pmtiles',
              attribution: ''
            },
            'other-metro-zips': {
              type: 'vector',
              url: 'pmtiles:///pmtiles/other-metro-zips.pmtiles',
              attribution: ''
            },
            'dsm-neighboorhoods': {
              type: 'vector',
              url: 'pmtiles:///pmtiles/dsm-neighboorhoods.pmtiles',
              attribution: '',
            }
          },
          layers: [
            {
              id: "osm-layer",
              type: "raster",
              source: "osm",
              minzoom: 0,
              maxzoom: 12,
            }
          ]
        },
        center: [lng, lat],
        maxBounds: bounds,
        zoom: 10,
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        scrollZoom: false,
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Register protocol handler AFTER map initialization but BEFORE adding source
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Add source and layer on map load
    map.current!.on('load', () => {
      console.log("Map loaded, adding PMTiles source");

      try {

        console.log("PMTiles source added, now adding layer");

        map.current!.addLayer({
          id: "dsm-metro-zips-fills",
          type: "fill",
          source: "dsm-metro-zips",
          "source-layer": "dsm_metro_zips", // Match your tippecanoe layer name
          paint: {
            "fill-color": [
              "match",
              ["get", "ZCTA5CE20"], // Use ZCTA ID property name
              "50309", "#FF8A00", // Downtown Des Moines - orange
              "50310", "#FFC300", // Northwest Des Moines - yellow
              "50311", "#FFD700",
              "50312", "#FFEC19",
              "50313", "#BAED91",
              "50314", "#90EE90", // Green
              "50315", "#82CAFF", // Light blue
              "50316", "#87CEEB",
              "50317", "#1E90FF", // Blue
              "50319", "#6A5ACD", // Purple
              "50320", "#DA70D6", // Orchid
              "50321", "#FF69B4", // Pink
              "#BBDEFB"  // Default color (light blue)
            ],
            "fill-opacity": 0.5
          }
        });

        // Outlines
        map.current!.addLayer({
          id: "dsm-metro-zips-outlines",
          type: "line",
          source: "dsm-metro-zips",
          "source-layer": "dsm_metro_zips", // Match your tippecanoe layer name
          paint: {
            "line-color": "#333",
            "line-width": 0.5,
            "line-opacity": 0.8
          }
        });

        map.current!.addLayer({
          id: "dsm-metro-zips-labels",
          type: "symbol",
          source: "dsm-metro-zips",
          "source-layer": "dsm_metro_zips", // Match your tippecanoe layer name
          layout: {
            // The text to display - gets the ZIP code from the ZCTA5CE20 property
            "text-field": ["get", "ZCTA5CE20"],

            // Text styling options
            "text-size": 14,
            "text-justify": "center",
            "text-anchor": "center",
            "text-allow-overlap": false,
            "text-ignore-placement": false,
            "text-padding": 5,
          },
          paint: {
            // Text color and effects
            "text-color": "#000000",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.5, // White outline for better readability
            "text-opacity": 0.9
          }
        });

        map.current!.addLayer(
          {
            id: "other-metro-zips-fills",
            type: "fill",
            source: "other-metro-zips",
            "source-layer": "other_metro_zips", // Match your tippecanoe layer name
            paint: {
              "fill-color": [
                "match",
                ["get", "ZCTA5CE20"], // Use ZCTA ID property name
                "50309", "#FF8A00", // Downtown Des Moines - orange
                "50310", "#FFC300", // Northwest Des Moines - yellow
                "50311", "#FFD700",
                "50312", "#FFEC19",
                "50313", "#BAED91",
                "50314", "#90EE90", // Green
                "50315", "#82CAFF", // Light blue
                "50316", "#87CEEB",
                "50317", "#1E90FF", // Blue
                "50319", "#6A5ACD", // Purple
                "50320", "#DA70D6", // Orchid
                "50321", "#FF69B4", // Pink
                "#BBDEFB"  // Default color (light blue)
              ],
              "fill-opacity": 0.5
            }
          })



        map.current!.on('mouseenter', 'dsm-metro-zips-fills', () => {
          map.current!.getCanvas().style.cursor = 'pointer';
        });

        map.current!.on('mouseleave', 'dsm-metro-zips-fills', () => {
          map.current!.getCanvas().style.cursor = '';
        });

        map.current!.on(
          'click',
          'dsm-metro-zips-fills',
          (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              const zipCode = feature.properties.ZCTA5CE20;

              const tileCenter = center(feature).geometry.coordinates;

              // Create a bounding box for the clicked feature
              const bounds = new maplibregl.LngLatBounds();

              // Handle different geometry types
              if (feature.geometry.type === 'Polygon') {
                feature.geometry.coordinates[0].forEach(coord => {
                  bounds.extend(coord as [number, number]);
                });
              } else if (feature.geometry.type === 'MultiPolygon') {
                feature.geometry.coordinates.forEach(polygon => {
                  polygon[0].forEach(coord => {
                    bounds.extend(coord as [number, number]);
                  });
                });
              }

              map.current!.setPaintProperty('dsm-metro-zips-fills', 'fill-color', [
                'match',
                ['get', 'ZCTA5CE20'],
                zipCode, "#1E90FF",
                "#808080"
              ]);

              map.current!.setPaintProperty('zip-fills', 'fill-opacity', 0.5);

              map.current!.flyTo({
                center: tileCenter as [number, number],
                zoom: 11,
                duration: 700,
              });

              // Optional: Display a popup with the ZIP code info
              new maplibregl.Popup()
                .setLngLat(tileCenter as [number, number])
                .setHTML(`<h3>ZIP Code: ${zipCode}</h3>`)
                .addTo(map.current!);
            }
          });

        console.log("Layer added successfully");
      } catch (error) {
        console.error("Error adding PMTiles source or layer:", error);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

    </div>
  );
}

export default Map;
