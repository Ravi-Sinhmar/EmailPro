
# Email Pro Application

![UI Preview](./client/Design/1.png)

A powerful email automation tool that allows you to send bulk and single emails, edit emails with AI, and track sent and replied emails. Built with a modern tech stack for seamless performance.

**Live Demo:** [Live Website URL](#) <!-- Add your live URL here -->

---

## Features

- **Bulk & Single Emails**: Send emails to multiple recipients or craft personalized single emails.
- **AI-Powered Email Writing**: Write or edit emails using AI with custom prompts.
- **Email Tracking**: View all sent emails in two sections: replied and sent.
- **Resume Attachment**: Easily attach resumes to your emails.
- **User-Friendly UI**: Clean and intuitive interface for seamless navigation.

---

## Screenshots

<div align="center">
  <img src="./client/Design/1.png" alt="UI 1" width="200"/>
  <img src="./client/Design/2.png" alt="UI 2" width="200"/>
  <img src="./client/Design/3.png" alt="UI 3" width="200"/>
  <img src="./client/Design/4.png" alt="UI 4" width="200"/>
   <img src="./client/Design/5.png" alt="UI 1" width="200"/>
  <img src="./client/Design/6.png" alt="UI 2" width="200"/>
  <img src="./client/Design/7.png" alt="UI 3" width="200"/>
  <img src="./client/Design/8.png" alt="UI 4" width="200"/>
   <img src="./client/Design/9.png" alt="UI 1" width="200"/>
  <img src="./client/Design/10.png" alt="UI 2" width="200"/>
  <img src="./client/Design/11.png" alt="UI 3" width="200"/>
  <img src="./client/Design/12.png" alt="UI 4" width="200"/>
   <img src="./client/Design/13.png" alt="UI 1" width="200"/>
  <img src="./client/Design/14.png" alt="UI 2" width="200"/>
  <img src="./client/Design/15.png" alt="UI 3" width="200"/>
  <img src="./client/Design/16.png" alt="UI 4" width="200"/>
  <img src="./client/Design/17.png" alt="UI 4" width="200"/>
  <img src="./client/Design/18.png" alt="UI 4" width="200"/>
  <img src="./client/Design/19.png" alt="UI 4" width="200"/>
</div>

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas (for database)
- Google Developer Account (for Gmail APIs)
- OpenAI API Key (for AI features)

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/email-pro.git
   cd email-pro
   ```

2. **Set Up the Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Set Up the Server**:
   ```bash
   cd ../server
   npm install
   ```

4. **Create `.env` File**:
   Create a `.env` file in the `server` directory and add the following:

   ```env
   # Normal
   PORT=3000
   NODE_ENV=local

   # Gmail APIs
   auth_uri="https://accounts.google.com/o/oauth2/auth"
   token_uri="https://oauth2.googleapis.com/token"
   auth_provider_x509_cert_url="https://www.googleapis.com/oauth2/v1/certs"
   GOOGLE_CLIENT_ID=4224361063ksjdffkltssaebkslhp5jtp4hlncq3ocnpslfdkjsd10e5.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GPXKkdhkSJ-1ZYsn_-TKY3ss3-DXl76KKJDt
   GOOGLE_REDIRECT_URI=http://localhost:5173/email/callback

   # JWT Secrets
   JWT_SECRET=Your_Secret_Key
   MONGO_URI=mongodb+srv://username:password@cluster0.bsrjbs4.mongodb.net/sample_mflix?

   # AI Keys
   API_KEY=AIzaSyDfqgT9495uaGRszGlAEj2nIYs39udC4IIkdjgILD24
   ```

5. **Run the Server**:
   ```bash
   npm start
   # or
   node app.js
   ```

6. **Configure Google Developer Console**:
   - Go to the [Google Developer Console](https://console.developers.google.com/).
   - Create a new project and configure OAuth consent screen.
   - Enable Gmail API and create credentials.
   - Download the `credentials.json` file and place it in the `server` directory.

7. **Configure OpenAI API**:
   - Add your OpenAI API key in the `utils/ai.js` file.

---

## Folder Structure

```
email-pro/
├── client/              # Frontend code
│   ├── public/
│   ├── src/
│   └── Design/          # UI screenshots
├── server/              # Backend code
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
└── README.md            # Documentation
```

---

## Technologies Used

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Google OAuth
- **AI Integration**: OpenAI API
- **Email APIs**: Gmail API (Create your app on google developer conosle , enable gamil apis [you can search and find by gmail apis])

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

For any queries, feel free to reach out:

- **Email**: ravi.sinhmar28@gmail.com
- **GitHub**: [Ravi-Sinhmar](https://github.com/Ravi-Sinhmar)
```



