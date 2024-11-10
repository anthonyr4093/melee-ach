# melee-ach

> An electron-nuxt project

Hello! Welcome to Melee Achievements, this is a project i have been working on for a little while to try and add fun achievements to Slippi netplay and an attempt to try and learn javascript and learn more about melee! This program takes stats from all of your past and future games and puts them into character specific catagories for you to try and go for. There is also a file browser so you can see the stats that we can see from each game, and a stats page for some overall general stats. If you run into any bugs, please open a github issue, and if you have a suggestion for an achievement, add the enhancement label to the issue. Huge thank you to the Slippi team for making all of this possible.

> Known Issues

---

Achievement parser is laughably slow for some characters, this is because I have to check each individual frame for some achievements and this takes awhile. I recommend choosing a subset of all your files if you think its taking to long

#### Build Setup

```bash
# install dependencies
yarn install

# serve app with hot reload
yarn run dev

# build electron application for production
yarn run build


# lint all JS/Vue component files in `src/`
yarn run lint

```

---

This project was generated with [electron-nuxt](https://github.com/michalzaq12/electron-nuxt) v1.6.0 using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).
