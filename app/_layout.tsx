import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="screens/stylist-selection" 
          options={{ 
            title: 'Select Stylist',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="screens/branch-selection" 
          options={{ 
            title: 'Select Your Branch',
            headerShown: true 
          }} 
        />
        <Stack.Screen 
          name="screens/date-time-selection" 
          options={{ 
            title: 'Select Appointment Date and Time',
            headerShown: true 
          }} 
        />
        <Stack.Screen name="booking-management" options={{ title: "My Appointments" }} />
        <Stack.Screen name="screens/booking-screen" options={{ title: "Create a New Appointment" }} />
        <Stack.Screen name="screens/booking-complete" options={{ title: "Appointment Confirmation" }} />
        <Stack.Screen name="screens/booking-management" options={{ title: "My Appointments" }} />
        <Stack.Screen name="screens/reschedule-assistant" options={{ title: "Rescheduling Assistant" }} />

        
        

        <Stack.Screen name="reschedule-assistant" options={{ title: "Reschedule" }} />      
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  )
}
