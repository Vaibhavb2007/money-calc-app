import React, { useRef, useState } from 'react';
import { Animated, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  
  // Button press animation
  const displayScale = useRef(new Animated.Value(1)).current;

  const handlePress = (val) => {
    // Small pop animation for realism
    Animated.sequence([
      Animated.timing(displayScale, { toValue: 1.05, duration: 80, useNativeDriver: true }),
      Animated.timing(displayScale, { toValue: 1, duration: 80, useNativeDriver: true })
    ]).start();

    if (val === 'AC') {
      setDisplay('0');
      setFormula('');
    } else if (val === 'DEL') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (val === '=') {
      try {
        let check = display.replace('×', '*').replace('÷', '/').replace('π', Math.PI).replace('e', Math.E);
        const result = eval(check);
        setFormula(display + ' =');
        setDisplay(result.toString().length > 10 ? result.toPrecision(6) : result.toString());
      } catch {
        setDisplay('Math Error');
      }
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  const buttons = [
    ['sin', 'cos', 'tan', 'π', 'e'],
    ['log', 'ln', '√', 'x²', 'xʸ'],
    ['(', ')', '%', 'AC', 'DEL'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.webCenterer}> 
        
        <View style={styles.calculatorBox}>
          <Text style={styles.brandTitle}>VAIBHAV'S SCIENTIFIC</Text>
          
          {/* LCD Display (FLEXIBLE HEIGHT) */}
          <View style={styles.screen}>
            <Text style={styles.formulaText}>{formula}</Text>
            <Animated.Text 
              style={[styles.displayText, { transform: [{ scale: displayScale }] }]}
              adjustsFontSizeToFit // Shrinks text if number gets too big
              numberOfLines={1}
            >
              {display}
            </Animated.Text>
          </View>

          {/* Keypad (FLEXIBLE HEIGHT) */}
          <View style={styles.keypad}>
            {buttons.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((btn) => (
                  <TouchableOpacity 
                    key={btn} 
                    onPress={() => handlePress(btn)}
                    style={[
                      styles.button,
                      ['AC', 'DEL'].includes(btn) ? styles.clearBtn : 
                      btn === '=' ? styles.equalBtn : 
                      isNaN(btn) && btn !== '.' ? styles.sciBtn : null
                    ]}
                  >
                    <Text style={styles.btnText}>{btn}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#020617' 
  },
  webCenterer: {
    flex: 1,
    justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
    alignItems: 'center',
    padding: Platform.OS === 'web' ? 20 : 0, // Removes padding on mobile to fill edges
  },
  calculatorBox: {
    flex: 1, // MAGIC WORD: Tells the box to take up available space
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 420 : '100%', // Keeps it slim on web, full width on mobile
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: Platform.OS === 'web' ? 30 : 0, // Curves on web, flat on mobile
    borderWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: '#334155',
    elevation: 20,
    shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20
  },
  brandTitle: { color: '#475569', fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, letterSpacing: 2 },
  screen: {
    flex: 0.3, // Takes up 30% of the calculator box height
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'flex-end', // Pushes text to the bottom
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#22c55e33'
  },
  formulaText: { color: '#64748b', fontSize: 14, marginBottom: 5 },
  displayText: { fontSize: 45, fontWeight: 'bold', color: '#4ade80' },
  keypad: { 
    flex: 0.7, // Takes up the remaining 70% of the calculator box height
    width: '100%',
    justifyContent: 'space-between' // Spreads rows evenly
  },
  row: { 
    flex: 1, // Each row takes an equal slice of the keypad area
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  button: { 
    flex: 1, // Buttons stretch equally within their row
    marginHorizontal: 4, // Replaces static width with flexible margins
    backgroundColor: '#334155', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  btnText: { fontSize: 16, fontWeight: 'bold', color: '#f1f5f9' },
  sciBtn: { backgroundColor: '#1e293b' },
  clearBtn: { backgroundColor: '#7f1d1d' },
  equalBtn: { backgroundColor: '#15803d' }
});