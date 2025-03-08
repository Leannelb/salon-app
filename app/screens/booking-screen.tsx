// screens/booking-confirmation.tsx
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, TextInput, Title, Divider } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommandResult } from '../utils/voice-command-parser';

// Mock data for services and stylists
const services = [
  { id: '1', name: 'Haircut', price: 35 },
  { id: '2', name: 'Coloring', price: 80 },
  { id: '3', name: 'Styling', price: 50 },
];

const stylists = [
  { id: '1', name: 'John' },
  { id: '2', name: 'Sarah' },
  { id: '3', name: 'Michael' },
  { id: '4', name: 'Jessica' },
  { id: 'any', name: 'Any Available Stylist' },
];

type RootStackParamList = {
  DateTimeSelection: { serviceId: string, stylistId: string, command: CommandResult };
  BookingConfirmation: { 
    serviceId: string,
    stylistId: string,
    date: string,
    time: string,
    command: CommandResult
  };
  BookingComplete: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmation'>;

export default function BookingConfirmation({ navigation, route }: Props) {
  const { serviceId, stylistId, date, time, command } = route.params;
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  
  // Find service and stylist details
  const service = services.find(s => s.id === serviceId);
  const stylist = stylists.find(s => s.id === stylistId);
  
  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Handle confirmation
  const handleConfirm = () => {
    if (!name || !email || !phone || !cardNumber || !cardExpiry || !cardCvc) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }
    
    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      navigation.navigate('BookingComplete');
    }, 1500);
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Booking Summary
      </Text>
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title>Appointment Details</Title>
          <Text style={styles.detailText}>Service: {service?.name}</Text>
          <Text style={styles.detailText}>Stylist: {stylist?.name}</Text>
          <Text style={styles.detailText}>Date: {formatDisplayDate(date)}</Text>
          <Text style={styles.detailText}>Time: {time}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.priceText}>Price: ${service?.price.toFixed(2)}</Text>
        </Card.Content>
      </Card>
      
      <Card style={styles.formCard}>
        <Card.Content>
          <Title>Your Information</Title>
          
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
          />
          
          <TextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />
        </Card.Content>
      </Card>
      
      <Card style={styles.formCard}>
        <Card.Content>
          <Title>Payment Details</Title>
          
          <TextInput
            label="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            mode="outlined"
            keyboardType="number-pad"
            style={styles.input}
            maxLength={16}
          />
          
          <View style={styles.cardRowContainer}>
            <TextInput
              label="Expiry (MM/YY)"
              value={cardExpiry}
              onChangeText={setCardExpiry}
              mode="outlined"
              style={[styles.input, styles.cardRowInput]}
              maxLength={5}
            />
            
            <TextInput
              label="CVC"
              value={cardCvc}
              onChangeText={setCardCvc}
              mode="outlined"
              keyboardType="number-pad"
              style={[styles.input, styles.cardRowInput]}
              maxLength={3}
              secureTextEntry
            />
          </View>
        </Card.Content>
      </Card>
      
      <Button
        mode="contained"
        onPress={handleConfirm}
        loading={processing}
        disabled={processing}
        style={styles.confirmButton}
      >
        {processing ? 'Processing...' : 'Confirm Booking'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
  divider: {
    marginVertical: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  formCard: {
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardRowInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  confirmButton: {
    marginVertical: 24,
    paddingVertical: 8,
  },
});