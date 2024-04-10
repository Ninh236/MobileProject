import { Box, Divider, Heading, Text } from 'native-base'
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types'
import { ReactNode } from 'react'
import { styles } from './styles'

interface CardProps {
  title: string
  titleIcon?: ReactNode
  titleSize?: ThemeComponentSizeType<'Heading'>
  hasDivider?: boolean
  body: ReactNode
}

export default function Card(props: CardProps) {
  const { title, titleSize, hasDivider, body } = props
  return (
    <Box style={styles.cardStyles}>
      <Box>
        <Text size={titleSize} style={styles.titleStyles}>
          {title}
        </Text>
      </Box>
      {hasDivider && <Divider />}
      <Box>{body}</Box>
    </Box>
  )
}
