# Code Institute Stream 2 Interactive Data Visualisation of Videogame Global Sales


####Data source

The data for this project was downloaded as csv and MongoDB was used to host them as json formatted files.
####Framework

Python Flask is used as the framework for this app. Within the static directory, a sub-directory lib contains both a css and js directory
####Python

A python file named videogameSales.py renders with flask an index.html template and builds a web server to interact with MongoDB.
####Unit test

An example of an unit test is shown in the test_videogameSales.py file.
####HTML

graph.js is linked within index.html file which creates the graphs and a custom css file for dashboard styling.
The links to the static files are written in Jinja.
####JavaScript

To enable data visualisation a number of JavaScript libraries are used.
D3.js renders charts in svg
DC.js is used as a wrapper for D3 charts
Crossfilter.js is what allows the charts to be modified live
keen.js is a dashboard template library.
Bootstrap.js
The graph.js file was created to take the data from videogameSales.py, filter it with crossfilter, then chart it with a combination of D3 and DS. The file is stored in a js directory within the static directory separate from 3rd party files.

###CSS3

Custom css file is used to style the navbar, button, div layout and the colour palette. DC.css styles the charts and keen-dashboard the dashboard layouts.
####Hosting

Heroku is used to host this app. The app was deployed to Heroku over git. The server used for hosting is mLab MongoDB. The dataset were imported to the MongoDB collection as csv files.
