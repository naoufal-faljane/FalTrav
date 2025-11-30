# Google Analytics Location Tracking Setup for Travel App

This document explains how to configure Google Analytics for location tracking to see where your customers are visiting from and what articles they're reading.

## Google Analytics Property: G-WR9K1KTMF0

Your Google Analytics property is already configured to send location data using IP geolocation. Here's how to view and analyze this data:

## Custom Dimensions Required

The following custom dimensions need to be set up in your Google Analytics property:

1. **Custom Dimension 1** - User City
2. **Custom Dimension 2** - User Region  
3. **Custom Dimension 3** - User Country

### How to Set Up Custom Dimensions

1. Go to Google Analytics Admin
2. Under Property, click on "Custom Definitions" > "Custom Dimensions"
3. Create the following custom dimensions:
   - Dimension 1: "User City" (Scope: Event)
   - Dimension 2: "User Region" (Scope: Event)
   - Dimension 3: "User Country" (Scope: Event)

## How to View Location Data

### 1. Audience by City/Region/Country

1. In Google Analytics, go to "Audience" > "Geo" > "Location"
2. You can see visits by country, region, and city
3. For more detailed information, go to "Explore" to create custom reports

### 2. Content Performance by Location

To see which articles and destinations users from specific locations are viewing:

1. Go to "Explore" in Google Analytics
2. Create a new analysis
3. Set up dimensions:
   - Rows: "Page Path" or "Page Title" (to identify articles/destinations)
   - Columns: "Custom Dimension 1" (User City), "Custom Dimension 2" (User Region), "Custom Dimension 3" (User Country)
   - Values: "Sessions", "Page Views", "Engagement Time"

### 3. Event Tracking by Location

To see user interactions by location:

1. Go to "Reports" > "Engagement" > "Events"
2. Or use "Explore" to create custom reports
3. Filter events by location custom dimensions

## Detailed Steps to View Articles Read by Location

### Method 1: Using the Explore Feature
1. In Google Analytics, click on "Explore" in the left navigation menu
2. Click the "+" button and select "Free form" 
3. Drag and drop the following dimensions into the "Rows" section:
   - Page Path (to see the exact URL)
   - Or Page Title (to see article/destination names)
4. Drag and drop the following dimensions into the "Columns" section:
   - Custom Dimension 1 (User City)
   - Custom Dimension 2 (User Region)  
   - Custom Dimension 3 (User Country)
5. Drag and drop the following metrics into the "Values" section:
   - Sessions
   - Page Views
   - Unique Page Views
   - Engaged Sessions
6. Click "Save" to save this view for future use

### Method 2: Using the Behavior Reports
1. Go to "Reports" > "Life cycle" > "Engagement" > "Pages and screens"
2. This shows all pages visited on your site
3. To add location data:
   - Click "Customize" at the top
   - Add Secondary dimension
   - Select "Country" under Geo
   - You can also add "City" as another secondary dimension

### Method 3: Creating Custom Reports
1. In Google Analytics Admin, under Property, go to "Custom Definitions" > "Custom Reports"
2. Click "+ New Custom Report"
3. Add a report title like "Content by Location"
4. Set Report Type to "Explorer"
5. Add the following:
   - Primary dimension: Page Title
   - Secondary dimension: Country (or City)
   - Metrics: Pageviews, Unique Pageviews, Sessions, Average Session Duration
6. Save and access this report anytime through "Customization" > "Custom Reports"

## Sample Report Queries

### View Articles by Location
1. Go to Explore > New Analysis
2. Choose "Free Form"
3. Dimensions: Page Title, Custom Dimension 1 (City), Custom Dimension 3 (Country)
4. Metric: Page Views, Engaged Sessions

### View Destinations by Location  
1. Go to Explore > New Analysis
2. Choose "Free Form" 
3. Dimensions: Page Title, Custom Dimension 1 (City), Custom Dimension 3 (Country) 
4. Metric: Page Views, Unique Page Views

### Location-Based User Behavior
1. Go to Explore > New Analysis
2. Choose "Cohort Exploration" or "Free Form"
3. Dimensions: Country, (City), Engagement Level
4. Metrics: User count, Session count, Conversion rate

## Data Collection Details

### What's Being Tracked

- **Page Views**: Location data is attached to every page view
- **Article Views**: When users read articles in `/news/*`
- **Destination Views**: When users view destinations in `/destinations/*`
- **User Interactions**: Clicks, scrolls, and form interactions
- **Content Engagement**: Scroll depth and time spent on page

### Location Data Sources

The location data is collected via:

1. IP Address Geolocation using ipapi.co service
2. The IP geolocation data is attached to all GA events as custom dimensions
3. Data includes city, region, and country information

## Verification Steps

To verify location tracking is working:

1. Visit your website and check if location data appears in Realtime reports
2. Check that custom dimensions are receiving data after 24-48 hours
3. Verify that location data is tied to page views and article/destination views
4. Use the test script provided below to verify tracking is functioning properly

## Testing Location Tracking

To test if location tracking is working properly:

1. Visit your website in a browser with developer tools open
2. Go to the Console tab
3. Run this test command to verify location tracking:
   ```javascript
   // Load the test script
   fetch('/test-analytics.js').then(r => r.text()).then(code => eval(code));
   ```
4. Check if location data is being collected and sent to Google Analytics

## Troubleshooting

### If Location Data is Not Appearing
1. Verify that custom dimensions are set up correctly in GA
2. Check browser console for API errors
3. Confirm the tracking code is sending location parameters
4. Verify that ipapi.co requests are not being blocked
5. Check if ad blockers are interfering with location collection
6. Make sure your site is served over HTTPS (required for proper tracking)

### Common Issues
- IP geolocation accuracy varies by provider
- Some users use VPNs which can show incorrect locations
- Corporate networks may show all users from the same location
- Mobile users may show carrier location rather than actual location

## Privacy Considerations

- IP-based geolocation is considered anonymous data
- No personally identifiable information is collected
- Data follows Google Analytics data retention policies
- Users' IP addresses are not stored in Google Analytics
- Only the geolocation data (city, region, country) is collected