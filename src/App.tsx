import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>TreeSleuth</h1>
        <p className="tagline">Crack the case. Know your trees.</p>
      </header>
      
      <main className="app-main">
        <div className="title-card">
          <h2>🌳 Coming Soon</h2>
          <p>
            A mystery/spotting game where you identify tree species by collecting 
            field evidence—like Wordle meets a nature walk.
          </p>
          
          <div className="mode-preview">
            <div className="mode-item">
              <span className="mode-icon">📅</span>
              <span className="mode-name">Daily Grove</span>
            </div>
            <div className="mode-item">
              <span className="mode-icon">🏃</span>
              <span className="mode-name">Expedition Run</span>
            </div>
            <div className="mode-item">
              <span className="mode-icon">🔬</span>
              <span className="mode-name">Practice Lab</span>
            </div>
          </div>
          
          <button className="btn-primary" disabled>
            Play (Coming Soon)
          </button>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Built with the LinkittyDo game framework</p>
      </footer>
    </div>
  )
}

export default App
