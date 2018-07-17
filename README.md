# Flashcards Project

This project is related to the third assessment from Udacity's React Nanodegree Program.

## Getting Start

### Requisites

This project was built using `yarn`, so it is advised to use it instead of yarn.

- Yarn can be downloaded and installed through here [Yarn](https://yarnpkg.com/en/)

### Installing and Running

```
git clone https://github.com/PedroNigrisVasconcellos/react-flashcards.git
cd react-flashcards

yarn install
yarn start
```

**Observation:** You might have to increase the limit of max files the kernel can withstand. This is
the default behaviour on macOs (I haven't installed _watchman_).

```bash
sudo sysctl -w kern.maxfiles=5242880
sudo sysctl -w kern.maxfilesperproc=524288
```

### Develop Environment

This application was tested only in iOS on an actual device (no emulator were used).

## Create React Native App

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
