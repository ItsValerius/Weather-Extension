import { useQuery } from "@tanstack/react-query"
import moment from "moment"
import React from "react"
import type { TForecast, WeatherEntity } from "types/TForecast"

import Icon from "./Icon"

const Forecast = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled
}: {
  coords: GeolocationCoordinates
  isGeolocationAvailable: boolean
  isGeolocationEnabled: boolean
}) => {
  const now = moment().startOf("day").add(1, "day")
  const end = moment().add(4, "days").startOf("day").subtract(1, "hour")

  const getForecast = async () => {
    console.log(now.toISOString(true))

    if (!isGeolocationAvailable || !isGeolocationEnabled) {
      console.log("No Geolocation available")

      const data = await fetch(
        `https://api.brightsky.dev/weather?date=${now.toISOString(
          true
        )}&last_date=${end.toISOString(true)}&lat=${52.52}&lon=${13.4}`
      )
      return data.json()
    }
    const data = await fetch(
      `https://api.brightsky.dev/weather?date=${now.toISOString(
        true
      )}&last_date=${end.toISOString(true)}&lat=${coords.latitude}&lon=${
        coords.longitude
      }`
    )
    return data.json()
  }

  const { isLoading, isError, data, error } = useQuery<TForecast, Error>({
    queryKey: ["weather"],
    queryFn: getForecast,
    enabled: !!coords,
    retry: false
  })
  console.log(data)
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const uniqueDatesAsArray = [
    ...new Set(
      data.weather.map((date) => new Date(date.timestamp).toDateString())
    )
  ].map((string) => new Date(string))

  const avgTempByDay = uniqueDatesAsArray.map((uniqueDate, index) => {
    const groupedByDay = data.weather.filter((item) =>
      moment(item.timestamp).isSame(uniqueDate, "day")
    )
    let compare = ""
    let mostFreq = ""
    const average = groupedByDay.reduce(
      (acc, curr) => acc + curr.temperature,
      0
    )
    console.log(groupedByDay)

    groupedByDay.reduce((acc, val) => {
      if (val.icon in acc) {
        // if key already exists
        acc[val.icon]++ // then increment it by 1
      } else {
        acc[val.icon] = 1 // or else create a key with value 1
      }
      if (acc[val.icon] > compare) {
        // if value of that key is greater
        // than the compare value.
        compare = acc[val.icon] // than make it a new compare value.
        mostFreq = val.icon // also make that key most frequent.
      }
      return acc
    }, {})

    return {
      avgTemp: Math.round(((average / groupedByDay.length) * 10) / 10).toFixed(
        1
      ),
      mostFrequentIcon: mostFreq,
      date: moment(groupedByDay.at(0).timestamp).format("YYYY-MM-DD")
    }
  })
  console.log(avgTempByDay)

  return avgTempByDay.map((day) => {
    return (
      <div
        className="flex w-full flex-row gap-2 items-center justify-center border-b"
        key={day.date}>
        <div className="flex  items-center gap-1">
          <Icon icon={day.mostFrequentIcon} size={24} />
          {moment(day.date).format("dddd")}
        </div>
        <p className="text-lg h-8">{day.avgTemp + "°C"}</p>
      </div>
    )
  })
}

export default Forecast
