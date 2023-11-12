# [Gateway API Rest](https://ladjs.github.io/superagent/)

[![MIT License][license-badge]][license]

> Developed by [alainfd82](https://github.com/alainfd82)

## About

The objective of this module is to provide a solution to a test as part of the selection process of the MusalaSoft Company

## Getting Started

To use the _Gateway Api Rest_ module follow the following instructions.

1. **Clone the repository**

```bash
git clone https://oauth:glpat-2r4Q5zpjfpstAZCfPrFy@gitlab.com/musala_soft/DEV_GATEWAYS-82f4bfe7-c570-8778-d130-9a54b3168aaa.git
```

2. **Database**:
   MongoDB was used as a database, for this a cluster was created using MongoDb Atlas, in case of reusing the same cluster created for this exercise, a `.env` file must be created with the following environment variable.

   > MONGODB_URI=mongodb+srv://alainfd82:VOBZ6vH0mJ34t3DI@cluster0.7kn1nrx.mongodb.net/?retryWrites=true&w=majority

3. **Port**:
   This solution uses port `5000` by default. If you want to use another one, include the PORT environment variable in the `.env` file.

   > PORT=_8080_

4. **Install dependencies**:
   To install the dependencies run the following command

```bash
yarn
```

5. To run the project in development mode run the following command.

```bash
yarn run dev
```

6. To run the project in `production` mode run the following command.

```bash
yarn run start
```

7. To run the tests.

```bash
yarn run tests
```
