import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import CalculatorButton from '../components/CalculatorButton';
import HistoryPanel from '../components/HistoryPanel';
import ThemeToggle from '../components/ThemeToggle';
import { evaluateExpression } from '../utils/calculator';
import { formatNumber } from '../utils/formatter';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((d) => !d);

  const handlePress = (value: string) => {
    try {
      // CLEAR
      if (value === 'C') {
        setInput('');
        setJustCalculated(false);
        return;
      }

      // BACKSPACE
      if (value === '⌫') {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      // PERCENT
      if (value === '%') {
        setInput((prev) => {
          if (!prev) return '';
          const num = parseFloat(prev);
          if (isNaN(num)) return prev;
          return (num / 100).toString();
        });
        return;
      }

      // HISTORY TOGGLE
      if (value === '🕘') {
        setShowHistory((prev) => !prev);
        return;
      }

      // EQUALS
      if (value === '=') {
        if (!input) return;

        const result = evaluateExpression(input);

        setHistory((prev) => [`${input} = ${result}`, ...prev]);
        setInput(result);
        setJustCalculated(true);
        return;
      }

      // NUMBER / OPERATOR INPUT
      setInput((prev) => {
        const operators = ['+', '-', '×', '÷'];

        // after calculation, start new input unless operator pressed
        if (justCalculated && !operators.includes(value)) {
          setJustCalculated(false);
          return value;
        }

        setJustCalculated(false);
        return prev + value;
      });

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
      setInput('Error');
    }
  };

  const buttons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['🕘', '0', '.', '='],
  ];

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#f5f5f5' }]}>

      <View style={styles.header}>
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </View>

      {showHistory && (
        <HistoryPanel
          history={history}
          clearHistory={() => setHistory([])}
        />
      )}

      <Text style={[styles.display, { color: darkMode ? '#fff' : '#000' }]}>
        {(() => {
          if (!input) return '0';
          if (/^[0-9.]+$/.test(input)) return formatNumber(input);
          return input;
        })()}
      </Text>

      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((btn) => (
            <CalculatorButton
              key={btn}
              title={btn}
              onPress={() => handlePress(btn)}
              type={
                ['+', '-', '×', '÷', '='].includes(btn)
                  ? 'operator'
                  : ['C', '⌫', '%', '🕘'].includes(btn)
                  ? 'special'
                  : 'number'
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  display: {
    fontSize: 60,
    textAlign: 'right',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});