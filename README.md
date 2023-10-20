

<img src="https://github.com/pramod-12345/twilio_chat_app_frontend/assets/102239873/9caa0d06-cc8b-4cd0-87a8-e6b28dbe09d1" width="230" height="230">
<img src="https://github.com/pramod-12345/twilio_chat_app_backend/assets/102239873/ba4105ea-26f0-402e-b785-56445600025e" width="230" height="230">

# Node.js Twilio Token Generator

This Node.js application serves as a server to generate Twilio tokens for users based on their API calls. Users can request a Twilio token by making an API call to the `/getToken/:username` endpoint.

## Features

- Generates Twilio tokens for users.
- Uses Express for handling API requests.
- Utilizes dotenv for environment variable management.
- Integrates the Twilio library for token generation.

## Prerequisites

Before you begin, ensure you have the following requirements:

- Node.js 18.x installed on your machine.
- npm (Node Package Manager) for installing dependencies.
- A Twilio account with API credentials (Account SID and API Secret).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/node-twilio-token-generator.git
   cd node-twilio-token-generator
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the project root and add your Twilio Account SID and API Secret:

   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_API_SECRET=your_api_secret
   TWILIO_AUTH_TOKEN = your_auth_token
   TWILIO_API_SERCRET= your_api_secret
   ```

4. Start the server:

   ```bash
   npm start 
   ```

The server will now be running and ready to generate Twilio tokens for users.

## Usage

To request a Twilio token for a user, make an API call to the following endpoint:

```
GET /getToken/:username
```

Replace `:username` with the actual username for which you want to generate a Twilio token.

The server will respond with a Twilio token that can be used for authentication and authorization within your Twilio application.

## Dependencies

- [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
- [dotenv](https://www.npmjs.com/package/dotenv) - A zero-dependency module that loads environment variables from a `.env` file.
- [Twilio](https://www.twilio.com/docs/quickstart/nodejs/sms) - Twilio Node.js library for working with Twilio services.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```

Make sure to replace `your-username`, `node-twilio-token-generator`, `your_account_sid`, and `your_api_secret` with your actual information. Also, update the license and contributing sections as per your project's requirements.
