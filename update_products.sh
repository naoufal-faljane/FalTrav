#!/bin/bash

# Array of product files to update
PRODUCTS=(
    "europe-backpacking-guide.html"
    "travel-journal.html"
    "world-map-poster.html"
    "leather-passport-holder.html"
    "packing-cubes-set.html"
)

# Loop through each product file and update it
for product in "${PRODUCTS[@]}"; do
    # Define the file path
    FILE="./$product"
    echo "Updating $FILE..."
    
    # Extract the product name for use in the content
    if [[ "$product" == *"europe"* ]]; then
        TITLE="Europe Backpacking Guide (PDF)"
        PRICE="$7.99"
        RATING="4.9"
        REVIEWS="84"
        THUMB1="28"
        THUMB2="29"
        THUMB3="30"
        THUMB4="31"
        TYPE="digital"
        TYPE_LABEL="Digital Download"
        DESC="Your ultimate guide to backpacking across Europe! This comprehensive PDF includes everything you need to plan the perfect European adventure."
        FEATURES="<li>Detailed guides for 20+ European countries</li>
            <li>Budget accommodation recommendations</li>
            <li>Transportation planning guides</li>
            <li>Regional food and cultural highlights</li>
            <li>Seasonal travel tips</li>
            <li>Backpacking safety guidelines</li>
            <li>Money-saving strategies</li>
            <li>Itinerary templates</li>
            <li>Language phrase guides</li>"
    elif [[ "$product" == *"journal"* ]]; then
        TITLE="Travel Journal"
        PRICE="$14.99"
        RATING="4.8"
        REVIEWS="128"
        THUMB1="32"
        THUMB2="33"
        THUMB3="34"
        THUMB4="35"
        TYPE="physical"
        TYPE_LABEL="Physical Product"
        DESC="Capture your travel memories with our premium travel journal. Features 200 lined pages with a durable hardcover designed for travel."
        FEATURES="<li>200 premium paper pages with lined format</li>
            <li>Durable hardcover with travel-inspired design</li>
            <li>Compact size: 5.5\" x 8.5\" (fits in most bags)</li>
            <li>Lay-flat binding for comfortable writing</li>
            <li>World maps for marking visited places</li>
            <li>Inspirational travel quotes on every other page</li>
            <li>Ribbon bookmark included</li>
            <li>Back pocket for storing tickets and photos</li>
            <li>Elastic band closure</li>"
    elif [[ "$product" == *"poster"* ]]; then
        TITLE="World Map Poster"
        PRICE="$19.99"
        RATING="4.6"
        REVIEWS="96"
        THUMB1="36"
        THUMB2="37"
        THUMB3="38"
        THUMB4="39"
        TYPE="physical"
        TYPE_LABEL="Physical Product"
        DESC="Beautifully detailed world map poster perfect for any travel enthusiast's home. This 24\" x 36\" poster features accurate geographical information with vibrant colors and clean design."
        FEATURES="<li>Dimensions: 24\" x 36\" (61cm x 91cm)</li>
            <li>High-quality paper with archival ink</li>
            <li>Detailed country boundaries and city locations</li>
            <li>Ocean currents and mountain ranges highlighted</li>
            <li>Pole-to-pole coverage with accurate projection</li>
            <li>Waterproof coating available as upgrade</li>
            <li>Wooden frame option available</li>
            <li>Includes hanging hardware</li>
            <li>Environmentally friendly materials</li>"
    elif [[ "$product" == *"holder"* ]]; then
        TITLE="Leather Passport Holder"
        PRICE="$24.99"
        RATING="4.9"
        REVIEWS="112"
        THUMB1="40"
        THUMB2="41"
        THUMB3="42"
        THUMB4="43"
        TYPE="physical"
        TYPE_LABEL="Physical Product"
        DESC="Protect your passport in style with our premium leather passport holder. Crafted from genuine top-grain leather, this holder features a secure snap closure and multiple card slots."
        FEATURES="<li>Genuine top-grain leather construction</li>
            <li>Snap closure for secure protection</li>
            <li>Multiple card slots (holds 4-6 cards)</li>
            <li>Passport-sized interior</li>
            <li>RFID blocking technology</li>
            <li>Water-resistant coating</li>
            <li>Pen loop for convenience</li>
            <li>Personalization option available</li>
            <li>Available in brown or black</li>"
    elif [[ "$product" == *"cubes"* ]]; then
        TITLE="Travel Packing Cubes Set"
        PRICE="$29.99"
        RATING="4.7"
        REVIEWS="215"
        THUMB1="44"
        THUMB2="45"
        THUMB3="46"
        THUMB4="47"
        TYPE="physical"
        TYPE_LABEL="Physical Product"
        DESC="Maximize your luggage space and stay organized with our premium packing cubes set. This 6-piece set includes various sizes to accommodate all your travel needs."
        FEATURES="<li>6 pieces: 2 large, 2 medium, 1 small, 1 toiletry pouch</li>
            <li>Lightweight, durable polyester fabric</li>
            <li>Secure zipper closures</li>
            <li>Clear top windows for easy identification</li>
            <li>Compression feature saves 30% luggage space</li>
            <li>Machine washable</li>
            <li>Water-resistant material</li>
            <li>Color-coded for organization</li>
            <li>Mesh dividers for accessories</li>"
    fi
    
    # Create backup
    cp "$FILE" "${FILE}.backup"
    
    # Update the file with new content
    cat > "$FILE" << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$TITLE - FalTrav</title>
  <link rel="stylesheet" href="../css/style.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
    }

    .product-page {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      min-height: 100vh;
    }

    .product-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 40px;
    }

    .product-gallery {
      display: grid;
      grid-template-rows: 4fr 1fr;
      gap: 15px;
      height: 600px;
    }

    .main-image {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      background: #f8f9fa;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-container {
      display: flex;
      gap: 12px;
    }

    .thumbnail {
      flex: 1;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s;
    }

    .thumbnail.active,
    .thumbnail:hover {
      border-color: #2c6fbb;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      padding: 20px 0;
    }

    .product-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .product-rating {
      color: #f1c40f;
      font-size: 0.9rem;
    }

    .product-reviews {
      color: #666;
      font-size: 0.9rem;
    }

    .product-title {
      font-size: 2.2rem;
      margin-bottom: 10px;
      color: #2c3e50;
      line-height: 1.2;
    }

    .product-type {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 15px;
    }
    
    .digital {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    
    .physical {
      background-color: #e8f5e9;
      color: #388e3c;
    }

    .product-price {
      font-size: 2.5rem;
      color: #2c3e50;
      font-weight: bold;
      margin: 20px 0;
    }

    .product-description {
      margin: 25px 0;
      line-height: 1.7;
      color: #555;
    }

    .product-features {
      margin: 25px 0;
    }

    .product-features h3 {
      margin-bottom: 15px;
      color: #2c3e50;
    }

    .product-features ul {
      list-style: none;
      padding-left: 0;
    }

    .product-features li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }

    .product-features li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #27ae60;
      font-weight: bold;
    }

    .purchase-section {
      margin-top: 30px;
      padding-top: 25px;
      border-top: 1px solid #eee;
    }

    .purchase-btn {
      display: block;
      width: 100%;
      padding: 18px;
      background-color: #ff9900;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
      box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
      margin-bottom: 12px;
    }

    .purchase-btn:hover {
      background-color: #e68a00;
    }

    .secondary-btn {
      display: block;
      width: 100%;
      padding: 14px;
      background-color: #f8f9fa;
      color: #2c3e50;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .secondary-btn:hover {
      background-color: #e9ecef;
      border-color: #adb5bd;
    }

    .back-to-shop {
      display: inline-block;
      margin: 20px 40px;
      color: #2c6fbb;
      text-decoration: none;
      font-weight: 500;
    }

    .back-to-shop:hover {
      text-decoration: underline;
    }

    .product-badges {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    .badge {
      background: #e9f7ef;
      color: #27ae60;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    @media (max-width: 992px) {
      .product-container {
        grid-template-columns: 1fr;
        padding: 20px;
      }

      .product-gallery {
        height: auto;
        max-height: 600px;
      }
    }

    @media (max-width: 768px) {
      .product-title {
        font-size: 1.8rem;
      }

      .product-price {
        font-size: 2rem;
      }

      .product-container {
        gap: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="product-page">
    <a href="../shop.html" class="back-to-shop">← Back to Shop</a>
    
    <div class="product-container">
      <div class="product-gallery">
        <div class="main-image">
          <img src="https://picsum.photos/800/600?random=1$(echo $product | sed 's/[^0-9]*//g')" alt="$TITLE">
        </div>
        <div class="thumbnail-container">
          <div class="thumbnail active">
            <img src="https://picsum.photos/150/100?random=$THUMB1" alt="$TITLE - Angle 1">
          </div>
          <div class="thumbnail">
            <img src="https://picsum.photos/150/100?random=$THUMB2" alt="$TITLE - Angle 2">
          </div>
          <div class="thumbnail">
            <img src="https://picsum.photos/150/100?random=$THUMB3" alt="$TITLE - Angle 3">
          </div>
          <div class="thumbnail">
            <img src="https://picsum.photos/150/100?random=$THUMB4" alt="$TITLE - Angle 4">
          </div>
        </div>
      </div>
      
      <div class="product-info">
        <div class="product-meta">
          <div class="product-rating">★★★★★ <span style="color: #666;">$RATING</span></div>
          <div class="product-reviews">($REVIEWS reviews)</div>
        </div>
        
        <h1 class="product-title">$TITLE</h1>
        
        <div class="product-badges">
          <span class="badge">Best Seller</span>
        </div>
        
        <div class="product-type $TYPE">$TYPE_LABEL</div>
        
        <div class="product-price">$PRICE</div>
        
        <p class="product-description">
          $DESC
        </p>
        
        <div class="product-features">
          <h3>What You'll Get:</h3>
          <ul>
            $FEATURES
          </ul>
        </div>
        
        <div class="purchase-section">
          <button class="purchase-btn">Add to Cart</button>
          <button class="secondary-btn">Buy Now</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer style="background: #2c3e50; color: white; padding: 30px 0; margin-top: 40px;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
      <div class="footer-links" style="display: flex; gap: 20px;">
        <a href="#" style="color: white; text-decoration: none;">About Us</a>
        <a href="#" style="color: white; text-decoration: none;">Contact</a>
        <a href="#" style="color: white; text-decoration: none;">Privacy Policy</a>
      </div>
      <div class="copyright" style="color: #bbb;">
        © 2025 FalTrav. All rights reserved.
      </div>
    </div>
  </footer>

  <script>
    // Add to cart functionality
    document.querySelector('.purchase-btn').addEventListener('click', function() {
      alert('$TITLE added to cart!');
      // In a real implementation, this would add the item to a cart
    });
    
    document.querySelector('.secondary-btn').addEventListener('click', function() {
      alert('Purchase completed! Your $TITLE is ready for download.');
      // In a real implementation, this would process the purchase
    });
    
    // Image gallery functionality
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Update main image
        const imgSrc = this.querySelector('img').src;
        mainImage.src = imgSrc.replace('150/100', '800/600');
      });
    });
  </script>
</body>
</html>
EOL
done

echo "All product pages have been updated successfully!"