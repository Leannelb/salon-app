import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, Button, Title, Paragraph } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommandResult } from '../utils/voice-command-parser';

// Service type definition
type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
};

// Mock services data
const services: Service[] = [
  {
    id: '1',
    name: 'Haircut',
    duration: 30,
    price: 35,
    description: 'Professional haircut tailored to your style preferences'
  },
  {
    id: '2',
    name: 'Coloring',
    duration: 90,
    price: 80,
    description: 'Full color treatment including roots and styling'
  },
  {
    id: '3',
    name: 'Styling',
    duration: 45,
    price: 50,
    description: 'Expert styling for special occasions or everyday looks'
  },
];

type RootStackParamList = {
  Booking: undefined;
  ServiceSelection: { command?: CommandResult };
  StylistSelection: { serviceId: string, command?: CommandResult };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceSelection'>;

export default function ServiceSelection({ navigation, route }: Props) {
  const command = route?.params?.command || null;
  const [selectedService, setSelectedService] = useState<string | null>(
    command?.service || null
  );

  const handleContinue = () => {
    if (selectedService) {
      navigation.navigate('StylistSelection', {
        serviceId: selectedService,
        command: command || undefined
      });
    }
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <Card
      style={[
        styles.serviceCard,
        selectedService === item.id ? styles.selectedCard : null
      ]}
      onPress={() => setSelectedService(item.id)}
    >
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.serviceDetails}>
          <Text style={styles.duration}>{item.duration} min</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Select a Service
      </Text>

      {command?.service && (
        <Text style={styles.voiceDetected}>
          Voice command detected: {services.find(s => s.id === command.service)?.name}
        </Text>
      )}

      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.servicesList}
      />

      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!selectedService}
        style={styles.continueButton}
      >
        Continue
      </Button>
    </View>
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
  voiceDetected: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  servicesList: {
    paddingBottom: 16,
  },
  serviceCard: {
    marginBottom: 12,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  duration: {
    color: '#666',
  },
  price: {
    fontWeight: 'bold',
  },
  continueButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});