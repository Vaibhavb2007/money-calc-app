import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MoneyCalculator() {
  const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  const [counts, setCounts] = useState({});

  const updateCount = (note, value) => {
    // Blocks letters and symbols, allowing only numbers
    const cleanNumber = value.replace(/[^0-9]/g, '');
    setCounts({ ...counts, [note]: parseInt(cleanNumber) || 0 });
  };

  // Function to clear all inputs
  const resetAll = () => setCounts({});

  const calculateTotal = () => {
    return denominations.reduce((sum, val) => sum + (val * (counts[val] || 0)), 0);
  };

  return (
    <LinearGradient colors={['#f0fdf4', '#ffffff']} style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        
        {/* Updated Header with your name */}
        <View style={styles.header}>
          <View style={styles.emojiContainer}>
            <Text style={styles.logoEmoji}>💰</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Vaibhav's</Text>
            <Text style={styles.headerSubtitle}>Smart Money ₹ Counter</Text>
          </View>
          {/* Reset Button */}
          <TouchableOpacity onPress={resetAll} style={styles.resetBtn}>
            <Text style={styles.resetText}>🔄</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {denominations.map((note) => (
            <View key={note} style={styles.card}>
              <View style={styles.noteLabelGroup}>
                <Text style={styles.cashEmoji}>💵</Text>
                <Text style={styles.label}>₹{note}</Text>
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="number-pad" 
                inputMode="numeric"       
                onChangeText={(text) => updateCount(note, text)}
                value={counts[note] ? counts[note].toString() : ''}
              />
              
              <Text style={styles.subTotal}>₹{(note * (counts[note] || 0)).toLocaleString('en-IN')}</Text>
            </View>
          ))}
          <View style={{height: 150}} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <LinearGradient colors={['#16a34a', '#14532d']} style={styles.footer}>
            <Text style={styles.totalLabel}>Total Cash Balance</Text>
            <Text style={styles.totalValue}>₹ {calculateTotal().toLocaleString('en-IN')}</Text>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    paddingTop: Platform.OS === 'web' ? 20 : 50 
  },
  emojiContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoEmoji: { fontSize: 28 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#166534' },
  headerSubtitle: { fontSize: 20, fontWeight: '900', color: '#064e3b' },
  resetBtn: { padding: 10, backgroundColor: '#fff', borderRadius: 50, elevation: 2 },
  resetText: { fontSize: 20 },
  list: { paddingHorizontal: 20 },
  card: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#fff', 
    marginBottom: 8, 
    padding: 12, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcfce7'
  },
  noteLabelGroup: { flexDirection: 'row', alignItems: 'center', width: 80 },
  cashEmoji: { fontSize: 16, marginRight: 5 },
  label: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  input: { 
    backgroundColor: '#f8fafc', 
    width: 80, 
    padding: 8, 
    borderRadius: 8, 
    textAlign: 'center', 
    fontSize: 18, 
    borderWidth: 1, 
    borderColor: '#cbd5e1',
    fontWeight: 'bold'
  },
  subTotal: { fontSize: 16, fontWeight: '600', color: '#15803d', width: 100, textAlign: 'right' },
  footerContainer: { position: 'absolute', bottom: 0, width: '100%', padding: 20 },
  footer: { padding: 25, borderRadius: 25, alignItems: 'center' },
  totalLabel: { color: '#bbf7d0', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  totalValue: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
});