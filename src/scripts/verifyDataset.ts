/**
 * Comprehensive dataset verification script
 */

import { loadLocationData, AVAILABLE_LOCATIONS } from '../utils/dataLoader';
import { validateLocationData } from '../utils/contentValidation';

interface DatasetVerification {
  locationId: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  contentStats: {
    musicElements: number;
    foodElements: number;
    religionElements: number;
    languageElements: number;
    festivalElements: number;
    totalCulturalElements: number;
    mediaAssets: number;
    africanOrigins: number;
    relatedLocations: number;
  };
  qualityScore: number;
}

async function verifyDataset(): Promise<DatasetVerification[]> {
  console.log('🔍 Verifying complete dataset...\n');
  
  const verifications: DatasetVerification[] = [];

  for (const locationId of AVAILABLE_LOCATIONS) {
    console.log(`📍 Verifying ${locationId}...`);
    
    try {
      const location = await loadLocationData(locationId);
      
      if (!location) {
        verifications.push({
          locationId,
          isValid: false,
          errors: ['Failed to load location data'],
          warnings: [],
          contentStats: {
            musicElements: 0,
            foodElements: 0,
            religionElements: 0,
            languageElements: 0,
            festivalElements: 0,
            totalCulturalElements: 0,
            mediaAssets: 0,
            africanOrigins: 0,
            relatedLocations: 0
          },
          qualityScore: 0
        });
        continue;
      }

      // Validate the location data
      const validation = validateLocationData(location);
      
      // Calculate content statistics
      const contentStats = {
        musicElements: location.culturalElements.music?.length || 0,
        foodElements: location.culturalElements.food?.length || 0,
        religionElements: location.culturalElements.religion?.length || 0,
        languageElements: location.culturalElements.language?.length || 0,
        festivalElements: location.culturalElements.festivals?.length || 0,
        totalCulturalElements: 0,
        mediaAssets: (location.media.featuredImage ? 1 : 0) + (location.media.gallery?.length || 0),
        africanOrigins: location.connections.africanOrigins?.length || 0,
        relatedLocations: location.connections.relatedLocations?.length || 0
      };

      contentStats.totalCulturalElements = 
        contentStats.musicElements + 
        contentStats.foodElements + 
        contentStats.religionElements + 
        contentStats.languageElements + 
        contentStats.festivalElements;

      // Calculate quality score (0-100)
      let qualityScore = 0;
      
      // Basic validation (30 points)
      if (validation.isValid) qualityScore += 30;
      
      // Content completeness (40 points)
      const categoriesWithContent = [
        contentStats.musicElements > 0,
        contentStats.foodElements > 0,
        contentStats.religionElements > 0,
        contentStats.languageElements > 0,
        contentStats.festivalElements > 0
      ].filter(Boolean).length;
      
      qualityScore += (categoriesWithContent / 5) * 20; // Up to 20 points for categories
      qualityScore += Math.min(contentStats.totalCulturalElements / 10, 1) * 20; // Up to 20 points for total elements
      
      // Media richness (15 points)
      qualityScore += Math.min(contentStats.mediaAssets / 5, 1) * 15;
      
      // Connections (15 points)
      qualityScore += Math.min(contentStats.africanOrigins / 3, 1) * 7.5;
      qualityScore += Math.min(contentStats.relatedLocations / 3, 1) * 7.5;

      const verification: DatasetVerification = {
        locationId,
        isValid: validation.isValid,
        errors: validation.errors,
        warnings: validation.warnings,
        contentStats,
        qualityScore: Math.round(qualityScore)
      };

      verifications.push(verification);
      
      const status = verification.isValid ? '✅' : '❌';
      const score = `${verification.qualityScore}/100`;
      console.log(`  ${status} ${locationId}: Quality Score ${score}`);
      
      if (verification.errors.length > 0) {
        console.log(`    Errors: ${verification.errors.length}`);
      }
      if (verification.warnings.length > 0) {
        console.log(`    Warnings: ${verification.warnings.length}`);
      }

    } catch (error) {
      console.log(`  ❌ Error verifying ${locationId}:`, error);
      verifications.push({
        locationId,
        isValid: false,
        errors: [`Verification error: ${error instanceof Error ? error.message : 'Unknown error'}`],
        warnings: [],
        contentStats: {
          musicElements: 0,
          foodElements: 0,
          religionElements: 0,
          languageElements: 0,
          festivalElements: 0,
          totalCulturalElements: 0,
          mediaAssets: 0,
          africanOrigins: 0,
          relatedLocations: 0
        },
        qualityScore: 0
      });
    }
  }

  return verifications;
}

