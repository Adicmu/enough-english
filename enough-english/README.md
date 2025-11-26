# Enough English? - Interactive Language Map

## Project Overview
"Enough English?" is an interactive installation-style web application designed for the CMU-Q community. It visualizes the invisible tensions of language usage and identity on campus. By allowing students to map their feelings of linguistic "enoughness" (Too Much, Not Enough, Just Enough) across the physical space of the university, this project transforms private experiences into public, collective data.

This project directly responds to course conversations about language hierarchies, "good English," and "authentic" identity in the Gulf.

## Features
- **Interactive Campus Map**: Users can click on the real CMU-Q floor plan to log their location.
- **Heatmap Visualization**: Real-time heatmap overlay showing high-activity zones.
- **Live Data Dashboard**:
  - **Language Distribution**: Pie chart showing the mix of English, Arabic, and other languages.
  - **Sentiment Analysis**: Bar chart displaying the "Enoughness" categories.
  - **Word Cloud**: Dynamic visualization of common terms from student reflections.
- **Real-time Updates**: The interface updates instantly upon submission (simulated for this prototype).

## How to Run Locally
1. **Prerequisites**: A modern web browser (Chrome, Firefox, Safari).
2. **Installation**:
   - Ensure the folder structure is intact (index.html, style.css, script.js, assets/).
   - No server installation is required for this prototype version.
3. **Running**:
   - Simply double-click `index.html` to open it in your browser.
   - OR, if using VS Code, use the "Live Server" extension for the best experience.

## File Structure
- `index.html`: The main structure of the application, containing the map view and input forms.
- `style.css`: Custom styling following the CMU-Q color palette (Wine Red, Grey, Black).
- `script.js`: Handles all logic: map coordinate calculation, heatmap rendering, form handling, and chart updates.
- `assets/`: Contains the `cmuq_map.png` and `logo.png`.
- `data/`: Placeholder for JSON data storage (simulated in-memory for browser demo).

## Multi-Floor Support
The application now supports mapping on Ground, 2nd, and 3rd floors.
**Important**: The current project uses the same map image for all floors as a placeholder. To fully enable this feature:
1.  Extract the specific floor plan images from your source PDF.
2.  Save them as PNG files in the `assets/` folder with these exact names:
    - `cmuq_map_ground.png`
    - `cmuq_map_2nd.png`
    - `cmuq_map_3rd.png`
3.  The app will automatically load the correct image when switching floors.

## Technical Notes for Reviewers
- **Map Integration**: The project uses a coordinate-based system relative to the image dimensions, ensuring the heatmap remains accurate even when the window is resized.
- **Data Persistence**: For this standalone prototype, data is stored in browser memory to simulate a backend. In a production environment, this would connect to a Node.js/Python backend writing to `responses.json`.
- **Visualization**: Uses HTML5 Canvas for the heatmap and Chart.js for statistical graphs.

## Credits
Developed for the Multimodal Project, CMU-Q.
