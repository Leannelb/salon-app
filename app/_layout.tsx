import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="screens/stylist-selection" 
        options={{ 
          title: 'Select Stylist',
          headerShown: true 
        }} 
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
