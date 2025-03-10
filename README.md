# Kut-Korner Vacations - Travel Site Project

Welcome to the Kut-Korner Vacations project! This is a school assignment that simulates a travel website. Below, you'll find instructions on how to set up and run the site locally, an overview of its features, and details about how the booking form and search functionality work.

---

## Table of Contents

1. [How to Set Up and Run the Site](#how-to-set-up-and-run-the-site)
2. [Features](#features)
   - [Search for Destinations](#search-for-destinations)
   - [Booking Form](#booking-form)
3. [Code Structure](#code-structure)
4. [Dependencies](#dependencies)

---

## How to Set Up and Run the Site

To set up and run the Kut-Korner Vacations site locally, follow these steps:

### Prerequisites

- Ensure you have **Node.js** and **npm** installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Steps

1. **Clone or Download the Project**  
   Download the project files or clone the repository to your local machine.

2. **Install Dependencies**  
   Navigate to the project directory in your terminal and run:

   ```bash
   npm install
   ```

   This will install the required dependencies listed in package.json, including `lite-server` and `sass`.

3. **Run the Development Server**
   Start the development server using the following command:

   ```bash
   npm start
   ```

   This will:

   - It would compile SCSS files into CSS (but abandoned the idea as it was not a requirement for this assignment.)
   - Launch the site using `lite-server`, which will automatically open the site in your default browser.

4. **View the Site**
   The site should now be running at `http://localhost:3000`.

---

## Features

### Search for Destinations

The site includes a search bar that allows users to filter destinations by name or description. Here's how it works:

- As you type in the search bar, the JavaScript filters the destinations dynamically.
- The search is case-insensitive and matches partial strings in both the destination name and description.
- If no destinations match the search, a "No destinations found" message is displayed.

### Booking Form

The booking form is accessible by clicking the "View Details" button on a destination card and then selecting "Book Now." Here's how it works:

1. #### Form Validation

   The form validates user input to ensure all required fields are filled out correctly:

   - First Name, Last Name, Email, Phone Number, Travel Date, and Number of Travelers are required.
   - The email field is validated to ensure it contains a valid email address.
   - If any field is invalid, an error message is displayed.

2. #### Form Submission
   When the form is submitted:
   - The form data is logged to the console using `console.log`.
   - A confirmation alert is shown to the user with their name and the destination they booked.
   - The modal closes automatically after submission.

---

## Code Structure

This project is structured as this:

- #### HTML (`index.html`)

  The main page of the site which includes:

  - The navigation bar (stuctured like bootstrap, popular UI framework)

  - A hero section for the header

  - Destinations section with it's search bar

  - modal for destination details and to book the destination

  - An about section to briefly talk about "Kut-Korner Vacations".

  - And a footer because sure why not.

- #### CSS (`css/styles.css`)s:

  Styles for the entire page which include:

  - Responsive design for different screen sizes

  - Color scheme and typography to have some standardization

  - Animations and hover effects like how the cards and buttons lift slightly to give more life to the design

- #### JavaScript

  Handles all the interactive parts of the site like:

  - Loading and displaying destination data

  - Search functionality

  - Modal and booking form logic

  - Form validation and submission

- #### (Bonus) SCSS (`css/styles.scss`)

  If you want to mess with a little SCSS for styling, you can compile it into CSS with the following script below:

  ```bash
  npm run scss
  ```

  SCSS has great benefits such as being able to save variables, nesting element designs within eachother for better design scoping, and the ability to modularize your design to specific pages or elements withing elements.

  Only problem, it is a precursor to css and is not compatible with modern browsers, so you will have to compile it using the above script.

- #### Destination Data (`destinationData.json`)

  A JSON file containing destination data, feel free to add to it. As long as you keep the same template such as this below

  ```JSON
  {
  "id": 1,
  "name": "The Backside of Waterfall",
  "image": "img/backside_waterfall.jpg",
  "description": "The 8th wonder of the world!",
  "price": "$1200",
  "details": {
    "long_description": "Prepare to be amazed by the most breathtaking view you’ve never seen—the backside of water! This legendary waterfall is a must-see for adventurers and pun enthusiasts alike.",
    "itinerary": [
      "Day 1: Board your trusty boat and meet your skipper, who’s full of jokes (and questionable navigation skills).",
      "Day 2: Cruise down the river and dodge mischievous monkeys stealing your snacks.",
      "Day 3: Witness the majestic Backside of Waterfall and try not to get soaked by its 'refreshing' mist."
    ],
    "location": {
      "latitude": -3.4653,
      "longitude": -62.2159
    }
  }
  },
  ```

## Dependencies

The project uses the following dependencies:

- lite-server
  A lightweight development server that serves the site and refreshes the browser on file changes.

- sass
  A CSS preprocessor used to compile SCSS files into CSS.

To install these dependencies, run (like we did above):

```bash
npm install
```

## Avalible Scripts

The following scripts are availible to use in the `package.json` file:

- `npm start`
  starts the development server using `lite-server`
- `npm run lite` is the alias for starting `lite-server`
- `npm run sass` compiles SCSS into CSS

## Credits

- Created by **David Loder** (That's me!)

## License

Thought I should put this here just in case but this project is licensed under the ISC License and is free to use by anyone and everyone.
