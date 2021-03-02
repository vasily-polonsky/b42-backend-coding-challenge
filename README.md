# B42 Backend Coding Challenge
Build an API for the following use case:

You have a database with _workouts_ and _users_.
A _user_ can finish _workouts_ and also can rate them.
If a user finishes or rates a workout, it should be saved into the database.
The entry should also contain the time when this took place.

### Specifications for _users_ and _workouts_
#### User schema
A User contains at least this information:
- Unique ID
- Email
- Password
- Name (optional)
- Profile image (optional - you don't need to implement uploading or saving a profile image. Just think about how you would approach such a use case and prepare your implementation for it)

#### Workout schema
A workout consists mostly of this:
- Unique ID (human readable and identifieable)
- Name
- List of exercises

## What technologies to use
- Node.js
- MongoDB
- Docker + Docker Compose

## Additional
Provide your finished solution with working Docker Compose config, so that the only thing to do is to run `docker-compose up` and everything is working.

If anything is unclear, just do it the way that makes the most sense to you.

## How to submit your solution
Either fork this repo or create a new one on GitHub and send us the link to your solution.
Please make sure, that your solution repo __is public__.
