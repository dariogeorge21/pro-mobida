import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { theme } from '@/styles/theme';
import { CustomCard } from '@/components/ui/CustomCard';
import { ChevronLeft, ChevronRight, BookOpen, Search } from 'lucide-react-native';
import { IconButton } from '@/components/ui/IconButton';

// Mock data
const BIBLE_BOOKS = [
  { id: 'genesis', name: 'Genesis', chapters: 50 },
  { id: 'exodus', name: 'Exodus', chapters: 40 },
  { id: 'leviticus', name: 'Leviticus', chapters: 27 },
  { id: 'numbers', name: 'Numbers', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34 },
  { id: 'matthew', name: 'Matthew', chapters: 28 },
  { id: 'mark', name: 'Mark', chapters: 16 },
  { id: 'luke', name: 'Luke', chapters: 24 },
  { id: 'john', name: 'John', chapters: 21 },
  { id: 'acts', name: 'Acts', chapters: 28 },
];

// Sample verse content for demonstration
const SAMPLE_VERSES = [
  { id: '1', verse: 1, text: 'In the beginning God created the heavens and the earth.' },
  { id: '2', verse: 2, text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.' },
  { id: '3', verse: 3, text: 'And God said, "Let there be light," and there was light.' },
  { id: '4', verse: 4, text: 'God saw that the light was good, and he separated the light from the darkness.' },
  { id: '5', verse: 5, text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.' },
  { id: '6', verse: 6, text: 'And God said, "Let there be a vault between the waters to separate water from water."' },
  { id: '7', verse: 7, text: 'So God made the vault and separated the water under the vault from the water above it. And it was so.' },
];

type BibleState = 'books' | 'chapters' | 'verses';

export default function BibleScreen() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<BibleState>('books');
  
  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId);
    setCurrentView('chapters');
  };
  
  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setCurrentView('verses');
  };
  
  const navigateBack = () => {
    if (currentView === 'verses') {
      setCurrentView('chapters');
      setSelectedChapter(null);
    } else if (currentView === 'chapters') {
      setCurrentView('books');
      setSelectedBook(null);
    }
  };
  
  const renderBook = ({ item }: { item: typeof BIBLE_BOOKS[0] }) => (
    <Animated.View entering={FadeInRight.duration(400).delay(100)}>
      <CustomCard 
        style={styles.bookCard} 
        onPress={() => handleBookSelect(item.id)}
      >
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.bookChapters}>{item.chapters} chapters</Text>
      </CustomCard>
    </Animated.View>
  );
  
  const renderChapterNumber = ({ item }: { item: number }) => (
    <Pressable
      style={styles.chapterNumber}
      onPress={() => handleChapterSelect(item)}
    >
      <Text style={styles.chapterNumberText}>{item}</Text>
    </Pressable>
  );
  
  // Find the selected book
  const book = BIBLE_BOOKS.find(b => b.id === selectedBook);
  
  // Generate array of chapter numbers
  const chapters = book ? Array.from({ length: book.chapters }, (_, i) => i + 1) : [];
  
  // Render Bible books grid
  const renderBooksView = () => (
    <FlatList
      data={BIBLE_BOOKS}
      renderItem={renderBook}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.bookGrid}
      contentContainerStyle={styles.booksList}
    />
  );
  
  // Render chapters grid
  const renderChaptersView = () => (
    <View style={styles.chapterContainer}>
      <View style={styles.navigationHeader}>
        <IconButton
          icon={<ChevronLeft size={24} color={theme.colors.primary.main} />}
          onPress={navigateBack}
          variant="ghost"
        />
        <Text style={styles.navigationTitle}>{book?.name}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <FlatList
        data={chapters}
        renderItem={renderChapterNumber}
        keyExtractor={item => item.toString()}
        numColumns={5}
        contentContainerStyle={styles.chapterGrid}
      />
    </View>
  );
  
  // Render verses
  const renderVersesView = () => (
    <View style={styles.versesContainer}>
      <View style={styles.navigationHeader}>
        <IconButton
          icon={<ChevronLeft size={24} color={theme.colors.primary.main} />}
          onPress={navigateBack}
          variant="ghost"
        />
        <Text style={styles.navigationTitle}>{book?.name} {selectedChapter}</Text>
        <IconButton
          icon={<ChevronRight size={24} color={theme.colors.primary.main} />}
          onPress={() => {
            if (book && selectedChapter && selectedChapter < book.chapters) {
              setSelectedChapter(selectedChapter + 1);
            }
          }}
          variant="ghost"
          disabled={!book || !selectedChapter || selectedChapter >= book.chapters}
        />
      </View>
      
      <ScrollView style={styles.versesList}>
        {SAMPLE_VERSES.map(verse => (
          <View key={verse.id} style={styles.verseContainer}>
            <Text style={styles.verseNumber}>{verse.verse}</Text>
            <Text style={styles.verseText}>{verse.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Holy Bible</Text>
        <IconButton
          icon={<Search size={22} color={theme.colors.text.secondary} />}
          onPress={() => {}}
          variant="ghost"
        />
      </View>
      
      {currentView === 'books' && renderBooksView()}
      {currentView === 'chapters' && renderChaptersView()}
      {currentView === 'verses' && renderVersesView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  booksList: {
    padding: theme.spacing.md,
  },
  bookGrid: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  bookCard: {
    width: '48%',
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  bookTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.subheading,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  bookChapters: {
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.secondary,
  },
  chapterContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  navigationTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.subheading,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  chapterGrid: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  chapterNumber: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  chapterNumberText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    color: theme.colors.text.primary,
  },
  versesContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  versesList: {
    flex: 1,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  verseNumber: {
    fontSize: theme.typography.fontSize.small,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    color: theme.colors.primary.main,
    marginRight: theme.spacing.sm,
    width: 20,
    textAlign: 'center',
  },
  verseText: {
    flex: 1,
    fontSize: theme.typography.fontSize.body,
    fontFamily: 'Baskerville-Regular',
    color: theme.colors.text.primary,
    lineHeight: 24,
  },
});