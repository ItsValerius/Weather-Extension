import React from "react"
import { useGeolocated } from "react-geolocated"

import Forecast from "./Forecast"
import Now from "./Now"

const Weather = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false
      },
      userDecisionTimeout: 5000
    })
  return (
    <div className="flex flex-col w-full ">
      <Now
        coords={coords}
        isGeolocationAvailable={isGeolocationAvailable}
        isGeolocationEnabled={isGeolocationEnabled}
      />
      <Forecast
        coords={coords}
        isGeolocationAvailable={isGeolocationAvailable}
        isGeolocationEnabled={isGeolocationEnabled}
      />
    </div>
  )
}

export default Weather
