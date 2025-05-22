"use client"

import { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import ProductCustomizer from "../components/ProductCustomizer"
import SizeCustomizer from "../components/SizeCustomizer"
import "./ProductPage.css"

const ProductPage = () => {
  const [productType, setProductType] = useState("tshirt")
  const [sizes, setSizes] = useState({ height: 180, weight: 80, build: "regular" })
  const [customText, setCustomText] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState("/images/tshirt-white.jpg")
  const threeContainerRef = useRef(null)
  const fileInputRef = useRef(null)
  const dragAreaRef = useRef(null)

  // Initialize Three.js scene
  useEffect(() => {
    if (!threeContainerRef.current) return

    // Clear previous content
    while (threeContainerRef.current.firstChild) {
      threeContainerRef.current.removeChild(threeContainerRef.current.firstChild)
    }

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      25,
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    camera.position.y = 0

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    threeContainerRef.current.appendChild(renderer.domElement)

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = false
    controls.minDistance = 3
    controls.maxDistance = 7

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)

    // Create a t-shirt model (simplified version of the repository model)
    // In a real implementation, you would load the actual model from the repository
    const shirtGroup = new THREE.Group()

    // Create shirt body
    const shirtGeometry = new THREE.BoxGeometry(2, 2.5, 0.2)
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.2,
    })
    const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial)
    shirtGroup.add(shirt)

    // Create sleeves
    const sleeveGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.2)

    const leftSleeve = new THREE.Mesh(sleeveGeometry, shirtMaterial)
    leftSleeve.position.set(-1.2, 0.2, 0)
    leftSleeve.rotation.z = -0.3
    shirtGroup.add(leftSleeve)

    const rightSleeve = new THREE.Mesh(sleeveGeometry, shirtMaterial)
    rightSleeve.position.set(1.2, 0.2, 0)
    rightSleeve.rotation.z = 0.3
    shirtGroup.add(rightSleeve)

    // Create collar
    const collarGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.2, 32, 1, true)
    const collar = new THREE.Mesh(collarGeometry, shirtMaterial)
    collar.position.set(0, 1.3, 0)
    collar.rotation.x = Math.PI / 2
    shirtGroup.add(collar)

    scene.add(shirtGroup)

    // Add texture if image is uploaded
    if (uploadedImage) {
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load(uploadedImage)
      texture.crossOrigin = "anonymous"

      const imageMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      })

      const imageGeometry = new THREE.PlaneGeometry(1.2, 1.2)
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial)
      imageMesh.position.z = 0.11
      imageMesh.position.y = 0.2
      shirt.add(imageMesh)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!threeContainerRef.current) return

      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (threeContainerRef.current && threeContainerRef.current.contains(renderer.domElement)) {
        threeContainerRef.current.removeChild(renderer.domElement)
      }
      controls.dispose()
      renderer.dispose()
    }
  }, [uploadedImage, productType])

  // Setup drag and drop
  useEffect(() => {
    const dragArea = dragAreaRef.current
    if (!dragArea) return

    const handleDragOver = (e) => {
      e.preventDefault()
      dragArea.classList.add("drag-over")
    }

    const handleDragLeave = () => {
      dragArea.classList.remove("drag-over")
    }

    const handleDrop = (e) => {
      e.preventDefault()
      dragArea.classList.remove("drag-over")

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    }

    dragArea.addEventListener("dragover", handleDragOver)
    dragArea.addEventListener("dragleave", handleDragLeave)
    dragArea.addEventListener("drop", handleDrop)

    return () => {
      dragArea.removeEventListener("dragover", handleDragOver)
      dragArea.removeEventListener("dragleave", handleDragLeave)
      dragArea.removeEventListener("drop", handleDrop)
    }
  }, [])

  // Handle product type change
  const handleProductTypeChange = (type) => {
    setProductType(type)
    setPreviewImage(`/images/${type}-white.jpg`)
  }

  // Handle size change
  const handleSizeChange = (newSizes) => {
    setSizes(newSizes)
  }

  // Handle file processing
  const handleFile = (file) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="product-page">
      <div className="container">
        <h1 className="page-title">Design Your Custom Apparel</h1>

        <div className="product-container">
          <div className="product-preview">
            <div className="preview-image-container">
              <img src={previewImage || "/placeholder.svg"} alt={`${productType} preview`} className="preview-image" />
              {uploadedImage && (
                <img src={uploadedImage || "/placeholder.svg"} alt="Custom design" className="uploaded-design" />
              )}
              {customText && <div className="custom-text-overlay">{customText}</div>}
            </div>

            <div className="three-preview" ref={threeContainerRef}></div>
          </div>

          <div className="product-options">
            <div className="option-section">
              <h2>Product Type</h2>
              <ProductCustomizer initialType={productType} onChange={handleProductTypeChange} />
            </div>

            <div className="option-section">
              <h2>Size Options</h2>
              <SizeCustomizer initialSizes={sizes} onChange={handleSizeChange} />
            </div>

            <div className="option-section">
              <h2>Upload Design</h2>
              <div className="upload-area" ref={dragAreaRef}>
                <p>Drag & drop your image here or</p>
                <button className="upload-button" onClick={triggerFileInput}>
                  Choose Image
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
              <p className="option-description">
                Upload your own design to be printed on the {productType}. Your design will appear both on the side and
                on the 3D model.
              </p>
            </div>

            <div className="option-section">
              <h2>Add Custom Text</h2>
              <textarea
                className="custom-text-input"
                placeholder="Enter text to print (max 3 lines)"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={100}
                rows={3}
              ></textarea>
            </div>

            <div className="product-summary">
              <h2>Product Summary</h2>
              <div className="summary-details">
                <p>
                  <strong>Product:</strong> {productType.charAt(0).toUpperCase() + productType.slice(1)}
                </p>
                <p>
                  <strong>Size:</strong> Based on Height: {sizes.height}cm, Weight: {sizes.weight}kg, Build:{" "}
                  {sizes.build}
                </p>
                <p>
                  <strong>Design:</strong> {uploadedImage ? "Custom uploaded image" : "None"}
                </p>
                <p>
                  <strong>Text:</strong> {customText || "None"}
                </p>
              </div>

              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
