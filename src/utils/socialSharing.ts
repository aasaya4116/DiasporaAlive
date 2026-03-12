/**
 * Social sharing utilities for Diaspora Alive
 * Handles URL generation, share text creation, and platform-specific sharing
 */

export interface ShareData {
  url: string;
  title: string;
  text: string;
  locationName?: string;
  culturalHighlights?: string[];
}

export interface ShareOptions {
  locationId: string;
  locationName: string;
  culturalHighlights?: string[];
  customText?: string;
}

/**
 * Generate shareable URL with location deep-linking
 */
export const generateShareableUrl = (locationId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?location=${encodeURIComponent(locationId)}`;
};

/**
 * Create dynamic share text with location highlights
 */
export const createShareText = (options: ShareOptions): string => {
  const { locationName, culturalHighlights, customText } = options;
  
  if (customText) {
    return customText;
  }

  let shareText = `Discover the rich African cultural heritage in ${locationName}! 🌍`;
  
  if (culturalHighlights && culturalHighlights.length > 0) {
    const highlights = culturalHighlights.slice(0, 2).join(' and ');
    shareText += ` Explore ${highlights} and more on Diaspora Alive.`;
  } else {
    shareText += ' Explore music, food, traditions, and more on Diaspora Alive.';
  }
  
  return shareText;
};

/**
 * Generate Twitter share URL
 */
export const generateTwitterShareUrl = (shareData: ShareData): string => {
  const params = new URLSearchParams({
    text: shareData.text,
    url: shareData.url,
    hashtags: 'DiasporaAlive,AfricanHeritage,Culture'
  });
  
  return `https://twitter.com/intent/tweet?${params.toString()}`;
};

/**
 * Generate Facebook share URL
 */
export const generateFacebookShareUrl = (shareData: ShareData): string => {
  const params = new URLSearchParams({
    u: shareData.url,
    quote: shareData.text
  });
  
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
};

/**
 * Copy URL to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Open share URL in new window with appropriate dimensions
 */
export const openShareWindow = (url: string, platform: 'twitter' | 'facebook'): void => {
  const dimensions = {
    twitter: { width: 550, height: 420 },
    facebook: { width: 626, height: 436 }
  };
  
  const { width, height } = dimensions[platform];
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  
  window.open(
    url,
    `share-${platform}`,
    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
};

/**
 * Check if Web Share API is supported
 */
export const isWebShareSupported = (): boolean => {
  return 'share' in navigator;
};

/**
 * Use native Web Share API if available
 */
export const shareNative = async (shareData: ShareData): Promise<boolean> => {
  if (!isWebShareSupported()) {
    return false;
  }
  
  try {
    await navigator.share({
      title: shareData.title,
      text: shareData.text,
      url: shareData.url
    });
    return true;
  } catch (error) {
    // User cancelled or error occurred
    console.log('Native share cancelled or failed:', error);
    return false;
  }
};

/**
 * Main share function that handles all sharing methods
 */
export const shareLocation = async (
  options: ShareOptions,
  method: 'twitter' | 'facebook' | 'copy' | 'native' = 'native'
): Promise<{ success: boolean; message?: string }> => {
  const shareUrl = generateShareableUrl(options.locationId);
  const shareText = createShareText(options);
  
  const shareData: ShareData = {
    url: shareUrl,
    title: `African Heritage in ${options.locationName} - Diaspora Alive`,
    text: shareText,
    locationName: options.locationName,
    culturalHighlights: options.culturalHighlights
  };
  
  try {
    switch (method) {
      case 'native':
        const nativeSuccess = await shareNative(shareData);
        if (nativeSuccess) {
          return { success: true, message: 'Shared successfully!' };
        }
        // Fallback to copy if native share fails
        const copySuccess = await copyToClipboard(shareUrl);
        return copySuccess 
          ? { success: true, message: 'Link copied to clipboard!' }
          : { success: false, message: 'Failed to share' };
          
      case 'twitter':
        const twitterUrl = generateTwitterShareUrl(shareData);
        openShareWindow(twitterUrl, 'twitter');
        return { success: true, message: 'Opening Twitter...' };
        
      case 'facebook':
        const facebookUrl = generateFacebookShareUrl(shareData);
        openShareWindow(facebookUrl, 'facebook');
        return { success: true, message: 'Opening Facebook...' };
        
      case 'copy':
        const success = await copyToClipboard(shareUrl);
        return success 
          ? { success: true, message: 'Link copied to clipboard!' }
          : { success: false, message: 'Failed to copy link' };
          
      default:
        return { success: false, message: 'Unknown share method' };
    }
  } catch (error) {
    console.error('Share error:', error);
    return { success: false, message: 'Failed to share' };
  }
};