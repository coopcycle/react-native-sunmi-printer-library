import React, { useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native'
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library'
import { Button } from './components/Button'

type Props = Record<string, never>
type ComponentProps = {
  onPressPrepare: () => void
  onPressPrintText: () => void
}

const Component: React.FC<ComponentProps> = ({
  onPressPrepare,
  onPressPrintText,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>react-native-sunmi-printer-library</Text>
          <Button
            text="(a) prepare"
            onPress={onPressPrepare}
          />
          <Button
            text="(b) onPressPrintText"
            onPress={() => onPressPrintText()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Container: React.FC<Props> = () => {

  const onPressPrepare = useCallback(async () => {
    try{
      console.log('call isConnected')

      const isConnected: boolean = await SunmiPrinterLibrary.connect()
      console.log(`isConnected is ${isConnected}`)

      console.log('call printerInit')

      const isPrinterInit: boolean = await SunmiPrinterLibrary.printerInit()
      console.log(`isPrinterInit is ${isPrinterInit}`)

      const printerSerialNo: string = await SunmiPrinterLibrary.getPrinterSerialNo()
      console.log(`printerSerialNo is ${printerSerialNo}`)

      const printerVersion = await SunmiPrinterLibrary.getPrinterVersion()
      console.log(`printerVersion is ${printerVersion}`)
            
      const serviceVersion = await SunmiPrinterLibrary.getServiceVersion()
      console.log(`serviceVersion is ${serviceVersion}`)
            
      const printerModal = await SunmiPrinterLibrary.getPrinterModal()
      console.log(`serviceVersion is ${printerModal}`)

      const printerPaper = await SunmiPrinterLibrary.getPrinterPaper()
      console.log(`printerPaper is ${printerPaper}`)

    } catch(error: any) {
      console.warn(error)
    }
  }, [])

  const onPressPrintText = useCallback(async () => {
    try {
      const text = 'あいうえおabc'
      console.log(`onPressPrintText: ${text}`)
      SunmiPrinterLibrary.printText(text)
      console.log('onPressPrintText: done')
    } catch(error: any) {
      console.warn(error)
    }
  }, [])

  return (
    <Component
      onPressPrepare={onPressPrepare}
      onPressPrintText={onPressPrintText}
    />
  )
}

export { Container as Main }

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#ffffff',
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
})
