import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // A Stack hides the root navigation and just shows the active screen
    <Stack>
      {/* This loads your Home/Calculator tabs without showing a top header */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* This loads any modal screens you might have later */}
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Info' }} />
    </Stack>
  );
}