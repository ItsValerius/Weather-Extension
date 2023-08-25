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

  const aggregatedTemperatures: {
    date: string
    temperatures: number[]
    averageTemperature: number
    items: WeatherEntity[]
    mostCommonIcon: string
  }[] = data.weather.reduce((result, item) => {
    const date = moment(item.timestamp)
    const dayKey = date.format("YYYY-MM-DD")

    let existingEntry = result.find((entry) => entry.date === dayKey)

    if (!existingEntry) {
      existingEntry = {
        date: dayKey,
        temperatures: [],
        averageTemperature: 0,
        items: [],
        mostCommonIcon: ""
      }
      result.push(existingEntry)
    }

    existingEntry.temperatures.push(item.temperature)
    existingEntry.items.push(item)
    return result
  }, [])

  // Calculate average temperatures for each day
  aggregatedTemperatures.forEach((data) => {
    const temperatures = data.temperatures
    const averageTemperature =
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length
    data.averageTemperature = averageTemperature
  })

  // Find the most common icon for each day
  for (const dayKey in aggregatedTemperatures) {
    const iconCounts: Record<string, number> = {}

    aggregatedTemperatures[dayKey].items.forEach((item) => {
      if (iconCounts[item.icon]) {
        iconCounts[item.icon]++
      } else {
        iconCounts[item.icon] = 1
      }
    })

    let mostCommonIcon = ""
    let maxCount = 0
    for (const icon in iconCounts) {
      if (iconCounts[icon] > maxCount) {
        mostCommonIcon = icon
        maxCount = iconCounts[icon]
      }
    }
    aggregatedTemperatures[dayKey].mostCommonIcon = mostCommonIcon
    console.log(
      `On ${dayKey}, the most common icon is: ${mostCommonIcon}, occurring ${maxCount} times.`
    )
  }

  return aggregatedTemperatures.map((aggr) => {
    return (
      <div
        className="flex w-full flex-row justify-around items-center"
        key={aggr.date}>
        <div className="flex justify-center items-center">
          <Icon icon={aggr.mostCommonIcon} size={32} />
          {aggr.date}{" "}
        </div>
        <p className="text-lg ">
          {(Math.round(aggr.averageTemperature * 10) / 10).toFixed(1) + "°C"}
        </p>
      </div>
    )
  })
}

export default Forecast
