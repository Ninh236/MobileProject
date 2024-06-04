import { Actionsheet, Box, Divider, Icon, Text } from 'native-base'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface HistorySheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  iconName: string
  selectedDate?: string
  children?: React.ReactNode
}

export default function HistorySheet(props: HistorySheetProps) {
  const { isOpen, onClose, children, title, iconName } = props

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
      <Actionsheet.Content style={styles.historySheet}>
        <Box height="100%" width="100%" alignItems="center">
          <Box style={styles.headerContainer}>
            <Icon
              as={MaterialCommunityIcons}
              size={'lg'}
              color="white"
              name={iconName}
            />
            <Text style={styles.header}>{title}</Text>
          </Box>
          <Box>{children}</Box>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
