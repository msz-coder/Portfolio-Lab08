
# Lab 8 - Personal Portfolio Website

A fully responsive **personal portfolio website** to showcase **projects, skills, and experiences**. Built using **React.js**, inspired by the **DeveloperFolio** template, but heavily modified to match **my personal branding, projects, and professional journey**.

- *Date Created*: 29 Mar 2025
- *Last Modification Date*: 05 Apr 2025
- *Live URL*: [Shafay's Portfolio](https://main.d1vidfdr0slgdn.amplifyapp.com)  
- *Original GitHub Repository*: [DeveloperFolio](https://github.com/saadpasta/developerFolio)  
- *Current GitHub Repository*: [Shafay's Portfolio](https://github.com/msz-coder/Portfolio-Lab7)  
- *GitLab Repository*: [React Portfolio](https://git.cs.dal.ca/zulfiqar/react-portfolio)

## Authors

* [Muhammad Shafay Zulfiqar](m.shafay@dal.ca) - (Developer & Maintainer)

## Built With

* [React.js](https://react.dev/) - Frontend JavaScript library
* [Sass](https://sass-lang.com/) - CSS Preprocessor for styling
* [React Reveal](https://www.react-reveal.com/) - Animation effects
* [React Router](https://reactrouter.com/) - Client-side routing
* [Lottie React](https://github.com/LottieFiles/lottie-react) - Animation handling
* [FontAwesome](https://fontawesome.com/) - Icons and UI elements
* [Jest](https://jestjs.io/) - Unit testing framework
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing
* [Express.js](https://expressjs.com/) - Backend server framework
* [OpenWeather API](https://openweathermap.org/api) - Weather data
* [Heroku](https://www.heroku.com/) - Backend Deployment
* [AWS Amplify](https://aws.amazon.com/amplify/) - Frontend Deployment

## Sources Used

### ContactForm.js

*Lines 30 - 37*

```
const sanitizeMessage = (msg) => {
  return {
    name: msg.name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, "").trim(),
    email: msg.email.trim(),
    subject: msg.subject.replace(/[^A-Za-z ]/g, "").trim(),
    message: msg.message.replace(/[<>]/g, "").trim(),
  };
};
```

The code above was created by adapting the code in [React Documentation](https://react.dev/) as shown below:

```
// Original Contact form only used useState without validation or sanitization.
```

- <!---How---> Added client-side sanitization of form fields.
- <!---Why---> To comply with security and validation requirements of the assignment.
- <!---How---> Implemented sanitization regex patterns specific to each field.

---

### server.js

*Lines 71*

```
app.use("/api/messages", messagesRoutes);
```

The code above was created by adapting the code in Portfolio.

- <!---How---> Created a new Express route for message storage.
- <!---Why---> To fulfill the backend requirement of persisting messages.
- <!---How---> Linked the messagesRoutes to handle /api/messages endpoint.

---

### routes/messages.js

*Lines 19 - 39*

```
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  const sanitized = sanitizeMessage({ name, email, subject, message });
  fs.readFile(messagesFile, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      messages = JSON.parse(data);
    }
    messages.push(sanitized);
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving message" });
      res.status(201).json({ message: "Message saved successfully" });
    });
  });
});
```

The code above was adapted from Express documentation for CRUD API handling.

- <!---How---> Added POST and GET handlers for messages.
- <!---Why---> To enable message submission and retrieval.
- <!---How---> Implemented sanitization before saving and error handling.

---

### MessagesPage.js

*Lines 12 - 20*

```
useEffect(() => {
  fetch("https://portfolio-api-backend-0544f6fc6e71.herokuapp.com/api/messages")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load messages");
      return res.json();
    })
    .then((data) => setMessages(data))
    .catch((err) => setError("Error loading messages"));
}, []);
```

The code above was created by adapting React’s useEffect pattern.

- <!---How---> Added data fetching logic using fetch() and useEffect.
- <!---Why---> To dynamically load messages from the backend.
- <!---How---> Added error handling and conditional rendering.

---

## Artificial Intelligence Tools Used

* [ChatGPT](https://openai.com/chatgpt) - The AI Tool used

### Prompt Used on *ChatGPT*

```
Help me write a backend route to store sanitized contact form messages in a JSON file.
```

The code prompt above was used on [ChatGPT](https://openai.com/chatgpt) to generate the code shown below:

#### File Name: routes/messages.js
*Lines 19 - 39*

```
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  const sanitized = sanitizeMessage({ name, email, subject, message });
  fs.readFile(messagesFile, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      messages = JSON.parse(data);
    }
    messages.push(sanitized);
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving message" });
      res.status(201).json({ message: "Message saved successfully" });
    });
  });
});
```

- <!---How---> Implemented this route to store messages.
- <!---Why---> To fulfill backend data persistence requirement.
- <!---How---> Sanitization logic integrated, error handling improved.

---

## Tests Implementation
#### File Name: backend/tests/messages.test.js

*Lines 1 - 56*
```
const request = require("supertest");
const express = require("express");
const fs = require("fs");
const path = require("path");
const messagesRoutes = require("../routes/messages");

const app = express();
app.use(express.json());
app.use("/api/messages", messagesRoutes);

describe("Messages API", () => {
  test("should return 200 and list of messages", async () => {
    const res = await request(app).get("/api/messages");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should save a message successfully", async () => {
    const newMessage = {
      name: "Test User",
      email: "test@user.com",
      subject: "Hello",
      message: "This is a test message",
    };
    const res = await request(app)
      .post("/api/messages")
      .send(newMessage)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Message saved successfully");
  });
});
```
- <!---How---> Implemented using Jest + Supertest.
- <!---Why---> To validate backend message submission and retrieval.
- <!---How---> Tested GET and POST APIs with sample data.

## Acknowledgments

* **[Saad Pasta](https://github.com/saadpasta)** for the **DeveloperFolio** template.
* Thanks to **OpenAI** and **GitHub Copilot** for AI-powered debugging!
