import { GameProvider, SceneManager } from './game'
import './App.css'

function App() {
  return (
    <GameProvider>
      <div className="app">
        <SceneManager />
      </div>
    </GameProvider>
  )
}

export default App
