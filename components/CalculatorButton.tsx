import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  type: 'number' | 'operator' | 'special';
}

export default function CalculatorButton({
  title,
  onPress,
  type,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'number'
          ? styles.number
          : type === 'operator'
          ? styles.operator
          : styles.special,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 78,
    height: 78,
    borderRadius: 39,
    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {
    backgroundColor: '#2C2C2C',
  },

  operator: {
    backgroundColor: '#FF9500',
  },

  special: {
    backgroundColor: '#505050',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});