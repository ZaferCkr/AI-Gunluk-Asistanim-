import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const savedData = await AsyncStorage.getItem('diaryEntries');
      if (savedData) setEntries(JSON.parse(savedData));
    } catch (e) {
      console.error("Yükleme hatası:", e);
    }
  };

  const addEntry = async (newEntry) => {
    const updated = [newEntry, ...entries];
    setEntries(updated);
    await AsyncStorage.setItem('diaryEntries', JSON.stringify(updated));
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};