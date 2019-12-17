[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/cryptape/microscope-v2)
[![CITAHub](https://img.shields.io/badge/made%20for-CITAHub-blue.svg)](https://www.citahub.com/)

English | [简体中文](./README-CN.md)

# Overview

  Microscope v2(Microscope provides an easy-to-use user interface to inspect CITA)


# About Microscope

  Microscope is a blockchain explorer built with [React](https://reactjs.org/) for inspecting CITA. It supports searching block, transaction, account and invoking call method of smart contract. It also can work with [ReBirth](https://github.com/cryptape/re-birth) to display a list of blocks and transactions on specified conditions, or even analyzes CITA‘s working status.


# Features

## extend v1 features

* Chain Meta Info、RealTime Block and Transaction Info、Advance Search、Switch Network

* Block List、Block Detail、ReBirth Advance Query

* Transaction List、Transaction Detail、ReBirth Advance Query

* Address Account Blance、Transactions under the Address

* Contract Online Query and Call

* Static Chart

* Mobile Access

## v2 Improvement

* Simplify Development/Debug Environment

* Add RPC API/ ReBirth API List(edit sending-request and check response)

* Optimize real-time Block/Transaction Polling; Fixed Page Crash

* Fix/Optimize Advanced Search Function

* Optimize Block/Transaction List Pagination

* Add ERC20 Transactions Query

* Internationalization files from relying on online services to switch to local JSON files


# Run

  * Prerequisite

    node ^8.10.0 || ^10.13.0 || >=11.10.1

    yarn >=1.13.0

  *  clone the repo

  ```
  git clone https://github.com/cryptape/microscope-v2/
  ```

  *  Install Dependencies

  ```
  yarn install
  ```

  * modify config in "src/utils/config.ts"

    ```
    const api: API = {
      serverList: [
        {
          name: 'Re-Birth Server',
          url: 'https://rebirth.citahub.com'
        },
        {
          name: 'CITA Node Server',
          url: 'https://node.citahub.com'
        }
      ],
      jsonRpc: '/',
      url: '/api/info/url',
      status: '/api/status',
      statistics: '/api/statistics',
      blockList: '/api/blocks',
      blockListV2: '/api/v2/blocks',
      transactionList: '/api/transactions',
      ercTransactionList: '/api/erc20/transfers'
    }

    const config: Config = {
      api: api,
      apiTimeout: 15000,
      apiTimeoutMsg: 'api timeout，try it later',
      apiErrorMsg: 'network error！',
      icpRecordName: '',
      icpRecordUrl: ''
    }
    ```

  *  Develop Environment

  ```
  yarn start
  ```

  *  Production Environment

  ```
  yarn build // the output directory could be copied to nginx webServer
  ```


# Have one microscope quickly

  * Fork the microscope-v2, On https://github.com/cryptape/microscope-v2, click Fork.

  * Once forking completes, click Settings and enable Github pages.

  * Verify that it works by visiting https://YOUR_GITHUB_USERNAME.github.io/microscope-v2/ i.e. if your github name is cryptape then replace YOUR_GITHUB_USERNAME with cryptape.


# Directory Structure


*  /public --------------------- html/font/images assets

*  /src/index.tsx -------------- entrance

*  /src/layouts/app.tsx -------- App root, Page layout，global modal，loading，toast etc

*  /src/routes  ---------------- route of all pages

*  /src/locale  ---------------- i18 JSON files

*  /src/layout/  --------------- Page

*  /src/layouts/home/ ---------- Home page

*  /src/layouts/block/ --------- Block List、Block Detail

*  /src/layouts/transaction/ --- Transaction List、Transaction Detail

*  /src/layouts/address/ ------- Address detail

*  /src/layouts/static/ -------- Static Page

*  /src/layouts/api/ ----------- API list and API call simulation

*  /src/layouts/error/ --------- 404 Error Page

*  /src/layouts/search/ -------- Search Failed Page

*  /src/layouts/common --------- Transaction Table、Transaction Search Modal、Block Search Modal

*  /src/components/ ------------ Basic Components，header/content/footer/loading/tab/toast/modal

*  /src/components/redux ------- redux reduce/action/state

*  /src/utils/ ----------------- utils

*  /src/utils/dataAPI ---------- all data API，currently mainly dependent on ReBirthAPI file

*  /src/utils/rebirthAPI ------- package ReBirth interaction and citaSDK direct rpc interaction

# library

* [react](https://reactjs.org/)

* [redux](https://github.com/reduxjs/redux)

* [react-router](https://github.com/ReactTraining/react-router)

* [bootstrap](https://github.com/twbs/bootstrap)

* [react-json-view](https://github.com/mac-s-g/react-json-view)

* [rc-pagination](https://github.com/react-component/pagination)

* [rc-select](https://github.com/react-component/select)

* [echarts-for-react](https://github.com/hustcc/echarts-for-react)

