# Getting Started

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Setting Environment](#setting-environment)
4. [Setup Docker](#setup-docker)
5. [Setup database](#setup-database)
6. [Start Server](#start-server)
7. [Migration Commands](#migration-commands)

---

## Prerequisites

- nvm

  ```sh
  nvm use 20
  ```

If you don't have nvm, you can install it from homebrew

1. Install nvm

   ```sh
   brew install nvm
   ```

2. Install node version 20

   ```sh
   nvm install 20
   ```

---

## Installation

- Checkout the repository

  ```sh
  git checkout dev
  ```

- Install node module

  - yarn

    ```sh
    yarn
    ```

  - npm

    ```sh
    npm install
    ```

---

## Setting Environment

- Create a file named `.env` in the root directory of the project

---

## Setup Docker

- Create a database from the docker-compose file

```bash
docker compose up -d
```

---

## Setup database

1. Connect to postgres database
   `` user: `xxx` , password: `xxx` ``
2. Database name is `template_typeorm_class_init`
3. Migrate database

   ```sh
   yarn migrate
   ```

---

## Start Server

```sh
yarn dev
```

---

### Migration Commands

- Migrate database

  ```sh
  yarn migrate
  ```

- Generate migration file

  ```sh
  yarn generate <migrations file path>
  ```

  example:

  > yarn generate src/migrations/postgres/ChangeColumnToNullable

- Drop database schema

  ```sh
  yarn schema:drop
  ```

---
# bariendo-backend
