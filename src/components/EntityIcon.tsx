import { Entity } from '../types/game';
import '../styles/EntityIcon.css';

interface EntityIconProps {
  entity: Entity;
  onClick: () => void;
  disabled?: boolean;
}

const ENTITY_ICONS: Record<Entity, string> = {
  farmer: '🧑‍🌾',
  sheep: '🐑',
  wolf: '🐺',
  cabbage: '🥬',
};

const ENTITY_NAMES: Record<Entity, string> = {
  farmer: 'Farmer',
  sheep: 'Sheep',
  wolf: 'Wolf',
  cabbage: 'Cabbage',
};

function EntityIcon({ entity, onClick, disabled }: EntityIconProps) {
  return (
    <div
      className={`entity-icon ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      title={ENTITY_NAMES[entity]}
    >
      <span className="entity-emoji">{ENTITY_ICONS[entity]}</span>
      <span className="entity-name">{ENTITY_NAMES[entity]}</span>
    </div>
  );
}

export default EntityIcon;
