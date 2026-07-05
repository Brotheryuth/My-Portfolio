import React from 'react';
import { getSkillIcon } from '../../utils/skillicon';

function SkillBadge({ name, icon }) {
  const iconUrl = icon || getSkillIcon(name);

  return (
    <div className="skill-icon-card" title={name}>
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="skill-svg-icon" />
      ) : (
        <span className="skill-unknown-icon">?</span>
      )}
    </div>
  );
}

export default SkillBadge;
