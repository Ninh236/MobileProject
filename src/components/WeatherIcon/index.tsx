import { fromByteArray } from 'base64-js'
import { Image } from 'native-base'
import { useEffect, useState } from 'react'
import { ImageStyle, StyleProp } from 'react-native'

export function WeatherIcon({
  imageUrl,
  alt,
  style,
}: {
  imageUrl: string
  alt: string
  style?: StyleProp<ImageStyle>
}) {
  let [src64, setSrc64] = useState('')

  useEffect(() => {
    fetch(imageUrl)
      .then((r) => {
        return r.arrayBuffer()
      })
      .then((buffer) => {
        let b = fromByteArray(new Uint8Array(buffer))
        let res = `data:image/png;base64,${b}`
        setSrc64(res)
      })
  }, [imageUrl])

  return (
    <Image
      alt={alt}
      src={src64}
      style={style}
      resizeMode="contain"
      resizeMethod="scale"
    />
  )
}
