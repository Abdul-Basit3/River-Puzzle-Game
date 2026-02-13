import { Entity } from '../types/game';
import EntityIcon from './EntityIcon';
import '../styles/Bank.css';

interface BankProps {
  side: 'left' | 'right';
  entities: Entity[];
  onEntityClick: (entity: Entity) => void;
  disabled: boolean;
}

function Bank({ side, entities, onEntityClick, disabled }: BankProps) {
  return (
    <div className={`bank bank-${side}`}>
      <div className="bank-label">{side === 'left' ? 'Start' : 'Goal'}</div>
      <div className="bank-entities">
        {entities.map((entity) => (
          <EntityIcon
            key={entity}
            entity={entity}
            onClick={() => !disabled && onEntityClick(entity)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default Bank;
