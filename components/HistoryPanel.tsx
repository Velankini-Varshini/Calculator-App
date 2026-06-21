import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  history: string[];
  clearHistory: () => void;
}

export default function HistoryPanel({
  history,
  clearHistory,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>History</Text>

        <TouchableOpacity onPress={clearHistory}>
          <Text style={styles.clear}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        renderItem={({ item }: { item: string }) => (
          <Text style={styles.item}>{item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  clear: {
    fontSize: 22,
  },

  item: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 18,
  },
});