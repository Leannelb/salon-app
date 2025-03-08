// screens/booking-complete.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card, Avatar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  BookingComplete: undefined;
  Booking: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'BookingComplete'>;

export default function BookingComplete({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Avatar.Icon 
        icon="check-circle" 
        size={120} 
        style={styles.successIcon}
        color="#fff"
      />
      
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.heading}>
            Booking Confirmed!
          </Text>
          
          <Text style={styles.message}>
            Your appointment has been successfully booked. We've sent a confirmation 
            email with all the details.
          </Text>
          
          <Text style={styles.reminderText}>
            Please arrive 10 minutes before your appointment time.
          </Text>
        </Card.Content>
      </Card>
      
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Booking')}
        style={styles.button}
      >
        Book Another Appointment
      </Button>
      
      <Button
        mode="outlined"
        onPress={() => {
          // In a real app, this would navigate to a bookings management screen
          navigation.navigate('Booking');
        }}
        style={styles.button}
      >
        View My Bookings
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    backgroundColor: '#4CAF50',
    marginBottom: 24,
  },
  card: {
    width: '100%',
    marginBottom: 24,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#4CAF50',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  reminderText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    marginVertical: 8,
    width: '100%',
  },
});