import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { theme } from '@/styles/theme';
import { IconButton } from '@/components/ui/IconButton';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react-native';

// Mock data
const MEDIA_ITEMS = [
  {
    id: '1',
    title: 'The Beatitudes',
    subtitle: 'Sermon on the Mount',
    type: 'sermon',
    imageUrl: 'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Amazing Grace',
    subtitle: 'Classic Hymns',
    type: 'music',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Finding Peace',
    subtitle: 'Guided Meditation',
    type: 'meditation',
    imageUrl: 'https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Daily Scripture',
    subtitle: 'Matthew 5:14-16',
    type: 'scripture',
    imageUrl: 'https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'Prayer for Healing',
    subtitle: 'Guided Prayer',
    type: 'prayer',
    imageUrl: 'https://images.pexels.com/photos/267037/pexels-photo-267037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const MEDIA_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'sermon', name: 'Sermons' },
  { id: 'music', name: 'Music' },
  { id: 'meditation', name: 'Meditation' },
  { id: 'scripture', name: 'Scripture' },
  { id: 'prayer', name: 'Prayers' },
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.85;

export default function MediaScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentItem, setCurrentItem] = useState<typeof MEDIA_ITEMS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const filteredMedia = MEDIA_ITEMS.filter(
    item => selectedCategory === 'all' || item.type === selectedCategory
  );
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleMediaSelect = (item: typeof MEDIA_ITEMS[0]) => {
    setCurrentItem(item);
    setIsPlaying(true);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const renderCategory = ({ item }: { item: typeof MEDIA_CATEGORIES[0] }) => (
    <Pressable
      style={[
        styles.categoryTab,
        selectedCategory === item.id && styles.selectedCategoryTab
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
      {selectedCategory === item.id && <View style={styles.activeIndicator} />}
    </Pressable>
  );
  
  const renderMediaItem = ({ item }: { item: typeof MEDIA_ITEMS[0] }) => (
    <Animated.View entering={FadeIn.duration(400)} style={styles.mediaItemContainer}>
      <Pressable
        style={styles.mediaTile}
        onPress={() => handleMediaSelect(item)}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.mediaImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.mediaGradient}
        >
          <Text style={styles.mediaTitle}>{item.title}</Text>
          <Text style={styles.mediaSubtitle}>{item.subtitle}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Media</Text>
      </View>
      
      <FlatList
        data={MEDIA_CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
      
      <FlatList
        data={filteredMedia}
        renderItem={renderMediaItem}
        keyExtractor={item => item.id}
        horizontal
        snapToInterval={ITEM_WIDTH + 20} // Item width + margin
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mediaList}
      />
      
      {currentItem && (
        <View style={styles.playerContainer}>
          <View style={styles.playerInfo}>
            <Image 
              source={{ uri: currentItem.imageUrl }} 
              style={styles.playerThumbnail} 
            />
            <View style={styles.playerTextContainer}>
              <Text style={styles.playerTitle}>{currentItem.title}</Text>
              <Text style={styles.playerSubtitle}>{currentItem.subtitle}</Text>
            </View>
          </View>
          
          <View style={styles.playerControls}>
            <IconButton
              icon={<SkipBack size={20} color={theme.colors.text.primary} />}
              onPress={() => {}}
              variant="ghost"
              size="sm"
            />
            
            <IconButton
              icon={
                isPlaying 
                  ? <Pause size={24} color="white" /> 
                  : <Play size={24} color="white" />
              }
              onPress={togglePlayPause}
              variant="filled"
              color={theme.colors.primary.main}
              size="lg"
              style={styles.playButton}
            />
            
            <IconButton
              icon={<SkipForward size={20} color={theme.colors.text.primary} />}
              onPress={() => {}}
              variant="ghost"
              size="sm"
            />
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>1:24</Text>
              <Text style={styles.timeText}>4:32</Text>
            </View>
          </View>
        </View>
      )}
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
  categoriesList: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  categoryTab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  selectedCategoryTab: {
    borderBottomWidth: 0,
  },
  activeIndicator: {
    height: 3,
    width: '80%',
    backgroundColor: theme.colors.primary.main,
    position: 'absolute',
    bottom: 0,
    borderRadius: 1.5,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    color: theme.colors.text.secondary,
  },
  selectedCategoryText: {
    color: theme.colors.primary.main,
  },
  mediaList: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  mediaItemContainer: {
    width: ITEM_WIDTH,
    marginRight: 20,
    height: 200,
  },
  mediaTile: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mediaGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: theme.spacing.md,
  },
  mediaTitle: {
    fontSize: theme.typography.fontSize.h3,
    fontFamily: theme.typography.fontFamily.heading,
    color: 'white',
  },
  mediaSubtitle: {
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.body,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playerContainer: {
    position: 'absolute',
    bottom: 80, // Space for tab bar
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.md,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    ...theme.shadows.lg,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  playerThumbnail: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
  },
  playerTextContainer: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  playerTitle: {
    fontSize: theme.typography.fontSize.body,
    fontFamily: theme.typography.fontFamily.bodyMedium,
    color: theme.colors.text.primary,
  },
  playerSubtitle: {
    fontSize: theme.typography.fontSize.caption,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.secondary,
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  playButton: {
    marginHorizontal: theme.spacing.md,
  },
  progressContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.divider,
    borderRadius: 2,
  },
  progressFill: {
    width: '30%', // Example progress
    height: '100%',
    backgroundColor: theme.colors.primary.main,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    fontSize: theme.typography.fontSize.small,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.secondary,
  },
});