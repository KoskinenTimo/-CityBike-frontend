Pre assignment / Learning project

This is the frontend for citybike app. The app is a pre assignment and learning project to create my first Java spring boot backend.  
You can find the frontend in github: https://github.com/KoskinenTimo/CityBike-backend/

To start the app clone it to a folder you desire and in your editor terminal: npm install && npm start  
App will start at http://localhost:3000  
// TODO if time, docker container and build serving

Features list from pre-assigment, if marked with TODO?, feature can be done if time:  
Import data from the CSV files to a database or in-memory storage = DONE  
Validate data before importing  = DONE  
Don't import journeys that lasted for less than ten seconds = DONE  
Don't import journeys that covered distances shorter than 10 meters = DONE  
  
List journeys = DONE  
  If you don't implement pagination, use some hard-coded limit for the list length because showing several million rows would make any browser choke = DONE  
  For each journey show departure and return stations, covered distance in kilometers and duration in minutes = DONE  
  Pagination = DONE  
  Ordering per column = TODO?
  Searching = DONE  
  Filtering = DONE  

List all the stations = DONE  
    Pagination = DONE  
    Searching = DONE  

Single station view = DONE  
    Station name = DONE  
    Station address = DONE  
    Total number of journeys starting from the station = DONE  
    Total number of journeys ending at the station = DONE  
    Station location on the map = TODO?  
    The average distance of a journey starting from the station = TODO?  
    The average distance of a journey ending at the station = TODO?  
    Top 5 most popular return stations for journeys starting from the station = TODO?  
    Top 5 most popular departure stations for journeys ending at the station = TODO?  
    Ability to filter all the calculations per month = TODO?  

Endpoints to store new journeys data or new bicycle stations = TODO?  
Running backend in Docker = TODO?  
Running backend in Cloud = TODO?  
Implement E2E tests = TODO?  
Create UI for adding journeys or bicycle stations = TODO?  


