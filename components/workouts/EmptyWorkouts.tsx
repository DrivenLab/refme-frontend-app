import { View, Text } from 'react-native'
import React from 'react'
type Props = {
    isUpToDate?: boolean;
    isEmpty?: boolean;
  };
const EmptyWorkouts = ({isEmpty,isUpToDate}:Props) => {
  return (
    <View>
      <Text>EmptyWorkouts</Text>
    </View>
  )
}

export default EmptyWorkouts