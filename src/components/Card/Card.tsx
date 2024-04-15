import React from 'react'
import { Box, Divider, Heading, Text } from 'native-base'
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types'
import { ReactNode } from 'react'
import { styles } from './styles'
import { StyleProp, ViewStyle } from 'react-native'

interface CardProps {
  title?: string
  titleIcon?: ReactNode
  titleSize?: ThemeComponentSizeType<'Heading'>
  cardCustomStyles?: StyleProp<ViewStyle>
  body: ReactNode
}

export default function Card(props: CardProps) {
  const { title, titleIcon, titleSize, cardCustomStyles, body } = props

  return (
    <Box style={[styles.cardStyles, cardCustomStyles]}>
      <Box display="flex" flexDirection="row" alignItems="center">
        {titleIcon}
        {title && (
          <Text fontSize={titleSize} style={styles.titleStyles}>
            {title}
          </Text>
        )}
      </Box>
      <Box>{body}</Box>
    </Box>
  )
}
