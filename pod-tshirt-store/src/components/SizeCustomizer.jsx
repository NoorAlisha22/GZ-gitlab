"use client"

import { useState } from "react"
import "./SizeCustomizer.css"

const SizeCustomizer = ({ initialSizes = { height: 180, weight: 80, build: "regular" }, onChange }) => {
  const [sizes, setSizes] = useState(initialSizes)
  const buildOptions = ["lean", "regular", "athletic", "big"]

  const handleChange = (property, value) => {
    const newSizes = {
      ...sizes,
      [property]: property === "build" ? value : Number(value),
    }
    setSizes(newSizes)
    if (onChange) {
      onChange(newSizes)
    }
  }

  return (
    <div className="size-options">
      <div className="size-option">
        <label className="size-label">Height (cm)</label>
        <input
          type="number"
          className="size-select"
          value={sizes.height}
          onChange={(e) => handleChange("height", e.target.value)}
          min="120"
          max="220"
        />
      </div>

      <div className="size-option">
        <label className="size-label">Weight (kg)</label>
        <input
          type="number"
          className="size-select"
          value={sizes.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          min="40"
          max="150"
        />
      </div>

      <div className="size-option">
        <label className="size-label">Build</label>
        <select className="size-select" value={sizes.build} onChange={(e) => handleChange("build", e.target.value)}>
          {buildOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SizeCustomizer
