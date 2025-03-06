// components/voice-recognition.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Voice from '@react-native-voice/voice';

type VoiceRecognitionProps = {
  onResult: (text: string) => void;
};

export default function VoiceRecognition({ onResult }: VoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    function onSpeechResults(e: any) {
      setText(e.value[0]);
      if (onResult) onResult(e.value[0]);
    }

    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const toggleListening = async () => {
    try {
      if (isListening) {
        await Voice.stop();
        setIsListening(false);
      } else {
        setText('');
        await Voice.start('en-US');
        setIsListening(true);
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