# TreeSleuth

> **"Crack the case. Know your trees."**

A web-based mystery/spotting game where you identify tree species by collecting "field evidence" (leaf shape, bark texture, branching pattern, buds, seeds, habitat, season clues) under time and uncertainty pressure—like Wordle meets a nature walk.

## 🎮 Game Modes

### Daily Grove
One curated tree per day, same for everyone. Build streaks and share your results!

### Expedition Run
10 random trees from your chosen region. Maximize your score before daylight runs out.

### Practice Lab
Focus on specific categories like "Oaks vs Maples" or "Winter Twigs" to sharpen your skills.

## 🕵️ How to Play

1. **Case Opens:** You see a tree silhouette with one initial clue
2. **Collect Evidence:** Spend Focus to reveal tiles (leaf, bark, seeds, buds, etc.)
3. **Make Your Call:** Choose a species from the candidates
4. **Confidence Bet:** Pick 50%, 75%, or 90% confidence
5. **Learn:** See the explanation and similar species

### Scoring
- **Base:** +100 for correct identification
- **Evidence Penalty:** -10 per tile revealed
- **Speed Bonus:** Up to +50 points for quick solves
- **Confidence Multiplier:**
  - 50% → 1.0x
  - 75% → 1.3x  
  - 90% → 1.7x (but wrong = -80 penalty!)

## 🌳 Species Covered

Starting with 25 Northeast US species:
- **Maples:** Red, Sugar, Silver
- **Oaks:** White, Red, Pin
- **Birches:** Paper, River
- **Conifers:** Eastern White Pine, Spruce, Fir, Hemlock
- **And more:** Beech, Sycamore, Tuliptree, Walnut, Hickory, Ash...

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/philiv99/treesleuth.git
cd treesleuth

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Lint code |

## 🎨 Theme

TreeSleuth uses the **LinkittyDo** visual style:

- **Colors:** Cream (`#FDEC92`), Mint (`#A9EAD2`), Ink (`#161813`), Pop (`#FB2B57`)
- **Fonts:** Bungee (display), Nunito (body)
- **Style:** Playful mid-century retro with chunky borders and bold shadows

See `docs/theme.md` for complete theme documentation.

## 📁 Project Structure

```
treesleuth/
├── src/
│   ├── game/
│   │   ├── logic/      # Pure game rules, scoring, validation
│   │   ├── scenes/     # Title, Playing, Results, etc.
│   │   └── data/       # Tree species database
│   ├── theme/          # LinkittyDo styling
│   ├── ui/
│   │   ├── components/ # Reusable UI elements
│   │   └── overlays/   # Modals and dialogs
│   └── utils/          # Helper functions
├── tests/              # Test files
├── docs/               # Documentation
└── public/             # Static assets
```

## 📖 Documentation

- [Development Plan](docs/treesleuth_creation.md)
- [Theme Guide](docs/theme.md)

## 🧪 Testing

```bash
# Run tests once
npm test

# Watch mode
npm run test:watch
```

## 📄 License

MIT

---

**Game Identity**
- **Name:** TreeSleuth
- **Repo:** `treesleuth`
- **Storage Prefix:** `treesleuth:`

Built with the LinkittyDo game framework.
