# 🚣 River Crossing Puzzle Game

A fully functional web-based puzzle game built with React, TypeScript, and Vite. Help the farmer safely transport a sheep, wolf, and cabbage across the river!

## 🎮 Game Features

- **Classic River Crossing Logic**: Solve the timeless puzzle with strict rule enforcement
- **Interactive Gameplay**: Click to select entities and move them across the river
- **Scoring System**: Earn points based on moves and completion time
- **Move Counter & Timer**: Track your performance in real-time
- **Sound Effects**: Audio feedback for actions (click, boat movement, success, errors)
- **Multiple Screens**: Start, gameplay, completion, and game over screens
- **Animations**: Smooth boat crossing, water effects, and visual feedback
- **Responsive Design**: Works on desktop and mobile devices
- **High Score Tracking**: Saves your best score using localStorage
- **Perfect Solution Bonus**: Extra points for solving in optimal 7 moves

## 🎯 Game Rules

1. The boat can carry the farmer plus ONE item at a time
2. The wolf cannot be left alone with the sheep
3. The sheep cannot be left alone with the cabbage
4. The farmer must be in the boat to cross the river
5. All characters must reach the opposite bank safely

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The game will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
river-crossing-puzzle/
├── src/
│   ├── components/
│   │   ├── StartScreen.tsx      # Game start screen
│   │   ├── GameScreen.tsx       # Main gameplay screen
│   │   ├── CompleteScreen.tsx   # Puzzle completion screen
│   │   ├── GameOverScreen.tsx   # Game over screen
│   │   ├── Bank.tsx             # River bank component
│   │   ├── Boat.tsx             # Boat component
│   │   ├── River.tsx            # River with water animation
│   │   ├── EntityIcon.tsx       # Character icons
│   │   └── Stats.tsx            # Move counter and timer
│   ├── logic/
│   │   └── gameLogic.ts         # Core game rules and validation
│   ├── types/
│   │   └── game.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── soundManager.ts      # Sound effect management
│   ├── styles/
│   │   └── *.css                # Component styles
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Technologies Used

- **React 18** - UI framework with functional components and hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **CSS3** - Animations and responsive styling
- **HTML5** - Semantic structure

## 🎵 Sound Integration

The game includes a sound manager that handles:
- Click sounds for entity selection
- Boat movement sounds
- Success chimes for puzzle completion
- Error alerts for rule violations

To add actual audio files, place them in `public/assets/sounds/` and update the `soundManager.ts` file.

## 🏆 Scoring System

- **Base Score**: 1000 points
- **Move Penalty**: -50 points per move above optimal (7 moves)
- **Time Bonus**: +10 points per second under 60 seconds
- **Perfect Solution**: +500 bonus for solving in exactly 7 moves

## 🎮 How to Play

1. Click on the farmer to board the boat
2. Optionally click on one other entity (sheep, wolf, or cabbage) to board
3. Click "Cross" to move the boat to the other side
4. Disembark entities by clicking them in the boat
5. Repeat until all characters are safely on the right bank
6. Avoid leaving dangerous pairs alone!

## 🔧 Customization

### Adding More Levels
Extend the game logic in `src/logic/gameLogic.ts` to include different puzzle variations.

### Changing Difficulty
Modify the scoring system or add time limits in `src/components/GameScreen.tsx`.

### Styling
All styles are in `src/styles/` - customize colors, animations, and layouts.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Sound effects require user interaction to play (browser autoplay policy)
- Mobile layout optimized for portrait orientation

## 📄 License

MIT License - Feel free to use and modify for your projects!

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

Enjoy the puzzle! 🧩
