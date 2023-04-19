# Wearables E-Commerce Project

You've and your team have been hired by a client to create an e-commerce website that will showcase wearable technology. The client believes that wearable tech is the way of the future!

Your job will be to build a functional e-commerce website where users can come in and shop around for the tech they want.

---

## Getting Started

You have your assignment and your team. What should you do first? This will vary for every team, and even every team member.

> **The important thing is to NOT just jump in and start coding!**

A good brainstorming session is **STRONGLY** recommended! Plan out together :
- What it will look like.
- How it will behave.
- What features you want to have.
- What stretch goals you want to aim for.
- etc...

There probably shouldn't be any coding until a skeleton has been planned out.

---

## Meet your Product Manager!

Each team has been assigned a product manager!
- This person is in charge of answering questions, guiding you and basically preventing everything from falling apart!
- This person will be directing a team stand-up every day.
    - A stand-up is a meeting that lasts around 10 to 15 minutes where each member of the team updates the PM (and other members) about their progress or problems they're facing.

---

## MVP

You have plenty of freedom in how the app will look and behave. As long as you meet the MVP requirements below, your poject will be deemed successful! You are allowed to use external UI libraries to build some nice functionality.

> **✋ You CANNOT use any external styling libraries, including, but not limited to, Material UI, Bootstrap, and Tailwind to style your project!**

## Frontend

Users should be able to:

- View all items in the database.
- Purchase items that are in stock.
- View their cart containing the items they intend to purchase.
    - The cart **CANNOT** use `sessionStorage` or `localStorage`, and must be persistent.
    - **HINT**: use the database. Yes it will be slow, but use it anyways.
- Edit the cart before completing the purchase.
    - **HINT**: use a reducer.

## Backend Requirements

The Node server should

- Be RESTful (use the right `method` for the right job and hold nothing in memory).
- Provide the FE with the required data in a clear and organized way.
- Update the database as users make purchases.

## Code Requirements

That's right! We're dropping code requirements on you! 

- No console logs! _Unless they are part of a catch (logging an error)._
- Comments! Comments everywhere! 
    - Every function should have a comment above it that briefly explains what it does.
        - Remember: a component is a function!
    - Any large / complex block of code should have comments above it that briefly explain what it's doing.
    - Variables should have comments explaing what they're for. **_Especially if there are many with similar names or the name isn't very clear._**
- Organization! No file should be several hundred lines long! Split your code up into different files.
- No bugs! (In a perfect world this would be possible. For now, try to minimize them).

## Project Requirements

You thought we were done? Oh there's more!

- Attendance to the daily stand-ups conducted by your PM.
- A [Trello](https://trello.com) board to divide up the tasks (other similar sites are fine too).
- A group chat or new private discord server for your team and your PM.

## Stretch Goals

Yeup!

> For this project, stretch goals are highly recommended (though not necessary)!

The MVP for this project is small; in fact it's tiny. We strongly encourage you to flex your skills and build something cool and functional! 

Make use of any and all libraries (except styling libraries) you can get your hands on if you think it will make the user's experience on your website better!

---

## About the Data

All about Wearables!
You will find 349 items in the `_data/items.json` file. The data is mostly clean, but there could be some irregularities, i.e. empty values, values that we really don't need. _This is common in large databases, and something that we have to deal with._

> No modifying the data at all. We use what we get!

### Item Object

```js
  {
    "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
    "price": "$49.99",
    "body_location": "Wrist",
    "category": "Fitness",
    "id": 6543,
    "imageSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHB...<REST_OF_IMAGE_ENCODING>",
    "numInStock": 9,
    "companyId": 19962
  },
```

### Company Object

```js
  {
    "name": "Barska",
    "url": "http://www.barska.com/",
    "country": "United States",
    "id": 19962
  }
```

---

## 🤣 Don't be this guy...

<img src='./client/assets/comic-strip.png' style='width: 100%;'/>

---

## Working as a team

Use the [Group Project Step by Step Instructions](https://docs.google.com/document/d/1Txc02kMSnTjyOWFj3HDXc5y5tSurt3AFJGpXZKxvX6A/edit?usp=sharing)

---

## Presentation

Your team will have to present the final product on the final day in order to get a passing grade. Who will draw the short straw?

- The presentation shouldn't be more than 5 mintues long.
