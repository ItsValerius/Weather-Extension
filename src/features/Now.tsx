import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useGeolocated } from "react-geolocated"
import type { CurrentWeather } from "types/CurrentWeather"

import Icon from "./Icon"

const Now = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled
}: {
  coords: GeolocationCoordinates
  isGeolocationAvailable: boolean
  isGeolocationEnabled: boolean
}) => {
  const getWeather = async () => {
    if (!isGeolocationAvailable || !isGeolocationEnabled) {
      console.log("No Geolocation available")

      const data = await fetch(
        `https://api.brightsky.dev/current_weather?lat=${52.52}&lon=${13.4}`
      )
      return data.json()
    }
    const data = await fetch(
      `https://api.brightsky.dev/current_weather?lat=${coords.latitude}&lon=${coords.longitude}`
    )
    return data.json()
  }

  const { isLoading, isError, data, error } = useQuery<CurrentWeather, Error>({
    queryKey: ["weather", coords],
    queryFn: getWeather,
    enabled: !!coords
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="flex flex-row  justify-center gap-4 border-b  p-2 w-full">
      <Icon icon={data.weather.icon} size={32} />
      <p className="text-xl self-end">
        {data.weather.temperature
          ? data.weather.temperature + "°C"
          : "Can't get Temperature"}
      </p>
    </div>
  )
}

export default Now
