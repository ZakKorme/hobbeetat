# Hobbeetat
The following application allows users to join their favorite hobby group. They can comment, share, and like their fellow hobbyist's  thoughts and projects as well as share their own.

## Table of contents
* [How to Run](#how-to-run)
* [Features](#features)
* [Backend Dev](#backend-dev)
* [Screenshots](#screenshots)

## How to Run
```
cd server
python3 manage.py runserver

cd ../client/app
npm start
```

## Features
There are 4 main features of this application:
1) User registration and joining a hobby:
  - after the successful registration, users will be prompted to verify their email addresses. The user will then be able to sign in and will be prompted to select their favorite hobbies. The home feed will load with the first hobby selected, the user will be able to change the hobby context they're currently in afterward.
2) Group creation and access permissions:
  - users will be able to create groups within a hobby. These groups will have their page with selected users and have unique features, such as polling, document sharing, and group-specific events. Another feature of groups is that the admin/creator can determine user eligibility. There will be three main eligibility criteria; open, invite-only, closed. 
3) Event creation:
  - users can create events in the hobby context that all hobbyists can join and be a part of. These can be virtual or live events.
4) Main hobby feed:
   - users logging in will join their most recent hobby context. After successfully logging on, the feed will render the context of the entire hobby. For users to see the feed on their groups, they must enter the group tab to see the respective.

## Backend Dev
1) User Creation: 
 - Django comes with its user model. I wanted to add some fields and methods, so I customized the user model with additional fields and methods. 
2) User Registration: 
  - created a route that allows the client to send a request to add a user. This request will send the required fields and other fields will hold default values.
3) User Login: 
- rest.framework.simplejwt is used for authentication. If a user has sent the correct credentials, the response will send an access token that will be required for routes to be exposed on the client side. 
4) Email Confirmation: 
- after a user has been created, an email is sent via ssl and smtp where the user receives a link, upon arrival at the designated url the users email is confirmed and they are routed to the login page. This process is running on a separate thread to prevent lagging on the registration page
5) Tests: the following features have been developed with unit tests
  - User route with authentication.
  - Registration functionality.
  - Login functionality.

## Tech/Framework Used
- Django
- Rest 
- React (Material UI + TailwindCSS)
- Redux
- PostgreSQL

## Screenshots

#### Home Feed
![Screen Shot 2021-11-15 at 11 33 06 AM](https://user-images.githubusercontent.com/38298940/141818999-66acb369-1be5-4e0e-802b-970c00de46c0.png)

#### Login
![Screen Shot 2021-11-15 at 11 33 26 AM](https://user-images.githubusercontent.com/38298940/141819103-188c72a5-d681-4c4a-a469-66d74c0d1caf.png)

#### Registration
![Screen Shot 2021-11-15 at 11 33 44 AM](https://user-images.githubusercontent.com/38298940/141819174-9cef35cc-02b8-4b4a-a555-4917125d626e.png)
