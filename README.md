# Burger Builder App

## Description

A burger building app that allows users to visually create a burger.
Users must create an account, and login to create and order a burger. 
Users can then view their past orders as well.

The difference between this repository and the [burger-builder](https://github.com/jjad14/burger-builder) repository is that this one utilizes React Hooks.

## Built Using

### Frontend
##### React (with React Hooks)
##### Redux

### Backend
##### Firebase


## Usage

### Frontend

Create a .env file in the root of the project. Copy Code below and enter your Firebase url and API key.

```
REACT_APP_FIREBASE_API_KEY=[API KEY]
REACT_APP_BASE_URL=[URL]
```

### Backend

In Firebase, add the code below to your rules.

```
{
  "rules": {
     "ingredients": {
        ".read": "true",
        ".write": "true"
      },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null",
          ".indexOn": ["userId"]
      }
  }
}
```

## Run

#### Frontend
```
npm install
npm start
```

