## Description

Test challenge from Restless.

### Setup

1. Verify that **NodeJS v12.18.2+** is installed. If not, follow [these instructions](https://nodejs.org/en/download/)
2. Install [pm2](https://pm2.keymetrics.io/) running the following command:

   ```bash
    npm install -g pm2
   ```

3. Install [mocha](https://mochajs.org/) running the following command:

   ```bash
    npm install -g mocha
   ```

4. Install project dependencies running the following command:

   ```bash
    npm install
   ```

    *Note*: Setup was verified using a MBP16 2019 with BigSur

### Starting the service

0. Create a file .env on the project root directory using the existing .env.example as example.

1. Run following command to start the api:

      ```bash
    pm2 start index.js
   ```

   ![image-1](/docs/starting-step-1-1.png)

   *Note*: Alternatively pm2 can be avoided completely, though it provides major benefits in order to make the api more resilient. Also, its easier to check logs and api performance with it.

2. Run following command to start pm2 monitoring tool:

      ```bash
    pm2 monit
   ```

   ![image-2](/docs/starting-step-2-1.png)

   *Note*: Press q to quit the monitor tool.

3. Open browser, and navigate to <http://localhost:3000/>

    *Note*: Alternatively can be executed using cURL as follows:

    ```bash
    curl "http://localhost:3000"
   ```

4. To stop pm2, run the following command:

    ```bash
    pm2 stop all
   ```

### Running Unit Tests

1. Execute the following command to run the tests and generate an html report containing the results:

    ```bash
    npm test
   ```

   ![testing-1](/docs/testing-1-1.png)
