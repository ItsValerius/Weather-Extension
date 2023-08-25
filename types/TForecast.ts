export interface TForecast {
  weather?: WeatherEntity[] | null
  sources?: SourcesEntity[] | null
}
export interface WeatherEntity {
  timestamp: string
  source_id: number
  precipitation: number
  pressure_msl: number
  sunshine: number
  temperature: number
  wind_direction: number
  wind_speed: number
  cloud_cover: number
  dew_point: number
  relative_humidity: number
  visibility: number
  wind_gust_direction: number
  wind_gust_speed: number
  condition: string
  precipitation_probability?: null
  precipitation_probability_6h?: null
  solar?: null
  fallback_source_ids: FallbackSourceIds
  icon: string
}
export interface FallbackSourceIds {
  sunshine: number
}
export interface SourcesEntity {
  id: number
  dwd_station_id: string
  observation_type: string
  lat: number
  lon: number
  height: number
  station_name: string
  wmo_station_id: string
  first_record: string
  last_record: string
  distance: number
}
