import React, { useState } from 'react';
import { shareLocation, isWebShareSupported, type ShareOptions } from '../utils/socialSharing';
import { trackShare } from '../utils/analytics';
import './SocialShare.css';

export interface SocialShareProps {
  locationId: string;
  locationName: string;
  culturalHighlights?: string[];
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  locationId,
  locationName,
  culturalHighlights,
  className = ''
}) => {
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const shareOptions: ShareOptions = {
    locationId,
    locationName,
    culturalHighlights
  };

  const handleShare = async (method: 'twitter' | 'facebook' | 'copy' | 'native') => {
    if (isSharing) return;
    
    setIsSharing(true);
    setFeedback(null);

    try {
      const result = await shareLocation(shareOptions, method);
      
      // Track sharing analytics
      trackShare(locationId, method, result.success);
      
      if (result.success) {
        setFeedback({ message: result.message || 'Shared successfully!', type: 'success' });
      } else {
        setFeedback({ message: result.message || 'Failed to share', type: 'error' });
      }
    } catch (error) {
      trackShare(locationId, method, false);
      setFeedback({ message: 'An error occurred while sharing', type: 'error' });
    } finally {
      setIsSharing(false);
      
      // Clear feedback after 3 seconds
      setTimeout(() => {
        setFeedback(null);
      }, 3000);
    }
  };

  const webShareSupported = isWebShareSupported();

  return (
    <div className={`social-share ${className}`}>
      <div className="share-header">
        <h3 className="share-title">Share this location</h3>
        <p className="share-subtitle">Spread the knowledge of African heritage</p>
      </div>

      <div className="share-buttons">
        {webShareSupported && (
          <button
            className="share-button share-native"
            onClick={() => handleShare('native')}
            disabled={isSharing}
            aria-label="Share using device's native sharing"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span>Share</span>
          </button>
        )}

        <button
          className="share-button share-twitter"
          onClick={() => handleShare('twitter')}
          disabled={isSharing}
          aria-label="Share on Twitter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <span>Twitter</span>
        </button>

        <button
          className="share-button share-facebook"
          onClick={() => handleShare('facebook')}
          disabled={isSharing}
          aria-label="Share on Facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>

        <button
          className="share-button share-copy"
          onClick={() => handleShare('copy')}
          disabled={isSharing}
          aria-label="Copy link to clipboard"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
          </svg>
          <span>Copy Link</span>
        </button>
      </div>

      {feedback && (
        <div className={`share-feedback ${feedback.type}`} role="alert">
          <div className="feedback-content">
            {feedback.type === 'success' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            )}
            <span>{feedback.message}</span>
          </div>
        </div>
      )}

      {isSharing && (
        <div className="share-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;