import React from 'react';
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import Text from "./Text";

interface SizeItemProps {
  selected: boolean;
  value: string;
  onPress: () => void;
}

const SizeItem: React.FC<SizeItemProps> = ({ selected, value, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View>
        <Text>{value}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}
