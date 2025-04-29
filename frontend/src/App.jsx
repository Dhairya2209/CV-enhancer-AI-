import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState("")
  const [result, setResult] = useState("")
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const getBarColor = (score) => {
    if (score >= 80) return "#4caf50"
    if (score >= 50) return "#ffc107"
    return "#f44336"
  }

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload a PDF resume")

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("job_description", jobDesc)

    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.result) {
        setResult(data.result)
        setScore(data.score)
      } else {
        alert(data.error || "Something went wrong")
      }
    } catch (error) {
      alert("Error connecting to server")
    } finally {
      setLoading(false)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  return (
    <div className="app-wrapper">
      <div className={`container ${darkMode ? 'dark' : ''}`}>
        <div className="header">
          <h1>Resume Analyzer</h1>
          <div className="toggle-mode">
            <label>
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={toggleDarkMode} 
              />
              Dark Mode
            </label>
          </div>
        </div>
        
        <p className="subtitle">
          Analyze your resume and match it with your dream job using Google Gemini AI.
        </p>
        
        <div className="file-input-wrapper">
          <input
            type="file"
            id="resume-file"
            accept="application/pdf"
            onChange={e => {
              setFile(e.target.files[0])
              setResult("")
              setScore(null)
            }}
          />
        </div>
        
        <textarea
          placeholder="Job Description (optional)"
          rows="4"
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
        ></textarea>
        
        <button 
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Processing..." : "Analyze Resume"}
        </button>
        
        {result && (
          <div className="result-box">
            <h3>Analysis Result:</h3>
            <div>{result}</div>
            {score !== null && (
              <div className="score-box">
                <strong>Fit Score:</strong> {score} / 100
                <div className="score-bar">
                  <div 
                    className="score-fill" 
                    style={{
                      width: `${score}%`,
                      backgroundColor: getBarColor(score)
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
