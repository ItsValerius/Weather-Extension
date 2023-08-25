import React from "react"
import {
  BsCloudFog,
  BsCloudHail,
  BsCloudLightningRain,
  BsCloudMoon,
  BsCloudRain,
  BsCloudSleet,
  BsCloudSnow,
  BsCloudSun,
  BsCloudy,
  BsMoon,
  BsQuestionLg,
  BsSun,
  BsWind
} from "react-icons/bs"

const Icon = ({ icon, size }: { icon: string; size: number }) => {
  switch (icon) {
    case "cloudy":
      return <BsCloudy size={size} />
    case "clear-day":
      return <BsSun size={size} />
    case "clear-night":
      return <BsMoon size={size} />
    case "partly-cloudy-day":
      return <BsCloudSun size={size} />
    case "partly-cloudy-night":
      return <BsCloudMoon size={size} />
    case "cloudy":
      return <BsCloudy size={size} />
    case "fog":
      return <BsCloudFog size={size} />
    case "wind":
      return <BsWind size={size} />
    case "rain":
      return <BsCloudRain size={size} />
    case "sleet":
      return <BsCloudSleet size={size} />
    case "snow":
      return <BsCloudSnow size={size} />
    case "hail":
      return <BsCloudHail size={size} />
    case "thunderstorm":
      return <BsCloudLightningRain size={size} />
    case null:
      return <BsQuestionLg size={size} />
  }
}

export default Icon
