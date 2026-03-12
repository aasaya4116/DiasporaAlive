import { useState, useEffect } from 'react'
import MapContainer from './components/MapContainer'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountrySelect = (countryId: string) => {
    console.log('Country selected:', countryId);
    setSelectedCountry(countryId);
  };

  const handleCountryHover = (countryId: string | null) => {
    setHoveredCountry(countryId);
  };

  return (
    <div className="App">
      <main className="app-main">
        {/* Floating title and description overlay */}
        <div className="floating-title">
          <h1>Diaspora Alive</h1>
          <div className="description-section">
            <p>Discover the rich tapestry of African cultural heritage woven throughout the Americas. From the rhythmic beats of Brazilian samba to the revolutionary spirit of Haitian independence, explore how African traditions have shaped and enriched cultures across the diaspora.</p>
          </div>
        </div>
        
        {/* Status indicators */}
        {hoveredCountry && (
          <div className="hover-indicator floating-indicator">
            Hovering: {hoveredCountry}
          </div>
        )}
        {selectedCountry && (
          <div className="selection-indicator floating-indicator">
            Selected: {selectedCountry}
          </div>
        )}
        
        {/* Sidebar */}
        <aside className="app-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <span className="logo-text">Diaspora</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-item active">
                <div className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9,22 9,12 15,12 15,22"></polyline>
                  </svg>
                </div>
                <span className="nav-text">Dashboard</span>
              </div>
              
              <div className="nav-item">
                <div className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <span className="nav-text">Explore</span>
              </div>
            </div>
            
            <div className="nav-section">
              <div className="nav-section-title">Locations</div>
              
              <div className="nav-subsection">
                <div className="nav-subsection-title">Caribbean</div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('haiti')}>
                  <span className="nav-text">Haiti</span>
                </div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('jamaica')}>
                  <span className="nav-text">Jamaica</span>
                </div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('cuba')}>
                  <span className="nav-text">Cuba</span>
                </div>
              </div>
              
              <div className="nav-subsection">
                <div className="nav-subsection-title">South America</div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('brazil')}>
                  <span className="nav-text">Brazil</span>
                </div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('colombia')}>
                  <span className="nav-text">Colombia</span>
                </div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('venezuela')}>
                  <span className="nav-text">Venezuela</span>
                </div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('peru')}>
                  <span className="nav-text">Peru</span>
                </div>
              </div>
              
              <div className="nav-subsection">
                <div className="nav-subsection-title">North America</div>
                <div className="nav-item country-item" onClick={() => handleCountrySelect('usa')}>
                  <span className="nav-text">United States</span>
                </div>
              </div>
            </div>
            
            <div className="nav-section">
              <div className="nav-item">
                <div className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className="nav-text">Communities</span>
              </div>
              
              <div className="nav-item">
                <div className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <span className="nav-text">Settings</span>
              </div>
            </div>
          </nav>
          
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="user-details">
                <div className="user-name">Explorer</div>
                <div className="user-status">Online</div>
              </div>
            </div>
          </div>
        </aside>
        
        <div className="map-layout">
          <MapContainer 
            selectedCountry={selectedCountry}
            onCountrySelect={handleCountrySelect}
            onCountryHover={handleCountryHover}
          />
        </div>
      </main>
    </div>
  )
}

export default App
