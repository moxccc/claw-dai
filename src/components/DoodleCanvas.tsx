import { useRef, useState, useEffect, useCallback } from 'react'

interface Point {
  x: number
  y: number
}

interface DrawPath {
  points: Point[]
  color: string
  lineWidth: number
}

export default function DoodleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)
  const [paths, setPaths] = useState<DrawPath[]>([])
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [isEraser, setIsEraser] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile('ontouchstart' in window)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getContext = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    return ctx
  }, [])

  const redrawCanvas = useCallback(() => {
    const ctx = getContext()
    const canvas = canvasRef.current
    if (!ctx || !canvas) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    paths.forEach(path => {
      if (path.points.length < 2) return
      ctx.beginPath()
      ctx.strokeStyle = path.color
      ctx.lineWidth = path.lineWidth
      ctx.moveTo(path.points[0].x, path.points[0].y)
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y)
      }
      ctx.stroke()
    })
  }, [paths, getContext])

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  const getPosition = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const pos = getPosition(e)
    setIsDrawing(true)
    setCurrentPath([pos])
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    e.preventDefault()
    const pos = getPosition(e)
    const ctx = getContext()
    if (!ctx) return

    const drawColor = isEraser ? '#ffffff' : color
    const drawWidth = isEraser ? lineWidth * 3 : lineWidth

    ctx.beginPath()
    ctx.strokeStyle = drawColor
    ctx.lineWidth = drawWidth
    ctx.moveTo(currentPath[currentPath.length - 1].x, currentPath[currentPath.length - 1].y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()

    setCurrentPath(prev => [...prev, pos])
  }

  const stopDrawing = () => {
    if (isDrawing && currentPath.length > 1) {
      setPaths(prev => [...prev, {
        points: currentPath,
        color: isEraser ? '#ffffff' : color,
        lineWidth: isEraser ? lineWidth * 3 : lineWidth
      }])
    }
    setIsDrawing(false)
    setCurrentPath([])
  }

  const clearCanvas = () => {
    setPaths([])
    const ctx = getContext()
    const canvas = canvasRef.current
    if (ctx && canvas) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  const undo = () => {
    setPaths(prev => prev.slice(0, -1))
  }

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00',
    '#8800ff', '#00ff88', '#ff0088', '#0088ff', '#804000'
  ]

  const sizes = [2, 4, 6, 8, 12, 16, 24]

  return (
    <div className="doodle-container">
      <div className="toolbar">
        <div className="toolbar-section">
          <span className="toolbar-label">颜色</span>
          <div className="color-picker">
            {colors.map(c => (
              <button
                key={c}
                className={`color-btn ${color === c && !isEraser ? 'active' : ''}`}
                style={{ backgroundColor: c, border: c === '#ffffff' ? '1px solid #ccc' : 'none' }}
                onClick={() => { setColor(c); setIsEraser(false) }}
              />
            ))}
          </div>
        </div>

        <div className="toolbar-section">
          <span className="toolbar-label">笔刷大小</span>
          <div className="size-picker">
            {sizes.map(s => (
              <button
                key={s}
                className={`size-btn ${lineWidth === s && !isEraser ? 'active' : ''}`}
                onClick={() => { setLineWidth(s); setIsEraser(false) }}
              >
                <span className="size-dot" style={{ width: s * 2, height: s * 2 }} />
              </button>
            ))}
          </div>
        </div>

        <div className="toolbar-section">
          <button
            className={`action-btn eraser-btn ${isEraser ? 'active' : ''}`}
            onClick={() => setIsEraser(!isEraser)}
          >
            🧹 橡皮擦
          </button>
          <button className="action-btn undo-btn" onClick={undo}>
            ↩️ 撤销
          </button>
          <button className="action-btn clear-btn" onClick={clearCanvas}>
            🗑️ 清空
          </button>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="drawing-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="footer">
        <span>💡 在画布上拖动鼠标或手指来涂鸦</span>
        <span>共 {paths.length} 笔</span>
      </div>
    </div>
  )
}
