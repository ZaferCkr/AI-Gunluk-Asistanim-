import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DiaryContext } from '../context/DiaryContext';

const HistoryScreen = () => {
  const { entries } = useContext(DiaryContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderLeftColor: item.mood === 'positive' ? '#FFD700' : '#78909C' }]}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.mood}>
              {item.mood === 'positive' ? '😊' : item.mood === 'negative' ? '😔' : '😐'} {item.summary}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Henüz kayıt yok.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, borderLeftWidth: 5, elevation: 2 },
  date: { fontSize: 12, color: '#888', marginBottom: 5 },
  text: { fontSize: 16, color: '#333', marginBottom: 10 },
  mood: { fontSize: 14, color: '#555', fontStyle: 'italic' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#aaa' }
});

export default HistoryScreen;