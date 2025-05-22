"use client"

import { useState } from "react"
import "./ProductCustomizer.css"

const ProductCustomizer = ({ initialType = "tshirt", onChange }) => {
  const [productType, setProductType] = useState(initialType)
  const productTypes = ["tshirt", "hoodie", "sleeve", "cap"]

  const handleClick = (type) => {
    setProductType(type)
    if (onChange) {
      onChange(type)
    }
  }

  return (
    <div className="product-options">
      {productTypes.map((type) => (
        <button
          key={type}
          className={`option-button ${type === productType ? "active" : ""}`}
          onClick={() => handleClick(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default ProductCustomizer
