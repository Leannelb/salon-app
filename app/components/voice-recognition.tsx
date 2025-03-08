// components/voice-recognition.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Voice from '@react-native-voice/voice';

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type VoiceRecognitionProps = {
  onResult: (text: string) => void;
  onNavigate?: () => void;
};

export default function VoiceRecognition({ onResult, onNavigate }: VoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const [webSpeechRecognition, setWebSpeechRecognition] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Setup Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const result = event.results[0][0].transcript;
          setText(result);
          if (onResult) {
            onResult(result);
            if (onNavigate) onNavigate();
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setWebSpeechRecognition(recognition);
      }
    } else {
      // Setup React Native Voice
      function onSpeechResults(e: any) {
        setText(e.value[0]);
        if (onResult) {
          onResult(e.value[0]);
          if (onNavigate) onNavigate();
        }
      }

      Voice.onSpeechResults = onSpeechResults;
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }
  }, [onResult, onNavigate]);

  const toggleListening = async () => {
    try {
      if (isListening) {
        if (Platform.OS === 'web') {
          webSpeechRecognition?.stop();
        } else {
          await Voice.stop();
        }
        setIsListening(false);
      } else {
        setText('');
        if (Platform.OS === 'web') {
          if (webSpeechRecognition) {
            webSpeechRecognition.start();
            setIsListening(true);
          } else {
            setText('Speech recognition not supported in this browser');
          }
        } else {
          await Voice.start('en-US');
          setIsListening(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.transcript}>{text}</Text>
      <IconButton 
        icon={isListening ? "microphone-off" : "microphone"} 
        size={40}
        iconColor={isListening ? "#E53935" : "#4CAF50"}
        mode="contained"
        containerColor="transparent"
        onPress={toggleListening}
      />
      <Text>{isListening ? 'Listening...' : 'Tap to speak'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  transcript: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});