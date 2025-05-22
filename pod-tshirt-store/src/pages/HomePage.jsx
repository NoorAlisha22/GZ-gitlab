import { Link } from "react-router-dom"
import ImageTransition from "../components/ImageTransition"
import "./HomePage.css"

const HomePage = () => {
  const transitionImages = ["/images/tshirt1.jpg", "/images/tshirt2.jpg", "/images/tshirt3.jpg", "/images/tshirt4.jpg"]

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Design Your Perfect Tee</h1>
            <p>Custom print-on-demand t-shirts with your unique designs</p>
            <Link to="/product" className="cta-button">
              Start Designing
            </Link>
          </div>
          <div className="hero-image">
            <ImageTransition images={transitionImages} />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Custom Designs</h3>
              <p>Upload your own artwork or use our design tools</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👕</div>
              <h3>Quality Products</h3>
              <p>Premium fabrics that feel great and last long</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Quick production and delivery worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <section className="showcase">
        <div className="container">
          <h2 className="section-title">Featured Designs</h2>
          <div className="showcase-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="showcase-item">
                <div className="showcase-image" style={{ backgroundImage: `url(/images/design${item}.jpg)` }}></div>
                <h3>Design Example {item}</h3>
                <Link to="/product" className="showcase-link">
                  Customize
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
