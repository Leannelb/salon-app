import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/salon-bg.jpeg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Our Salon</Text>
          <Text style={styles.subtitle}>Experience luxury and style</Text>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.bookButton}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            <Link href="/service-selection" style={styles.buttonText}>
              Book Now
            </Link>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  bookButton: {
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: '#2196F3',
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});