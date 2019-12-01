import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginLeft: 25
  },
  errorText: {
    color: 'red'
  }
})

export default ErrorMessage
