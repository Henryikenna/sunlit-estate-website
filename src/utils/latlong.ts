function decimalToDMS(decimal: number, isLongitude: boolean): string {
  const absoluteDecimal = Math.abs(decimal)
  const degrees = Math.floor(absoluteDecimal)
  const minutes = Math.floor((absoluteDecimal - degrees) * 60)
  const seconds = Math.round((absoluteDecimal - degrees - minutes / 60) * 3600)

  const direction = isLongitude ? (decimal >= 0 ? 'E' : 'W') : decimal >= 0 ? 'N' : 'S'

  return `${degrees}°${minutes}'${seconds}"${direction}`
}

export function convertToDMS(latitude: number, longitude: number): string {
  const latitudeText = decimalToDMS(latitude, false)
  const longitudeText = decimalToDMS(longitude, true)

  return `${latitudeText}, ${longitudeText}`
}
