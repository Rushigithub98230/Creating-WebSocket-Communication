// Importing express module to create an HTTP server
import express from "express";

// Importing WebSocketServer from 'ws' to create a WebSocket server
import { WebSocketServer } from "ws"; 

// Creating an instance of an Express application
const app = express();

// Defining the port number where the server will listen
const port = 8080;

// Starting the Express server and storing the server instance in 'server' variable
// The 'server' instance is needed to run both HTTP and WebSocket servers on the same port
const server = app.listen(port, () => {
    console.log("Server is listening on port", port);
});

// Creating a WebSocket server and passing the HTTP server instance to it
// This allows both HTTP and WebSocket servers to run on the same port
const wss = new WebSocketServer({ server });

// Adding an event listener for the 'connection' event
// This callback function runs when a WebSocket connection is established
wss.on("connection", (ws) => {
    // Adding an event listener for the 'message' event on the WebSocket connection
    // This callback function runs when a message is received from the client
    ws.on("message", (data) => {
        // Logging the data received from the client
        // '%s' is used to format the data as a string
        console.log("Data from client: %s", data);
        
        // Sending a response back to the client
        ws.send("Thanks .......");
    });
});

// Note:
/*
 - I have added "type":"module" in package.json to enable ES module syntax.
 - I am using https://hoppscotch.io/realtime/websocket as our WebSocket client for testing.
 - To connect to the server using Hoppscotch, use the address "ws://localhost:8080".
 - The data received from the client will be in buffer form. To convert it to a string, use '%s' in the console log.
 - You can see the WebSocket connection by inspecting the Network tab in your browser's developer tools and looking under the 'WS' (WebSocket) section.
 - Although I am using Hoppscotch for testing, you can also create a client (frontend) and use the WebSocket browser API to communicate with the server, similar to how we use the Fetch API for HTTP requests.
  - Add "type": "module" to your package.json:
  {
  "name": "websocket-server",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ws": "^8.5.0"
  }
}
- Initialize a new Node.js project:  npm init -y 
- Installing necessary packegses: npm install express ws
-  run the server using node index.js
 */
