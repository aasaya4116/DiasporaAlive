/**
 * Basic tests for content management utilities
 */

import { loadLocationData } from './dataLoader';
import { validateLocationData } from './contentValidation';
import { contentManager } from './contentManager';

// Simple test runner
async function runTests() {
  console.log('🧪 Running content management tests...\n');
  
  let passed = 0;
  let failed = 0;

  // Test 1: Load location data
  try {
    console.log('Test 1: Loading Brazil location data...');
    const brazil = await loadLocationData('brazil');
    
    if (brazil && brazil.id === 'brazil') {
      console.log('✅ Brazil data loaded successfully');
      passed++;
    } else {
      console.log('❌ Failed to load Brazil data');
      failed++;
    }
  } catch (error) {
    console.log('❌ Error loading Brazil data:', error);
    failed++;
  }

  // Test 2: Validate location data
  try {
    console.log('\nTest 2: Validating location data structure...');
    const haiti = await loadLocationData('haiti');
    
    if (haiti) {
      const validation = validateLocationData(haiti);
      
      if (validation.isValid) {
        console.log('✅ Haiti data validation passed');
        passed++;
      } else {
        console.log('❌ Haiti data validation failed:', validation.errors);
        failed++;
      }
    } else {
      console.log('❌ Failed to load Haiti data for validation');
      failed++;
    }
  } catch (error) {
    console.log('❌ Error validating Haiti data:', error);
    failed++;
  }

  // Test 3: Content manager initialization
  try {
    console.log('\nTest 3: Initializing content manager...');
    await contentManager.initialize();
    console.log('✅ Content manager initialized successfully');
    passed++;
  } catch (error) {
    console.log('❌ Content manager initialization failed:', error);
    failed++;
  }

  // Test 4: Load location through content manager
  try {
    console.log('\nTest 4: Loading location through content manager...');
    const jamaica = await contentManager.loadLocation('jamaica');
    
    if (jamaica && jamaica.id === 'jamaica') {
      console.log('✅ Jamaica loaded through content manager');
      passed++;
    } else {
      console.log('❌ Failed to load Jamaica through content manager');
      failed++;
    }
  } catch (error) {
    console.log('❌ Error loading Jamaica through content manager:', error);
    failed++;
  }

  // Test 5: Validate all content
  try {
    console.log('\nTest 5: Validating all available content...');
    const validation = await contentManager.validateAllContent();
    
    if (validation.valid.length > 0) {
      console.log(`✅ Content validation completed: ${validation.valid.length} valid, ${validation.invalid.length} invalid`);
      passed++;
    } else {
      console.log('❌ No valid content found');
      failed++;
    }
  } catch (error) {
    console.log('❌ Error validating all content:', error);
    failed++;
  }

  // Test results
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${(passed / (passed + failed) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Content management system is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the implementation.');
  }

  return { passed, failed };
}

// Run tests if this script is executed directly
// Use: import { runTests } from './contentManager.test' and call runTests()

export { runTests };