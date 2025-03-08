// screens/branch-selection.tsx
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { Text, Card, Button, Title, Paragraph, Chip } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CommandResult } from '../utils/voice-command-parser';

// Branch type definition
type Branch = {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
  phone: string;
  distance?: string; // Distance from user if location permissions granted
  features?: string[]; // Special features or services at this branch
};

// Mock branches data
const branches: Branch[] = [
  {
    id: 'downtown',
    name: 'Downtown Salon',
    address: '123 Main Street, Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=500',
    phone: '(555) 123-4567',
    distance: '1.2 miles',
    features: ['Parking Available', 'Wheelchair Accessible']
  },
  {
    id: 'uptown',
    name: 'Uptown Studio',
    address: '456 Park Avenue, Uptown',
    imageUrl: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?w=500',
    phone: '(555) 987-6543',
    distance: '3.5 miles',
    features: ['Wi-Fi', 'Coffee Bar']
  },
  // {
  //   id: 'westside',
  //   name: 'Westside Spa & Salon',
  //   address: '789 Ocean Boulevard, Westside',
  //   imageUrl: 'https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=500',
  //   phone: '(555) 456-7890',
  //   distance: '5.8 miles',
  //   features: ['Full Spa Services', 'Valet Parking']
  // },
  // {
  //   id: 'eastend',
  //   name: 'East End Beauty Bar',
  //   address: '321 Harbor Drive, East End',
  //   imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500',
  //   phone: '(555) 321-0987',
  //   distance: '4.2 miles',
  //   features: ['Late Hours', 'Kids Area']
  // }
];

export default function BranchSelection() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceId = params.serviceId as string;
  const command = params.command ? JSON.parse(params.command as string) as CommandResult : null;
  
  // Check if branch was detected in voice command
  const detectedBranchId = command?.branch || null;
  const [selectedBranch, setSelectedBranch] = useState<string | null>(detectedBranchId);
  
  const handleContinue = () => {
    if (selectedBranch) {
      // Navigate to stylist selection with both service and branch
      router.push({
        pathname: '/screens/stylist-selection',
        params: {
          serviceId,
          branchId: selectedBranch,
          command: JSON.stringify(command)
        }
      });
    }
  };

  const renderBranchItem = ({ item }: { item: Branch }) => (
    <Card
      style={[
        styles.branchCard,
        selectedBranch === item.id ? styles.selectedCard : null
      ]}
      onPress={() => setSelectedBranch(item.id)}
    >
      {item.imageUrl && (
        <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
      )}
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph style={styles.address}>{item.address}</Paragraph>
        <Text style={styles.phone}>{item.phone}</Text>
        {item.distance && (
          <Text style={styles.distance}>{item.distance} away</Text>
        )}
        
        <View style={styles.featuresContainer}>
          {item.features?.map(feature => (
            <Chip key={feature} style={styles.featureChip}>
              {feature}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Select Location
      </Text>
      
      {command?.branch && (
        <Text style={styles.voiceDetected}>
          Voice command detected: {branches.find(b => b.id === command.branch)?.name}
        </Text>
      )}
      
      <FlatList
        data={branches}
        renderItem={renderBranchItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.branchesList}
      />
      
      <Button
        mode="contained"
        onPress={handleContinue}
        disabled={!selectedBranch}
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
    backgroundColor: '#f5f5f5',
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
  branchesList: {
    paddingBottom: 16,
  },
  branchCard: {
    marginBottom: 16,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  cardImage: {
    height: 140,
  },
  address: {
    marginBottom: 4,
  },
  phone: {
    color: '#666',
    marginBottom: 4,
  },
  distance: {
    color: '#009688',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  featureChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
  },
  continueButton: {
    marginVertical: 16,
    paddingVertical: 8,
  },
});