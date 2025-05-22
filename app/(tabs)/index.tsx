import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomCard } from '@/components/ui/CustomCard';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m your spiritual companion. How can I assist you today?',
    isUser: false,
    timestamp: new Date(),
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    // Simulate assistant response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for sharing. I\'m here to support your spiritual journey.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);

    Keyboard.dismiss();
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userMessageText : styles.botMessageText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spiritual Companion</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <PrimaryButton
          title=""
          onPress={handleSend}
          icon={<MaterialCommunityIcons name="send" size={20} color="white" />}
          size="md"
          style={styles.sendButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    ...theme.shadows.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  messagesList: {
    padding: theme.spacing.md,
    paddingBottom: 100, // Extra padding for input
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary.main,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background.paper,
  },
  messageText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.body,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  botMessageText: {
    color: theme.colors.text.primary,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.paper,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    ...theme.shadows.md,
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    marginLeft: theme.spacing.sm,
  },
});