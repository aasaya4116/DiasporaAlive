/**
 * Content optimization script for images and data verification
 */

import { loadLocationData, AVAILABLE_LOCATIONS } from '../utils/dataLoader';
import { getOptimizedImageUrl } from '../utils/imageOptimization';
import { hasMinimumContent } from '../utils/contentValidation';

interface OptimizationReport {
  location: string;
  originalImages: number;
  optimizedImages: number;
  hasMinimumContent: boolean;
  culturalCategoriesCount: number;
  mediaAssetsCount: number;
  issues: string[];
}

async function optimizeAllContent(): Promise<OptimizationReport[]> {
  console.log('🚀 Starting content optimization...\n');
  
  const reports: OptimizationReport[] = [];

  for (const locationId of AVAILABLE_LOCATIONS) {
    console.log(`📍 Processing ${locationId}...`);
    
    try {
      const location = await loadLocationData(locationId);
      
      if (!location) {
        console.log(`  ❌ Failed to load ${locationId}`);
        continue;
      }

      const report: OptimizationReport = {
        location: locationId,
        originalImages: 0,
        optimizedImages: 0,
        hasMinimumContent: hasMinimumContent(location),
        culturalCategoriesCount: 0,
        mediaAssetsCount: 0,
        issues: []
      };

      // Count cultural categories with content
      const categories = ['music', 'food', 'religion', 'language', 'festivals'];
      report.culturalCategoriesCount = categories.filter(
        category => location.culturalElements[category as keyof typeof location.culturalElements]?.length > 0
      ).length;

      // Process featured image
      if (location.media.featuredImage) {
        report.originalImages++;
        const optimizedUrl = getOptimizedImageUrl(location.media.featuredImage.url, {
          width: 800,
          height: 600,
          quality: 85,
          format: 'auto'
        });
        
        if (optimizedUrl !== location.media.featuredImage.url) {
          report.optimizedImages++;
        }
        report.mediaAssetsCount++;
      } else {
        report.issues.push('Missing featured image');
      }

      // Process gallery images
      if (location.media.gallery && location.media.gallery.length > 0) {
        for (const image of location.media.gallery) {
          report.originalImages++;
          const optimizedUrl = getOptimizedImageUrl(image.url, {
            width: 600,
            height: 400,
            quality: 80,
            format: 'auto'
          });
          
          if (optimizedUrl !== image.url) {
            report.optimizedImages++;
          }
          report.mediaAssetsCount++;
        }
      } else {
        report.issues.push('No gallery images');
      }

      // Check content quality
      if (!report.hasMinimumContent) {
        report.issues.push('Below minimum content threshold');
      }

      if (report.culturalCategoriesCount < 3) {
        report.issues.push(`Only ${report.culturalCategoriesCount} cultural categories have content`);
      }

      if (location.overview.summary.length < 100) {
        report.issues.push('Summary is too short');
      }

      if (location.overview.historicalContext.length < 100) {
        report.issues.push('Historical context is too short');
      }

      if (location.connections.africanOrigins.length === 0) {
        report.issues.push('No African origins specified');
      }

      if (location.connections.relatedLocations.length === 0) {
        report.issues.push('No related locations specified');
      }

      reports.push(report);
      
      const status = report.issues.length === 0 ? '✅' : '⚠️';
      console.log(`  ${status} ${locationId}: ${report.mediaAssetsCount} media assets, ${report.culturalCategoriesCount} categories`);
      
      if (report.issues.length > 0) {
        report.issues.forEach(issue => {
          console.log(`    - ${issue}`);
        });
      }

    } catch (error) {
      console.log(`  ❌ Error processing ${locationId}:`, error);
      reports.push({
        location: locationId,
        originalImages: 0,
        optimizedImages: 0,
        hasMinimumContent: false,
        culturalCategoriesCount: 0,
        mediaAssetsCount: 0,
        issues: [`Processing error: ${error instanceof Error ? error.message : 'Unknown error'}`]
      });
    }
  }

  return reports;
}

async function generateOptimizationSummary() {
  const reports = await optimizeAllContent();
  
  console.log('\n📊 Optimization Summary:');
  console.log('=' .repeat(50));
  
  const totals = reports.reduce((acc, report) => ({
    locations: acc.locations + 1,
    originalImages: acc.originalImages + report.originalImages,
    optimizedImages: acc.optimizedImages + report.optimizedImages,
    mediaAssets: acc.mediaAssets + report.mediaAssetsCount,
    withMinimumContent: acc.withMinimumContent + (report.hasMinimumContent ? 1 : 0),
    withIssues: acc.withIssues + (report.issues.length > 0 ? 1 : 0)
  }), {
    locations: 0,
    originalImages: 0,
    optimizedImages: 0,
    mediaAssets: 0,
    withMinimumContent: 0,
    withIssues: 0
  });

  console.log(`Total locations processed: ${totals.locations}`);
  console.log(`Total media assets: ${totals.mediaAssets}`);
  console.log(`Images optimized: ${totals.optimizedImages}/${totals.originalImages}`);
  console.log(`Locations with minimum content: ${totals.withMinimumContent}/${totals.locations}`);
  console.log(`Locations with issues: ${totals.withIssues}/${totals.locations}`);

  // Quality breakdown
  const qualityBreakdown = reports.reduce((acc, report) => {
    if (report.issues.length === 0 && report.hasMinimumContent && report.culturalCategoriesCount >= 4) {
      acc.excellent++;
    } else if (report.hasMinimumContent && report.culturalCategoriesCount >= 3) {
      acc.good++;
    } else if (report.culturalCategoriesCount >= 2) {
      acc.fair++;
    } else {
      acc.poor++;
    }
    return acc;
  }, { excellent: 0, good: 0, fair: 0, poor: 0 });

  console.log('\n🎯 Quality Breakdown:');
  console.log(`Excellent: ${qualityBreakdown.excellent} locations`);
  console.log(`Good: ${qualityBreakdown.good} locations`);
  console.log(`Fair: ${qualityBreakdown.fair} locations`);
  console.log(`Poor: ${qualityBreakdown.poor} locations`);

  // Recommendations
  console.log('\n💡 Recommendations:');
  
  const locationsWithIssues = reports.filter(r => r.issues.length > 0);
  if (locationsWithIssues.length > 0) {
    console.log('Locations needing attention:');
    locationsWithIssues.forEach(report => {
      console.log(`  ${report.location}: ${report.issues.join(', ')}`);
    });
  } else {
    console.log('🌟 All locations meet quality standards!');
  }

  const optimizationRate = totals.originalImages > 0 
    ? (totals.optimizedImages / totals.originalImages * 100).toFixed(1)
    : '0';
  
  console.log(`\n📈 Image optimization rate: ${optimizationRate}%`);
  
  if (totals.optimizedImages < totals.originalImages) {
    console.log('💡 Consider implementing automatic image optimization in production');
  }

  return reports;
}

// Run optimization if this script is executed directly
// Use: import { generateOptimizationSummary } from './optimizeContent' and call generateOptimizationSummary()

export { optimizeAllContent, generateOptimizationSummary };