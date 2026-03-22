import DoodleCanvas from './components/DoodleCanvas'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 涂鸦画板</h1>
        <p>一个简单有趣的在线绘图工具</p>
      </header>
      <main>
        <DoodleCanvas />
      </main>
      <footer className="app-footer">
        <p>Built with React + TypeScript · 使用 Vite 构建</p>
      </footer>
    </div>
  )
}

export default App