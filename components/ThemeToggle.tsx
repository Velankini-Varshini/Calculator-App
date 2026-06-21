
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface Props {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({
  darkMode,
  toggleTheme,
}: Props) {
  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text
        style={{
          color: darkMode ? '#fff' : '#000',
          fontSize: 24,
        }}
      >
        {darkMode ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}