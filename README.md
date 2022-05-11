# Welcome to Sooki!

Haii! I'm [Sooki](https://www.sooki.me/), this is my NFT rarity ranking tool. Here's a quick walkthrough to how to set it up.
# Installation
If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

    git clone https://github.com/0xSooki/nft-rarity-generator.git
Go to the root of your folder and run this command

    npm install
Alternatively you can run this command if you have yarn installed.

    yarn install
# Usage
Firstly set up your `.env` by removing the `.example` part of the `.env.example` file in the root directory and provide your [Moralis](https://moralis.io/) **SERVER_URL** and **APP_ID**

    SERVER_URL="YOUR_MORALIS_SERVER_URL"
    APP_ID="YOUR_MORALIS_APP_ID"

In the `config.js`you can set the **contractAddress**, **collectionName**, **upload**, **json** and **logging** features.
Set the **contractAddress** to the collection address you would like to generate the data for.

    const contractAddress = "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e"
Set the **collectionName** to the collection name of the address.

    const collectionName = "Doodles"
Set **upload** to *true* if you would like to upload it to a Moralis database. (by default it's set to *false*)

    const upload = false;
Set **json** to true if you would like to save the data in JSON format. (by default it's set to *true*)

    const json = true;
Set **logUpload** or **logPages** to true if you would like to see the process of the data generation/upload. (set to *true* by default)

    const logUpload = true
    const logPages = true
If you're done setting everything up, you can start the code and wait for the data to be generated. 

    npm run build
After finished running the data will be saved in the **build** folder in the root directory, and if promted the data will be uploaded to the Moralis database.