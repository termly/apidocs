# Node.js API Authentication Example

This demonstrates how to authenticate API requests to Termly's Public API in a Node.js environment.

## Getting Started

Follow these steps to get the example up and running on your local machine.

### Installation

1. **Install dependencies:**
``` bash
npm install
```

2. **Set up environment variables:**

Copy the .env.example file to a new file named .env and update it with your API credentials:

``` bash
cp .env.example .env
```
Then, open .env and replace `YOUR_PUBLIC_KEY` and `YOUR_PRIVATE_KEY` with your actual API public and private keys.

## Running the Example
To run the example, execute:

``` bash
npm start
```
This will start the server.

With the server running, visit http://localhost:3000/test-auth to make a test API request and verify the successful authentication.