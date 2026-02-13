# 🚣 River Crossing Puzzle Game

A fully functional web-based puzzle game built with React, TypeScript, and Vite. Help the farmer safely transport a sheep, wolf, and cabbage across the river 20 times!

## 🎮 Game Features

- **20 Crossing Challenge**: Complete 20 full crossings to win the game
- **Classic River Crossing Logic**: Solve the timeless puzzle with strict rule enforcement
- **Interactive Gameplay**: Click to select entities and move them across the river
- **Progress Tracking**: Visual progress indicator showing current crossing (0/20 to 20/20)
- **Scoring System**: Earn points based on moves and completion time
- **Move Counter & Timer**: Track your performance in real-time
- **Sound Effects & Music**: Audio feedback for actions and ambient background music
- **Multiple Screens**: Start, gameplay, completion, and game over screens
- **Animations**: Smooth boat crossing, water effects, and visual feedback
- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices with media queries
- **High Score Tracking**: Saves your best score using localStorage
- **Perfect Solution Bonus**: Extra points for optimal completion
- **Static Site**: No server required - deploy anywhere!

## 🎯 Game Rules

1. The boat can carry the farmer plus ONE item at a time
2. The wolf cannot be left alone with the sheep
3. The sheep cannot be left alone with the cabbage
4. The farmer must be in the boat to cross the river
5. Complete 20 full crossings (alternating between left and right banks)
6. All characters must safely cross back and forth 20 times

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Get Started in 3 Steps

#### 1️⃣ Install Dependencies
```bash
npm install
```

#### 2️⃣ Start Development Server
```bash
npm run dev
```

The game will open at `http://localhost:5173`

#### 3️⃣ Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🎮 Gameplay Tips

### Optimal Solution (7 moves per crossing):
1. Take sheep across →
2. Return alone ←
3. Take wolf across →
4. Return with sheep ←
5. Take cabbage across →
6. Return alone ←
7. Take sheep across →

Repeat this pattern 20 times, alternating directions!

### Controls:
- **Click entities** on the bank to board the boat
- **Click entities** in the boat to disembark
- **Click "Cross"** button to sail across the river
- Farmer must always be in the boat to cross

### Scoring:
- Fewer moves = Higher score
- Faster completion = Time bonus
- Perfect solution = Extra bonus points

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
- **CSS3** - Animations, responsive styling, and media queries
- **HTML5** - Semantic structure
- **Web Audio API** - Sound effects and background music
- **LocalStorage API** - High score persistence

## 🎵 Sound & Music System

The game includes a comprehensive audio system:

### Sound Effects:
- Entity-specific sounds (sheep baa, wolf growl, cabbage rustle, farmer cheer)
- Boat movement with water splash effects
- Success chimes for puzzle completion
- Error alerts for rule violations
- Volume controls for SFX

### Background Music:
- Ambient water sounds
- Gentle wind effects
- Bird chirping
- Distant animal sounds (sheep, wolf)
- Calm melodic theme
- Separate volume control for music

All sounds are generated using the Web Audio API - no external audio files needed!

## 🏆 Scoring System

- **Base Score**: 10,000 points
- **Optimal Moves**: 140 moves (7 moves × 20 crossings)
- **Move Penalty**: -10 points per move above optimal
- **Time Bonus**: +5 points per second under 10 minutes
- **Perfect Solution**: +5,000 bonus for optimal completion

## 🎮 How to Play

1. Click on the farmer to board the boat
2. Optionally click on one other entity (sheep, wolf, or cabbage) to board
3. Click "Cross" to move the boat to the other side
4. Disembark entities by clicking them in the boat
5. Get all characters to the opposite bank to complete one crossing
6. Repeat for 20 complete crossings (alternating directions)
7. Avoid leaving dangerous pairs alone!
8. Watch your progress in the stats bar (0/20 to 20/20)

## 🔧 Customization

### Adding More Levels
Extend the game logic in `src/logic/gameLogic.ts` to include different puzzle variations.

### Changing Difficulty
Modify the `TOTAL_CROSSINGS` constant in `src/components/GameScreen.tsx` or adjust the scoring system.

### Styling
All styles are in `src/styles/` with comprehensive media queries:
- Desktop (1200px+)
- Tablet landscape (1024px)
- Tablet portrait (768px)
- Mobile (480px)

Customize colors, animations, and layouts as needed.

### Sound Customization
Adjust volume levels and sound patterns in:
- `src/utils/soundManager.ts` - Sound effects
- `src/utils/backgroundMusic.ts` - Background music

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Sound effects require user interaction to play (browser autoplay policy)
- Mobile layout optimized for portrait orientation

---

## 🚀 Deployment Guide

### ✅ Static Site Ready

This is a **fully static site** with no server-side dependencies!

### 📦 Build Output

After running `npm run build`, the `dist` folder contains:
- `index.html` - Main HTML file
- `assets/` - All CSS and JavaScript bundled and minified

### ✅ Static Site Features

- ✅ No server-side code
- ✅ No external API calls
- ✅ No external CDN dependencies
- ✅ All assets bundled locally
- ✅ Uses only browser APIs (Web Audio API, localStorage)
- ✅ Fully self-contained
- ✅ Responsive design with media queries
- ✅ Works offline (after initial load)

### 🚀 Deployment Options

#### Option 1: GitHub Pages
```bash
# Push dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

#### Option 2: Netlify
1. Drag and drop the `dist` folder to [netlify.com](https://netlify.com)
2. Or connect your Git repository and set build command to `npm run build`

#### Option 3: Vercel
```bash
vercel --prod
```

#### Option 4: Any Static Host
Simply upload the entire `dist` folder to:
- AWS S3 + CloudFront
- Cloudflare Pages
- Firebase Hosting
- Surge.sh
- Any web server (Apache, Nginx, etc.)

### 🧪 Local Testing

To test the production build locally:
```bash
npm run preview
```

Or use any static file server:
```bash
# Using Python
cd dist
python -m http.server 8080

# Using Node.js http-server
npx http-server dist

# Using PHP
cd dist
php -S localhost:8080
```

### 🔧 Rebuild

To rebuild the static site after changes:
```bash
npm run build
```

The output will be in the `dist` folder.

---

## 📄 License

MIT License - Feel free to use and modify for your projects!

## 🤝 Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

---

## 📝 Project Highlights

✅ Full TypeScript type safety  
✅ React 18 with hooks (useState, useEffect)  
✅ Fully responsive design (desktop, tablet, mobile)  
✅ CSS animations and transitions  
✅ Web Audio API sound system  
✅ LocalStorage high score tracking  
✅ Game state validation  
✅ Multiple game screens  
✅ 100% static site - no server needed  
✅ Comprehensive media queries  

---

## 🎯 Challenge Yourself!

- Can you solve all 20 crossings in optimal moves (140)?
- Can you beat your high score?
- Can you complete it in under 10 minutes?

**Good luck and have fun!** 🎉

---

Enjoy the puzzle! 🧩
