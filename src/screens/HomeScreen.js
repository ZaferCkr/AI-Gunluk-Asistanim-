import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { DiaryContext } from '../context/DiaryContext';
import { analyzeMood } from '../services/aiService';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { addEntry } = useContext(DiaryContext);

  const handleAnalyze = async () => {
    if (!text.trim()) return alert("Lütfen bir şeyler yaz!");
    
    setLoading(true);
    Keyboard.dismiss();

    // AI Servisini Çağır
    const aiResult = await analyzeMood(text);

    if (aiResult) {
      const newEntry = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleString(),
        ...aiResult
      };
      
      addEntry(newEntry); // Hafızaya kaydet
      setResult(aiResult); // Ekranda göster
      setText(''); 
    }
    setLoading(false);
  };

  // Duyguya göre renk: Pozitifse Sarı, Negatifse Gri/Mavi [cite: 29]
  const bgColor = result?.mood === 'positive' ? '#FFF9C4' : (result ? '#CFD8DC' : '#F5F5F5');

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.header}>AI Günlük Asistanım 🦉</Text>
      
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Bugün nasıl hissediyorsun? (İngilizce yaz)"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity style={styles.btn} onPress={handleAnalyze} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.btnText}>Analiz Et ✨</Text>}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.moodTitle}>
            {result.mood === 'positive' ? '😊 HARİKA GEÇİYOR!' : result.mood === 'negative' ? '😔 ZOR BİR GÜN' : '😐 ORTA BİR GÜN'}
          </Text>
          <Text style={styles.label}>Özet: {result.summary}</Text>
          <Text style={styles.label}>Öneri: {result.suggestion}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 5 },
  input: { minHeight: 100, fontSize: 16, textAlignVertical: 'top', marginBottom: 20, color: '#333' },
  btn: { backgroundColor: '#6200ee', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultBox: { marginTop: 20, padding: 20, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10 },
  moodTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  label: { fontSize: 14, marginTop: 5, color: '#444' }
});

export default HomeScreen;