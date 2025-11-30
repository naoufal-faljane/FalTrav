# Location-Based Analytics for Travel App

## Overview
This feature allows you to track where your website visitors are coming from (city, region, country) and what content they're engaging with (articles, destinations). This helps you understand your audience better and tailor content to their interests.

## How It Works
1. When a user visits your site, their IP address is used to determine their location (city, region, country)
2. This location data is sent to Google Analytics along with page views and user interactions
3. You can then see reports showing which locations are viewing which content

## Implementation Details
- Location is determined using IP geolocation via the ipapi.co service
- Location data is attached to Google Analytics events as custom dimensions:
  - Custom Dimension 1: User City
  - Custom Dimension 2: User Region
  - Custom Dimension 3: User Country
- All page views, article views, destination views, and user interactions include location data

## Viewing Reports in Google Analytics
1. Go to your Google Analytics property G-WR9K1KTMF0
2. Navigate to "Explore" to create custom reports showing content by location
3. Use the "Pages and screens" report with location as a secondary dimension
4. Create custom reports showing article/desination views by user location

## Key Metrics You Can Track
- Which cities are reading which articles
- Which regions are most interested in specific destinations
- Geographic patterns in user engagement
- Location-based content performance

## Privacy Compliance
- Only anonymous location data is collected (no personal information)
- IP addresses are not stored, only the geolocation derived from them
- Compliant with privacy regulations