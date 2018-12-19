# Night on the Town
Julia Magyar, Daniel Schauer, Enrique Sandino, David Ferro

## Description
“Night on the Town” is a web-based application that is designed to provide the user with events, bars, and restaurants in any city of their choice on any day from now into the future.

## Motivation
We built this application because sometimes, especially in a new city, but even once in awhile at home, its difficult to think of fun things to do, great places to eat, and better places to let loose and enjoy a favorite beverage.

## Results
We created this awesome application to provide a one-stop-shop to
Find upcoming events in the desired area (using the SeatGeek API), 
Find local bars (using the Yelp Fusion API), and 
Find nearby restaurants (using the Zomato API), 
All found with the help of HTML-5’s geolocation abilities and 
The incomparable Zippopotam.us API.

## Team Efforts
Julia was responsible for the forms and using the geolocator and Zippopotam.us
Daniel was responsible for the restaurants using Zomato
Enrique was responsible for the bars using Yelp
David was responsible for the events using SeatGeek

## Individual Responsibilities - Julia
Used HTML-5 geolocation so results can default to user’s current location
Grabbed user inputs from form into variables
Utilized Zippopotam.us to get latitude and longitude from user location input
Added "catches" to prevent users from entering invalid locations or dates

## Individual Responsibilities - Daniel
Used the Zomato API to find the local restaurants with their location, food types, prices, and ratings for those who want to grab a bite.
Grabs user inputs and converts them into variables so that the zomato api can execute the search function to find the restaurants.

## Individual Responsibilities - Enrique
Used Yelp Fusion API to locate different bars on the area of players choice
Grabbed user inputs to find the bars, location, rating, pricing, and yelp URL

## Individual Responsibilities - David
I was responsible for getting the API key from SeatGeek and researching the documentation for the API.
I used the JSON properties to design the creation and display of the information on the webpage.
I was also responsible for finding and making the animations from AOS (Animate on Scroll) for the page work.
I also took all the JavaScript that the four of us wrote and put it all into one file so it would interact nicely.

## Challenges
We had to make a zip code API change due to ZipCodeAPI only allowing 10 calls an hour.  Then we found Zippopotam.us
The Zomato API was not as user-friendly as some of the other APIs.  It’s the only code that we all had to spend time with in the wrestling ring, but we were victorious (mostly).

### Challenges - Animations
First we tried ScrollReveal.js: https://scrollrevealjs.org/
It looked really cool, but we could not get it to work.
There might have been a free version that we were working with, but it was not as simple as the documentation made it seem.

### Challenges - Animations
Then we tried WOW.js: https://www.delac.io/wow/index.html 
It looked really doge, but again, we could not get it to work the way we wanted, but we visited its GitHub repository, and there it referred to AOS…

### Challenges - Animations
Finally, we found the Animate on Scroll, or AOS library.
https://michalsnik.github.io/aos/ 
And this was our new technology!  Very user friendly, and it makes our events, bars, and restaurants appear like witchcraft!

## Improvements
In future iterations, we would add a way to save your favorite events, bars, and restaurants so that you can come back to refer when you are out on the town
We also would include a small weather part so you can tell if it’s going to rain on your night on the town.
We also want to add in Group 7’s  application for parking, but just on a wider scale that works in every city in the USA, so you can find a spot that is close to everything.

We also would find a stock photo API for the different restaurant cuisines, or just double up on Yelp.
We would also include a way to contact the restaurants and bars so that there aren’t pictures of the bathroom sink as their main image.
Image from https://www.yelp.com/biz/jermans-cafe-cleveland-2 
