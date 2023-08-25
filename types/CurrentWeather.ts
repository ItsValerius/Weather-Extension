export interface CurrentWeather {
  weather: Weather
  sources?: SourcesEntity[] | null
}
export interface Weather {
  source_id: number
  timestamp: string
  cloud_cover: number
  condition: string
  dew_point: number
  solar_10: number
  solar_30: number
  solar_60: number
  precipitation_10: number
  precipitation_30: number
  precipitation_60: number
  pressure_msl: number
  relative_humidity: number
  visibility: number
  wind_direction_10: number
  wind_direction_30: number
  wind_direction_60: number
  wind_speed_10: number
  wind_speed_30: number
  wind_speed_60: number
  wind_gust_direction_10: number
  wind_gust_direction_30: number
  wind_gust_direction_60: number
  wind_gust_speed_10: number
  wind_gust_speed_30: number
  wind_gust_speed_60: number
  sunshine_30: number
  sunshine_60: number
  temperature: number
  fallback_source_ids: FallbackSourceIds
  icon?: string
}
export interface FallbackSourceIds {}
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
