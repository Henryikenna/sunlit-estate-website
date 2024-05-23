'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'

import Leaflet from 'leaflet'

import styles from './map.module.css'

import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const customMarkerIcon = Leaflet.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
})

type Props = {
  marker: LatLong | null
}

export type LatLong = { lng: number; lat: number }

const Map = (props: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  let center: LatLong
  if (props.marker && props.marker.lat && props.marker.lng) {
    center = props.marker
  } else {
    center = { lng: -68.262383, lat: 12.20189 }
  }

  const [zoom] = useState(12)

  useEffect(() => {
    if (map.current) return // stops map from intializing more than once

    if (mapContainer.current) {
      map.current = new Leaflet.Map(mapContainer.current, {
        center: Leaflet.latLng(center.lat, center.lng),
        zoom: zoom,
      })

      // Create a MapTiler Layer inside Leaflet
      const mtLayer = new MaptilerLayer({
        // Get your free API key at https://cloud.maptiler.com
        apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY!,
      }).addTo(map.current)

      var marker = Leaflet.marker([center.lat, center.lng], { icon: customMarkerIcon }).addTo(map.current)
    }
  }, [center.lng, center.lat, zoom])

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  )
}

export default Map
