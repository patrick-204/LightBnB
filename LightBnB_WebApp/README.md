# LightBnB

Lighthouse BnB is an app that will revolutionize the travel industry. It will allow homeowners to rent out their homes to people on vacation, creating an alternative to hotels and bed and breakfasts!

## Screenshots

### Home Page Pre-Login
![Home Page Pre-Login](/images/Light_BnB_Home_Page_Pre-Login.png)

### Sign Up Page
![Sign Up Page](/images/Light_BnB_Sign_Up.png)

### Home Page Post-Login
![Home Page Post-Login](/images/Light_BnB_Home_Page_Post-Login.png)

### Filter Properties
![Search](/images/Light_BnB_Search.png)

### View Reservations
![My Reservations](/images/Light_BnB_My_Reservations.png)

### Create a Listing for a Property
![Create a Listing](/images/Light_BnB_Create_Listing.png)

### View a Created Listing
![View My Listing](/images/Light_BnB_My_Listings.png)

## Features

- Users can view property information, book reservations, view their reservations, and write reviews.
- Users can filter search results for listings.

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.

## Getting Started

Follow the below steps to run the LightBnB project:
1. Clone this repository: git clone https://github.com/patrick-204/LightBnB/tree/master
2. Navigate to the LightBnB_WebApp directory.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
5. Go to <http://localhost:3000/> in your browser.
6. Sign up by selecting the Sign Up option and entering a unique username, email, and password.
7. Sign in using the Sign In button and your email and password.
8. Search for a listing using the Search option.
9. Create a new listing by selecting Create Listing.
10. View your listings by selecting My Listings.
11. View your reservations by selecting My Reservations.

## Dependencies

- bcrypt 3.0.8 or above
- cookie-session 1.4.0 or above
- nodemon 1.19.4 or above
- express
- pg 8.11.5 or above
- node 5.10.x or above

## Technology

- HTML
- JavaScript
- CSS
- PostgreSQL
- jQuery