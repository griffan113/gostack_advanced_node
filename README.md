# Application Routing:

## Appointments Controller:

| Route/endpoint | Job                      | Method |
| -------------- | ------------------------ | ------ |
| /appointments  | Create a new appointment | POST   |

## Sessions Controller:

| Route/endpoint | Job                     | Method |
| -------------- | ----------------------- | ------ |
| /sessions      | Create new user session | POST   |

## Users Controller:

| Route/endpoint | Job                       | Method |
| -------------- | ------------------------- | ------ |
| /users         | Create a new user account | POST   |
| /users/avatar  | Update user's avatar      | PATCH  |

## Passwords Controller:

| Route/endpoint    | Job                                     | Method |
| ----------------- | --------------------------------------- | ------ |
| /passwords/forgot | Send e-mail to user to recover password | POST   |
| /passwords/reset  | Change user password                    | POST   |

## Profile Controller:

| Route/endpoint   | Job                   | Method |
| ---------------- | --------------------- | ------ |
| /profiles/update | Update user's profile | PUT    |
| /profiles/show   | Return user's profile | GET    |
