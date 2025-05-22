import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { theme } from '@/styles/theme';
import { CustomCard } from '@/components/ui/CustomCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { IconButton } from '@/components/ui/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data
const PRAYER_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'morning', name: 'Morning' },
  { id: 'evening', name: 'Evening' },
  { id: 'gratitude', name: 'Gratitude' },
  { id: 'healing', name: 'Healing' },
  { id: 'family', name: 'Family' },
];

const PRAYERS = [
  {
    id: '1',
    title: 'Morning Prayer',
    text: 'Lord, as I begin this day, I thank you for your presence. Guide my thoughts, words, and actions, so that I may walk in your light and love. Amen.',
    category: 'morning',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Prayer for Healing',
    text: 'Heavenly Father, I come before you asking for your healing touch. In your mercy, heal my body, mind, and spirit. I trust in your goodness and your power to restore. Amen.',
    category: 'healing',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Evening Reflection',
    text: 'As this day comes to a close, I thank you for your care and protection. Forgive my shortcomings and grant me peaceful rest, that I may rise refreshed to serve you tomorrow. Amen.',
    category: 'evening',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Family Blessing',
    text: 'Lord, bless my family with your abundant love. Protect us from harm, guide our decisions, and help us grow in faith and unity. May our home be filled with your peace. Amen.',
    category: 'family',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Prayer of Thanksgiving',
    text: 'Gracious God, I lift my heart in thanks for all your blessings. For life, love, and the beauty of creation, I am truly grateful. Help me to live each day with a thankful heart. Amen.',
    category: 'gratitude',
    isFavorite: true,
  },
];

export default function PrayersScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrayer, setSelectedPrayer] = useState<typeof PRAYERS[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const modalScale = useSharedValue(0.9);

  const filteredPrayers = PRAYERS.filter(prayer =>
    (selectedCategory === 'all' || prayer.category === selectedCategory) &&
    (searchQuery === '' ||
      prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePrayerSelect = (prayer: typeof PRAYERS[0]) => {
    setSelectedPrayer(prayer);
    setModalVisible(true);
    modalScale.value = withTiming(1, { duration: 300 });
  };

  const closeModal = () => {
    modalScale.value = withTiming(0.9, { duration: 200 });
    setTimeout(() => {
      setModalVisible(false);
      setSelectedPrayer(null);
    }, 200);
  };

  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalScale.value }],
    };
  });

  const renderCategory = ({ item }: { item: typeof PRAYER_CATEGORIES[0] }) => (
    <Pressable
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.selectedCategoryChip
      ]}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  const renderPrayer = ({ item }: { item: typeof PRAYERS[0] }) => (
    <Animated.View entering={FadeIn.duration(400).delay(100)}>
      <CustomCard
        style={styles.prayerCard}
        onPress={() => handlePrayerSelect(item)}
      >
        <Text style={styles.prayerTitle}>{item.title}</Text>
        <Text style={styles.prayerPreview} numberOfLines={2}>
          {item.text}
        </Text>
      </CustomCard>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prayer Collection</Text>
        <IconButton
          icon={<MaterialCommunityIcons name="plus" size={22} color={theme.colors.text.secondary} />}
          onPress={() => {}}
          variant="ghost"
        />
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search prayers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <IconButton
            icon={<MaterialCommunityIcons name="close" size={18} color={theme.colors.text.secondary} />}
            onPress={() => setSearchQuery('')}
            variant="ghost"
            size="sm"
            style={styles.clearButton}
          />
        )}
      </View>

      <FlatList
        data={PRAYER_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      <FlatList
        data={filteredPrayers}
        renderItem={renderPrayer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.prayersList}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, animatedModalStyle]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedPrayer?.title}
              </Text>
              <IconButton
                icon={<MaterialCommunityIcons name="close" size={22} color={theme.colors.text.secondary} />}
                onPress={closeModal}
                variant="ghost"
              />
            </View>

            <Text style={styles.prayerText}>
              {selectedPrayer?.text}
            </Text>

            <View style={styles.modalActions}>
              <PrimaryButton
                title="Pray Now"
                onPress={() => {}}
                style={styles.prayButton}
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.primary,
  },
  clearButton: {
    marginLeft: theme.spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.rounded,
    backgroundColor: theme.colors.background.paper,
    marginRight: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  selectedCategoryChip: {
    backgroundColor: theme.colors.primary.main,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    color: theme.colors.text.primary,
  },
  selectedCategoryText: {
    color: 'white',
  },
  prayersList: {
    padding: theme.spacing.md,
    paddingBottom: 100, // Extra space for tab bar
  },
  prayerCard: {
    marginBottom: theme.spacing.md,
  },
  prayerTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.subheading,
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  prayerPreview: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    width: '90%',
    maxHeight: '80%',
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.h2,
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text.primary,
    flex: 1,
  },
  prayerText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: 'Baskerville-Regular',
    color: theme.colors.text.primary,
    lineHeight: 26,
    marginBottom: theme.spacing.lg,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  prayButton: {
    width: '100%',
  },
});