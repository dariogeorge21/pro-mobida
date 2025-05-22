import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { theme } from '@/styles/theme';
import { CustomCard } from '@/components/ui/CustomCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from '@/components/ui/IconButton';
import NRSVBible, {
  Book,
  Chapter,
  Verse,
  getBookById,
  getBooksByTestament,
  getBooksByCategory,
  getChapter,
  getNextChapter,
  getPreviousChapter
} from '@/data/NRSV-bible';

type BibleState = 'books' | 'chapters' | 'verses';

export default function BibleScreen() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<BibleState>('books');
  const [bibleBooks, setBibleBooks] = useState<Book[]>([]);
  const [currentTestament, setCurrentTestament] = useState<'old' | 'new'>('new');

  // Load books when component mounts
  useEffect(() => {
    setBibleBooks(getBooksByTestament(currentTestament));
  }, [currentTestament]);

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

  const toggleTestament = () => {
    setCurrentTestament(currentTestament === 'old' ? 'new' : 'old');
  };

  const renderBook = ({ item }: { item: Book }) => (
    <Animated.View entering={FadeInRight.duration(400).delay(100)} style={{ flex: 1, maxWidth: '48%' }}>
      <CustomCard
        style={styles.bookCard}
        onPress={() => handleBookSelect(item.id)}
      >
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.bookChapters}>{item.chapters.length} chapters</Text>
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
  const book = getBookById(selectedBook || '');

  // Generate array of chapter numbers
  const chapters = book ? Array.from({ length: book.chapters.length }, (_, i) => i + 1) : [];

  // Render Bible books grid
  const renderBooksView = () => (
    <>
      <View style={styles.testamentToggle}>
        <Pressable
          style={[styles.testamentButton, currentTestament === 'old' && styles.activeTestament]}
          onPress={() => setCurrentTestament('old')}
        >
          <Text style={styles.testamentButtonText}>Old Testament</Text>
        </Pressable>
        <Pressable
          style={[styles.testamentButton, currentTestament === 'new' && styles.activeTestament]}
          onPress={() => setCurrentTestament('new')}
        >
          <Text style={styles.testamentButtonText}>New Testament</Text>
        </Pressable>
      </View>
      <FlatList
        data={bibleBooks}
        renderItem={renderBook}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.bookGrid}
        contentContainerStyle={styles.booksList}
        showsVerticalScrollIndicator={false}
      />
    </>
  );

  // Render chapters grid
  const renderChaptersView = () => (
    <View style={styles.chapterContainer}>
      <View style={styles.navigationHeader}>
        <IconButton
          icon={<MaterialCommunityIcons name="chevron-left" size={24} color={theme.colors.primary.main} />}
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
        columnWrapperStyle={{ justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // Render verses
  const renderVersesView = () => {
    // Get the current chapter data
    const currentChapter = book && selectedChapter
      ? book.chapters.find(ch => ch.number === selectedChapter)
      : null;

    // Handle next chapter navigation
    const handleNextChapter = () => {
      if (book && selectedChapter) {
        const nextChapterIndex = book.chapters.findIndex(ch => ch.number === selectedChapter) + 1;
        if (nextChapterIndex < book.chapters.length) {
          setSelectedChapter(book.chapters[nextChapterIndex].number);
        }
      }
    };

    // Handle previous chapter navigation
    const handlePreviousChapter = () => {
      if (book && selectedChapter) {
        const prevChapterIndex = book.chapters.findIndex(ch => ch.number === selectedChapter) - 1;
        if (prevChapterIndex >= 0) {
          setSelectedChapter(book.chapters[prevChapterIndex].number);
        }
      }
    };

    return (
      <View style={styles.versesContainer}>
        <View style={styles.navigationHeader}>
          <IconButton
            icon={<MaterialCommunityIcons name="chevron-left" size={24} color={theme.colors.primary.main} />}
            onPress={navigateBack}
            variant="ghost"
          />
          <Text style={styles.navigationTitle}>{book?.name} {selectedChapter}</Text>
          <IconButton
            icon={<MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.primary.main} />}
            onPress={handleNextChapter}
            variant="ghost"
            disabled={!book || !selectedChapter || !currentChapter || selectedChapter === book.chapters[book.chapters.length - 1].number}
          />
        </View>

        <ScrollView style={styles.versesList}>
          {currentChapter?.verses.map(verse => (
            <View key={verse.number.toString()} style={styles.verseContainer}>
              <Text style={styles.verseNumber}>{verse.number}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Holy Bible</Text>
        <IconButton
          icon={<MaterialCommunityIcons name="magnify" size={22} color={theme.colors.text.secondary} />}
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
    width: '100%',
  },
  bookCard: {
    flex: 1,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    alignSelf: 'stretch',
    height: 100, // Fixed height for consistency
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
    justifyContent: 'center',
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
  // New styles for testament toggle
  testamentToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
  },
  testamentButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTestament: {
    backgroundColor: theme.colors.primary.main,
  },
  testamentButtonText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    color: theme.colors.text.primary,
  },
});