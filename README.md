# Hobbeetat
The following application allows users to join their favorite hobby group. They can comment, share, and like their fellow hobbyist's  thoughts and projects as well as share their own.

## Table of contents
* [How to Run](#how-to-run)
* [Features](#features)
* [Documentation](#documentation)
* [Screenshots](#screenshots)

## How to Run
```
cd server
python3 manage.py runserver

cd ../client/app
npm start
```

## Features
There are 4 main features:
1) User registration and joining a hobby:
  - after the successful registration, users will be prompted to verify their email address. The user will then be able to sign in and prompted to select their favorite hobbies. The home feed will load with the first hobby selected, the user will be able to change the hobby context afterward.
2) Group creation and access permissions:
  - users will be able to create groups within a hobby. These groups will have their page with selected users and have unique features, such as polling, document sharing, and group-specific events. Another feature of groups is that the admin/creator can determine user eligibility. There will be three main eligibility criteria; open, invite-only, closed. 
3) Event creation:
  - users can create events in the hobby context that all hobbyists can join and be a part of. These can be virtual or live events.
4) Main hobby feed:
   - users logging in will join their most recent hobby context. After successfully logging on, the feed will render the context of the entire hobby. For users to see their group feed they must enter the group tab and selected the group.

## Tech/Framework Used
- Django/Rest
- Django Channels
- React (Material UI + TailwindCSS)
- Redux
- PostgreSQL
- Redis


## Documentation

The following are my thoughts on Hobbeetat documentation. I want to break the documentation into two parts: the frontend and the backend. I prefer my documentation to reflect my thought process, therefore a more appropriate term is 'Essays' in the spirit of Francis Bacon and philosophers, scientists of times past. Thus, it will be informal and have a more personal touch.

1) Frontend: 

We will begin this conversation by covering my use of WebSockets. I have two WebSockets that provide real-time information on notifications and messages. This requires further development and security, but it does the job. The notification connection requires the current hobby passed in the URL which allows the Django channel to join a specific room. When a user changes hobby a new connection needs to be established reflecting the updated hobby. Currently, only posts are sent as notifications. In the future, I would like to add likes, comments, shares, and events. The WebSocket for the messages works differently where the user's id is sent and a connection is established for the specific user. The only time a message is sent is when a write is made to the database when the recipient is the user. I see the issue in scaling this implementation. Is it necessary for each user to have a connection to the messages channel? I am not entirely sure. This will require further research. The last point I would like to address regarding the frontend is how I've currently set up Redux. I have used TypeScript to form slices that have the initial state, reducer, and actions. I would like to extract this implementation and separate all three for a cleaner codebase. 

I also want to bring attention to a potential problem to my future self about how messages are currently displayed. After the API call to retrieve messages, the inbox is sorted into buckets once the user clicks their inbox. This process is currently running in O(n^2). I need to alter this implementation in the future and maybe pass the sorting to the backend, instead of trying to sort it after the API call. 

2) Backend:

The backend has many conflicting issues that I am still struggling with. I hear that is normal and no architecture will ever be perfect. So maybe I am doing something right. I will start with the database; I currently am using Django with PostgreSQL. I have created models for posts, comments, users, user_groups, user_hobby, pictures, videos, documents, links, notifications, messages, notes, and events. Again, I have notifications that are created on save() with the post and message models. I have not put extra thought into the performance of queries or relationships between tables. The viewsets that I have created a pretty basic and currently are not creating any performance issues. The second point I want to discuss is Django channels. I have established two URLs and two consumers (messages and notifications) which enable WebSockets to connect and receive real-time updates. Django channels provide two options during setup for channel layer, the first is InMemory Channel Layer and the second is Redis Channel Layer. I have decided to go with Redis as the channel layer as it provides production-ready cross-messaging which helps us distribute our messages. InMemory does not provide this feature resulting in sub-optimal processes. The notification consumer creates a room based on the hobby. Therefore, each user that has established a connection to the room will receive notifications specific to the hobby. In the future, I want to provide notifications around the groups a user has joined. I have not thought through how I will implement this feature, but it is something I want to do. The last aspect of the backend I will cover is API endpoints. I have developed viewsets and routes for each model. Therefore, I have endpoints for posts, comments, messages, notifications, users, groups, events, etc. An endpoint that might be of interest is the auth/user/login that accepts a POST method and user credential which allows a user to login. 

One last point regarding authentication. I have decided to JWT for authentication across the application. I have read extensively and I know how contentious the debate between JWT and Session-based authentication is (or at least how contentious it used to be). I stuck with my implementation just because of how easy it is to set up Django and store it within the Redux state. I have decided to switch to session-based authentication if the user base grows to a reasonable amount. Until then this implementation should hold. I also have the expiration time set to 5 minutes, this needs to be corrected as it creates a terrible UX for the user.

Conclusion:

I have covered the major aspects of the application. there be things that I have left out, naturally. Therefore, as I think of things or as they come up I will return to add comments or modify what I have already written.

## Screenshots

#### Home Feed
![Screen Shot 2021-11-15 at 11 33 06 AM](https://user-images.githubusercontent.com/38298940/141818999-66acb369-1be5-4e0e-802b-970c00de46c0.png)

#### Login
![Screen Shot 2021-11-15 at 11 33 26 AM](https://user-images.githubusercontent.com/38298940/141819103-188c72a5-d681-4c4a-a469-66d74c0d1caf.png)

#### Registration
![Screen Shot 2021-11-15 at 11 33 44 AM](https://user-images.githubusercontent.com/38298940/141819174-9cef35cc-02b8-4b4a-a555-4917125d626e.png)
