/**
 * Content validation script to check all location data
 */

import { contentManager } from '../utils/contentManager';
import { AVAILABLE_LOCATIONS } from '../utils/dataLoader';

async function validateAllContent() {
  console.log('🔍 Starting content validation...\n');

  try {
    // Initialize content manager
    await contentManager.initialize();

    // Validate all content
    const validation = await contentManager.validateAllContent();
    
    console.log('📊 Validation Results:');
    console.log(`✅ Valid locations: ${validation.valid.length}`);
    console.log(`❌ Invalid locations: ${validation.invalid.length}`);
    console.log(`⚠️  Locations with warnings: ${validation.warnings.size}\n`);

    // Show valid locations
    if (validation.valid.length > 0) {
      console.log('✅ Valid Locations:');
      validation.valid.forEach(location => {
        console.log(`  - ${location}`);
      });
      console.log('');
    }

    // Show invalid locations
    if (validation.invalid.length > 0) {
      console.log('❌ Invalid Locations:');
      validation.invalid.forEach(location => {
        console.log(`  - ${location}`);
      });
      console.log('');
    }

    // Show warnings
    if (validation.warnings.size > 0) {
      console.log('⚠️  Warnings:');
      for (const [location, warnings] of validation.warnings) {
        console.log(`  ${location}:`);
        warnings.forEach(warning => {
          console.log(`    - ${warning}`);
        });
      }
      console.log('');
    }

    // Get content statistics
    const stats = await contentManager.getContentStatistics();
    
    console.log('📈 Content Statistics:');
    console.log(`Total locations: ${stats.totalLocations}`);
    console.log(`Loaded locations: ${stats.loadedLocations}`);
    console.log(`Error count: ${stats.errorCount}\n`);

    // Show content quality assessment
    console.log('🎯 Content Quality Assessment:');
    const qualityGroups = {
      high: [] as string[],
      medium: [] as string[],
      low: [] as string[]
    };

    for (const [location, quality] of stats.contentQuality) {
      qualityGroups[quality].push(location);
    }

    console.log(`High quality (${qualityGroups.high.length}): ${qualityGroups.high.join(', ')}`);
    console.log(`Medium quality (${qualityGroups.medium.length}): ${qualityGroups.medium.join(', ')}`);
    console.log(`Low quality (${qualityGroups.low.length}): ${qualityGroups.low.join(', ')}\n`);

    // Summary
    const successRate = (validation.valid.length / AVAILABLE_LOCATIONS.length) * 100;
    console.log(`🎉 Overall Success Rate: ${successRate.toFixed(1)}%`);
    
    if (successRate === 100) {
      console.log('🌟 All content validation passed! Dataset is ready for production.');
    } else if (successRate >= 80) {
      console.log('✨ Most content is valid. Minor issues need attention.');
    } else {
      console.log('🔧 Significant content issues detected. Review and fix required.');
    }

  } catch (error) {
    console.error('❌ Content validation failed:', error);
    throw error;
  }
}

// Run validation if this script is executed directly
// Use: import { validateAllContent } from './validateContent' and call validateAllContent()

export { validateAllContent };