async function generateDatasetReport() {
  const verifications = await verifyDataset();
  
  console.log('\n📊 Dataset Verification Report');
  console.log('=' .repeat(60));
  
  // Overall statistics
  const validLocations = verifications.filter(v => v.isValid).length;
  const totalErrors = verifications.reduce((sum, v) => sum + v.errors.length, 0);
  const totalWarnings = verifications.reduce((sum, v) => sum + v.warnings.length, 0);
  const averageQuality = verifications.reduce((sum, v) => sum + v.qualityScore, 0) / verifications.length;
  
  console.log(`\n📈 Overall Statistics:`);
  console.log(`Valid locations: ${validLocations}/${verifications.length} (${(validLocations/verifications.length*100).toFixed(1)}%)`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  console.log(`Average quality score: ${averageQuality.toFixed(1)}/100`);
  
  // Quality distribution
  const qualityRanges = {
    excellent: verifications.filter(v => v.qualityScore >= 90).length,
    good: verifications.filter(v => v.qualityScore >= 70 && v.qualityScore < 90).length,
    fair: verifications.filter(v => v.qualityScore >= 50 && v.qualityScore < 70).length,
    poor: verifications.filter(v => v.qualityScore < 50).length
  };
  
  console.log(`\n🎯 Quality Distribution:`);
  console.log(`Excellent (90-100): ${qualityRanges.excellent} locations`);
  console.log(`Good (70-89): ${qualityRanges.good} locations`);
  console.log(`Fair (50-69): ${qualityRanges.fair} locations`);
  console.log(`Poor (0-49): ${qualityRanges.poor} locations`);
  
  // Content statistics
  const totalStats = verifications.reduce((acc, v) => ({
    musicElements: acc.musicElements + v.contentStats.musicElements,
    foodElements: acc.foodElements + v.contentStats.foodElements,
    religionElements: acc.religionElements + v.contentStats.religionElements,
    languageElements: acc.languageElements + v.contentStats.languageElements,
    festivalElements: acc.festivalElements + v.contentStats.festivalElements,
    totalCulturalElements: acc.totalCulturalElements + v.contentStats.totalCulturalElements,
    mediaAssets: acc.mediaAssets + v.contentStats.mediaAssets,
    africanOrigins: acc.africanOrigins + v.contentStats.africanOrigins,
    relatedLocations: acc.relatedLocations + v.contentStats.relatedLocations
  }), {
    musicElements: 0,
    foodElements: 0,
    religionElements: 0,
    languageElements: 0,
    festivalElements: 0,
    totalCulturalElements: 0,
    mediaAssets: 0,
    africanOrigins: 0,
    relatedLocations: 0
  });
  
  console.log(`\n📚 Content Statistics:`);
  console.log(`Total cultural elements: ${totalStats.totalCulturalElements}`);
  console.log(`  - Music: ${totalStats.musicElements}`);
  console.log(`  - Food: ${totalStats.foodElements}`);
  console.log(`  - Religion: ${totalStats.religionElements}`);
  console.log(`  - Language: ${totalStats.languageElements}`);
  console.log(`  - Festivals: ${totalStats.festivalElements}`);
  console.log(`Total media assets: ${totalStats.mediaAssets}`);
  console.log(`African origins referenced: ${totalStats.africanOrigins}`);
  console.log(`Related locations: ${totalStats.relatedLocations}`);
  
  // Top performing locations
  const topLocations = verifications
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .slice(0, 3);
  
  console.log(`\n🌟 Top Performing Locations:`);
  topLocations.forEach((v, index) => {
    console.log(`${index + 1}. ${v.locationId}: ${v.qualityScore}/100`);
  });
  
  // Locations needing attention
  const needsAttention = verifications.filter(v => !v.isValid || v.qualityScore < 70);
  
  if (needsAttention.length > 0) {
    console.log(`\n⚠️  Locations Needing Attention:`);
    needsAttention.forEach(v => {
      console.log(`${v.locationId}: Score ${v.qualityScore}/100`);
      if (v.errors.length > 0) {
        v.errors.forEach(error => console.log(`  ❌ ${error}`));
      }
      if (v.warnings.length > 0) {
        v.warnings.slice(0, 2).forEach(warning => console.log(`  ⚠️  ${warning}`));
      }
    });
  }
  
  // Final assessment
  console.log(`\n🎉 Dataset Assessment:`);
  if (validLocations === verifications.length && averageQuality >= 80) {
    console.log('🌟 Dataset is production-ready! All locations are valid with high quality content.');
  } else if (validLocations === verifications.length && averageQuality >= 60) {
    console.log('✨ Dataset is good quality. Minor improvements recommended.');
  } else if (validLocations >= verifications.length * 0.8) {
    console.log('🔧 Dataset needs some attention. Address validation errors and improve content quality.');
  } else {
    console.log('🚨 Dataset requires significant work before production deployment.');
  }
  
  return verifications;
}

// Run verification if this script is executed directly
// Use: import { generateDatasetReport } from './verifyDataset' and call generateDatasetReport()

export { verifyDataset, generateDatasetReport };