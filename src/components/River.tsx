import { ReactNode } from 'react';
import '../styles/River.css';

interface RiverProps {
  children: ReactNode;
}

function River({ children }: RiverProps) {
  return (
    <div className="river">
      <div className="water-animation"></div>
      {children}
    </div>
  );
}

export default River;
