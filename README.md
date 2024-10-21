# Picsum Image Gallery

This project is a simple image gallery that fetches images from the [Picsum API](https://picsum.photos) and displays them in a responsive grid layout. Users can scroll through the images, view details about each image in a modal, and download images directly. The gallery also supports filtering images by author.

## Features
- Infinite scrolling: New images are fetched and loaded as the user scrolls down.
- Image details modal: Clicking on an image opens a modal displaying details like author, dimensions, and a download button.
- Download functionality: Users can download images directly by clicking the "Download" button.
- Filter by author: Clicking on the author's name filters the gallery to show images only by that author.

## Project Structure

```bash
.
├── index.html         # Main HTML file
├── assets/
│   ├── style.css      # CSS for animations and styling
│   └── app.js         # JavaScript for handling image fetching and UI interactions
└── README.md          # Project documentation

```
1. index.html
This is the main file that contains the HTML structure of the image gallery. It includes:

A responsive grid layout for displaying images.
A modal for showing image details.
Infinite scrolling functionality to load more images dynamically.
2. assets/style.css
This file contains the CSS for custom animations and additional styles used in the project, such as:

A rocketLaunch animation for the loading modal.
Animations for opening and closing the modal.
A bounce-animation for adding a dynamic effect to UI elements.
3. assets/app.js
The JavaScript file contains the core functionality of the gallery:

Fetching images from the Picsum API.
Handling infinite scrolling to load more images as the user scrolls down.
Displaying image details in a modal.
Enabling download functionality.
Filtering by author.
How to Run the Project
Clone the Repository:
First, clone the repository to your local machine:


git clone [https://github.com/1dev-hridoy/Picsum-Image-Gallery.git](https://github.com/1dev-hridoy/Picsum-Image-Gallery.git)
cd picsum-gallery
Setup the Project:
Ensure that all project files are in the correct structure:

index.html should be at the root.
CSS and JavaScript files should be located in the assets folder.
Run the Project:
Open index.html in your web browser. No additional setup is required.

Usage
Viewing Images:
Scroll through the gallery to view images. Images are automatically loaded as you scroll down.

Viewing Image Details:
Click on any image to view details in a modal. You can see the author, image dimensions, and a link to view the image on Unsplash.

Downloading Images:
In the modal, click the "Download Image" button to download the image directly to your device.

Filtering by Author:
Click on the author's name in the modal to filter the gallery by images from that author only.

External Resources
Picsum API: Free API for fetching random placeholder images.
Tailwind CSS: A utility-first CSS framework used for styling.
License
This project is open-source and available under the MIT License.
