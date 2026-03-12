import React from 'react';
import type { DiasporaStatistic } from '../types/location';
import './StatisticsSection.css';

interface StatisticsSectionProps {
  statistics: DiasporaStatistic;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ statistics }) => {
  return (
    <div className="statistics-section">
      <h3 className="statistics-title">Diaspora Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Population</div>
          <div className="stat-value">{statistics.population}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Percentage</div>
          <div className="stat-value">{statistics.percentage}</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-label">Historical Period</div>
          <div className="stat-value">{statistics.historicalPeriod}</div>
        </div>
      </div>

      {statistics.keyFacts && statistics.keyFacts.length > 0 && (
        <div className="key-facts">
          <h4 className="facts-title">Key Facts</h4>
          <ul className="facts-list">
            {statistics.keyFacts.map((fact, index) => (
              <li key={index} className="fact-item">{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatisticsSection;