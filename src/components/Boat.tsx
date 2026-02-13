import { Entity } from '../types/game';
import EntityIcon from './EntityIcon';
import '../styles/Boat.css';

interface BoatProps {
  side: 'left' | 'right';
  entities: Entity[];
  onEntityClick: (entity: Entity) => void;
  onCross: () => void;
  isAnimating: boolean;
  canCross: boolean;
}

function Boat({ side, entities, onEntityClick, onCross, isAnimating, canCross }: BoatProps) {
  return (
    <div className={`boat boat-${side} ${isAnimating ? 'boat-crossing' : ''}`}>
      <div className="boat-body">
        <div className="boat-hull">
          <div className="boat-portholes">
            <span className="porthole">⚪</span>
            <span className="porthole">⚪</span>
          </div>
          <div className="boat-deck">
            <div className="boat-title">⛵ Ferry</div>
            {isAnimating && <div className="crossing-indicator">🚣 Crossing River...</div>}
            <div className="boat-entities">
              {entities.length === 0 ? (
                <div className="empty-boat">Ready to board!</div>
              ) : (
                entities.map((entity) => (
                  <EntityIcon
                    key={entity}
                    entity={entity}
                    onClick={() => onEntityClick(entity)}
                    disabled={isAnimating}
                  />
                ))
              )}
            </div>
            {canCross && !isAnimating && (
              <button className="cross-button" onClick={onCross}>
                ⛵ Cross River
              </button>
            )}
            {!canCross && !isAnimating && entities.length === 0 && (
              <div className="boat-instruction">
                Click farmer to board first!
              </div>
            )}
          </div>
          <div className="boat-railing">
            <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boat;
