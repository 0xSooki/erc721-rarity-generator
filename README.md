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

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

    git clone https://github.com/0xSooki/nft-rarity-generator.git

Go to the root of your folder and run this command

    npm install

Alternatively you can run this command if you have yarn installed.

    yarn install

<p  align="right">(<a  href="#top">back to top</a>)</p>

# Prerequisite

1. [Node](https://nodejs.org/) version: `>= 16.16.0`
2. [Alchemy](https://www.alchemy.com/) profile: `Alchemy API key is required`
3. [MongoDB](https://cloud.mongodb.com/): `local or cluster link`
4. You must have your `.env` file setup correctly. Copy the `.env.example` and remove the `.example` part and provide the following fields: `ALCHEMY_API_KEY`, `MONGO_DB_URL`, `CONTRACT_ADDRESS` and `FILE_NAME` (the latter is optional)

<p  align="right">(<a  href="#top">back to top</a>)</p>

# Usage

In the `config.js` you can set the **contractAddress**, **fileName**, **logPages** features.

Set the **contractAddress** to the collection address you would like to generate the data for.

    const contractAddress = "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e"

Set the **fileName** to the name you would like to name the output file

    const fileName = "Doodles"

**logPages** to true if you would like to see the process of the data generation. (set to _true_ by default)

    const logPages = true

If you're done setting everything up, you can start the code and wait for the data to be generated.

    npm run build

After finished running the data will be saved in the **build** folder in the root directory

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Base rarity generator

- [ ] Add support for multiple rarity generation methods

See the [open issues](https://github.com/0xSooki/nft-rarity-generator/issues) for a full list of proposed features (and known issues).

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature-name`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature-name`)

5. Open a Pull Request to merge your branch into develop

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p  align="right">(<a  href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

sooki.eth - [@sooki](https://twitter.com/0xSooki) - 0xSooki@gmail.com

Project Link: [https://https://github.com/0xSooki/nft-rarity-generator](https://github.com/your_username/repo_name)

<p  align="right">(<a  href="#top">back to top</a>)</p>
