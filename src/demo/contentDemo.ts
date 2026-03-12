/**
 * Demo script showing content management capabilities
 */

import { contentManager } from '../utils/contentManager';
import { AVAILABLE_LOCATIONS } from '../utils/dataLoader';

export async function runContentDemo() {
  console.log('🚀 Content Management System Demo\n');
  
  try {
    // Initialize content manager
    console.log('1. Initializing content manager...');
    await contentManager.initialize();
    console.log('✅ Content manager initialized\n');

    // Load a sample location
    console.log('2. Loading sample location (Brazil)...');
    const brazil = await contentManager.loadLocation('brazil');
    
    if (brazil) {
      console.log('✅ Brazil loaded successfully');
      console.log(`   - Cultural elements: ${Object.values(brazil.culturalElements).flat().length}`);
      console.log(`   - Media assets: ${brazil.media.gallery.length + 1}`);
      console.log(`   - African origins: ${brazil.connections.africanOrigins.length}`);
      console.log(`   - Related locations: ${brazil.connections.relatedLocations.length}\n`);
    } else {
      console.log('❌ Failed to load Brazil\n');
    }

    // Validate all content
    console.log('3. Validating all content...');
    const validation = await contentManager.validateAllContent();
    console.log(`✅ Validation complete:`);
    console.log(`   - Valid locations: ${validation.valid.length}`);
    console.log(`   - Invalid locations: ${validation.invalid.length}`);
    console.log(`   - Locations with warnings: ${validation.warnings.size}\n`);

    // Get content statistics
    console.log('4. Getting content statistics...');
    const stats = await contentManager.getContentStatistics();
    console.log(`✅ Statistics gathered:`);
    console.log(`   - Total locations: ${stats.totalLocations}`);
    console.log(`   - Loaded locations: ${stats.loadedLocations}`);
    console.log(`   - Error count: ${stats.errorCount}`);
    
    // Show quality breakdown
    const qualityBreakdown = {
      high: 0,
      medium: 0,
      low: 0
    };
    
    for (const [, quality] of stats.contentQuality) {
      qualityBreakdown[quality]++;
    }
    
    console.log(`   - High quality: ${qualityBreakdown.high}`);
    console.log(`   - Medium quality: ${qualityBreakdown.medium}`);
    console.log(`   - Low quality: ${qualityBreakdown.low}\n`);

    // Show available locations
    console.log('5. Available locations:');
    AVAILABLE_LOCATIONS.forEach(location => {
      const quality = stats.contentQuality.get(location) || 'unknown';
      const indicator = quality === 'high' ? '🌟' : quality === 'medium' ? '⭐' : '📍';
      console.log(`   ${indicator} ${location}`);
    });

    console.log('\n🎉 Content management system is working correctly!');
    console.log('📊 Dataset is ready for production use.');

  } catch (error) {
    console.error('❌ Demo failed:', error);
    throw error;
  }
}

// Example of how to use the content management utilities
export async function showContentUsageExample() {
  console.log('\n📚 Content Usage Examples:\n');

  // Example 1: Load and display location
  console.log('Example 1: Loading location data');
  console.log('```typescript');
  console.log('import { contentManager } from "./utils/contentManager";');
  console.log('');
  console.log('const location = await contentManager.loadLocation("haiti");');
  console.log('if (location) {');
  console.log('  console.log(location.overview.summary);');
  console.log('  // Display cultural elements, media, etc.');
  console.log('}');
  console.log('```\n');

  // Example 2: Validate content
  console.log('Example 2: Content validation');
  console.log('```typescript');
  console.log('import { validateLocationData } from "./utils/contentValidation";');
  console.log('');
  console.log('const validation = validateLocationData(locationData);');
  console.log('if (!validation.isValid) {');
  console.log('  console.error("Validation errors:", validation.errors);');
  console.log('}');
  console.log('```\n');

  // Example 3: Image optimization
  console.log('Example 3: Image optimization');
  console.log('```typescript');
  console.log('import { getOptimizedImageUrl } from "./utils/imageOptimization";');
  console.log('');
  console.log('const optimizedUrl = getOptimizedImageUrl(originalUrl, {');
  console.log('  width: 800,');
  console.log('  height: 600,');
  console.log('  quality: 85,');
  console.log('  format: "webp"');
  console.log('});');
  console.log('```\n');

  // Example 4: Error handling
  console.log('Example 4: Error handling');
  console.log('```typescript');
  console.log('import { safeLoadContent } from "./utils/errorHandling";');
  console.log('');
  console.log('const content = await safeLoadContent(');
  console.log('  "location-id",');
  console.log('  () => loadLocationData("location-id"),');
  console.log('  fallbackContent');
  console.log(');');
  console.log('```\n');

  console.log('🔧 These utilities provide a robust foundation for content management!');
}