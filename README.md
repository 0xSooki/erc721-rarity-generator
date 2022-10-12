<div  id="top"></div>

[![GitHub license](https://img.shields.io/github/license/0xSooki/nft-rarity-generator)](https://github.com/0xSooki/nft-rarity-generator/blob/main/LICENSE)

![GitHub issues](https://img.shields.io/github/issues-raw/0xSooki/nft-rarity-generator)

![GitHub pull requests](https://img.shields.io/github/issues-pr/0xSooki/nft-rarity-generator)

# NFT Rarity Generator

An NFT rarity generator compatible with multiple chains

<details>

<summary>Contents</summary>

<ol>

<li><a  href="#prerequisite">Prerequisite</a></li>

<li><a  href="#installation">Installation</a></li>

<li><a  href="#usage">Usage</a></li>

<li><a  href="#roadmap">Roadmap</a></li>

<li><a  href="#license">License</a></li>

<li><a  href="#contributing">Contributing</a></li>

<li><a  href="#contact">Contact</a></li>

</ol>

</details>

# Installation

If you are cloning the project then run this first, otherwise, you can download the source code on the release page and skip this step.

```
git clone https://github.com/0xSooki/nft-rarity-generator.git
```

Go to the root of your folder and run this command

```
npm install
```

Alternatively, you can run this command if you have yarn installed.

```
yarn install
```

<p align="right">(<a href="#top">back to top</a>)</p>

# Prerequisite

1. [Node](https://nodejs.org/) version: `>= 16.16.0`
2. [Alchemy](https://www.alchemy.com/) profile: `Alchemy API key is required`
3. [MongoDB](https://cloud.mongodb.com/): `local or cluster link`
4. You must have your `.env` file set up correctly. Copy the `.env.example` and remove the `.example` part and provide the following fields: `ALCHEMY_API_KEY`, `MONGO_DB_URL`, `CONTRACT_ADDRESS` and `FILE_NAME` (the latter is optional)

<p align="right">(<a href="#top">back to top</a>)</p>

# Usage

You can start the application using the following command:

```
npm start
```

The application will perform 2 steps before it can be used:

1. Connection establishment with MongoDb using the provided `MONGO_DB_URL`
2. Base folder structure creation
   - The application will create 1 main folder and 2 sub-folders.
   - The main folder is called `nft`. It is being used to store the retrieved data from Alchemy
   - The 2 sub-folders are called: `calculations` and `errors`
   - The `calculations` folder is being used to store the calculated rarity data based on your contract
   - The `errors` folder is being used to store any data which came up during the data validation phase

Once everything is set, you will be in the `Main menu`:

1. ⏳ Calculate Rarity
   - It opens the `Contract menu`
2. 🚪 Exit Application
   - Closes the application

`Contract menu` has the following options:

1. 📗 Use Default Contract
   - It will start the calculations using the `CONTRACT_ADDRESS` from `.env`
2. 📙 Use Custom Contract
   - You have the option to use a custom contract
3. ⬅️ Back to Main Menu
   - Opens the `Main Menu`

After the calculation has been finished the following options will be available:

1. 💾 Save Calculations (DB)
   - Saves the final data into the provided Database
2. 💾 Save Calculations (JSON)
   - Saves the final data into the `nft/calculations` folder as a JSON file
3. 💾 Save Calculations (ZIP)

- Saves the final data into the `nft/calculations` folder as a compressed JSON file

4. 💾 Save NFT Data (JSON)
   - Saves the fetched data from `Alchemy` into the `nft` folder as a JSON file
5. 💾 Save NFT Data (ZIP)
   - Saves the fetched data from `Alchemy` into the `nft` folder as a compressed JSON file
6. ✏️ Print Errors
   - If any validation error occured, it can be printed into the terminal
7. 💾 Save Errors (JSON)
   - If any validation error occured, it can be saved into the `nft/error` folder as a JSON file
8. 💾 Save Errors (ZIP)
   - If any validation error occured, it can be saved into the `nft/error` folder as a compressed JSON file
9. ⬅️ Back to Main Menu
   - Opens the `Main Menu`
10. 🚪 Exit Application
    - Closes the application

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [x] Base rarity generator

- [ ] Add support for multiple rarity generation methods

See the [open issues](https://github.com/0xSooki/nft-rarity-generator/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature-name`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature-name`)

5. Open a Pull Request to merge your branch into develop

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

sooki.eth - [@sooki](https://twitter.com/0xSooki) - 0xSooki@gmail.com

Project Link: [https://https://github.com/0xSooki/nft-rarity-generator](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>
