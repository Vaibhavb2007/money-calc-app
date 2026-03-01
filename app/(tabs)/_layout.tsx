import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#059669', // Your green color
      headerShown: false, 
      tabBarStyle: {
        // We are making the bar safely taller here (75 on web, 65 on mobile)
        height: Platform.OS === 'web' ? 75 : 65, 
        // Pushes the text up from the absolute bottom edge
        paddingBottom: Platform.OS === 'web' ? 15 : 10, 
        // Pushes the icon down from the top edge
        paddingTop: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12, 
        fontWeight: 'bold', // Makes it slightly thicker and easier to read
      }
    }}>
      
      {/* Tab 1: Money Counter (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Money calc',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      
      {/* Tab 2: Scientific Calculator (Explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color }) => <FontAwesome name="calculator" size={24} color={color} />,
        }}
      />
      
    </Tabs>
  );
}