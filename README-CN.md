[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/citahub/microscope-v2)
[![CITAHub](https://img.shields.io/badge/made%20for-CITAHub-blue.svg)](https://www.citahub.com/)

English | [简体中文](./README-CN.md)

# 概述

  Microscope的v2版本(Microscope提供了一个易于使用的用户界面来查询CITA链上信息)


# 关于 Microscope

  Microscope是一款区块链浏览器，用[React](https://reactjs.org/)构建，用于查询CITA链上的数据。 它支持搜索区块，交易，帐户信息和调用智能合约方法。 它还可以与[ReBirth](https://github.com/citahub/re-birth)一起使用，实现指定组合条件的区块交易列表查询，分析CITA的工作状态等高级功能。


# 功能特性

## v1功能继承

* 链网络状态信息、实时出块与实时交易信息、综合搜索、网络切换

* 区块列表、区块详情、ReBirth条件组合查询

* 交易列表、交易详情、ReBirth条件组合查询

* 账号余额、交易查询

* 合约在线查看与调用

* 统计图表

* 移动端兼容

## v2改进

* 简化调试开发环境

* 新增 rpc API/ rebirth API列表(支持在线编辑发送请求查看返回)

* 优化实时出块交易轮询，修正页面卡顿崩溃

* 修正优化高级搜索功能

* 优化区块与交易列表翻页

* 国际化文件依赖在线服务切换为本地JSON文件编辑


# 运行
  
  * 环境准备

    node ^8.10.0 || ^10.13.0 || >=11.10.1

    yarn >=1.13.0

    上述配置可能会出现问题，若 yarn install 或 yarn start 在编译阶段出现问题，可以按照以下配置重试：

    node ^10.13.0

    yarn >=1.13.0

    typescript ^3.2.2

  *  下载仓库

  ```
  git clone https://github.com/citahub/microscope-v2/
  ```

  *  安装依赖

  ```
  yarn install
  ```

  * 修改配置, 在"src/utils/config.ts"

  ```
  const api: API = {
    serverList: [
      {
        name: 'Re-Birth Server',
        url: 'https://rebirth.citahub.com'
      },
      {
        name: 'CITA Node Server',
        url: 'https://testnet.citahub.com'
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

  *  调试环境

  ```
  yarn start
  ```

  *  生产环境

  ```
  yarn build // build 产生目录可直接拷贝到nginx等web服务器下
  ```


# 快速拥有一个micrscope

  * Fork the microscope-v2, On https://github.com/citahub/microscope-v2, 点击 Fork.

  * Forking 完成后, 点击 Settings 并且 enable Github pages.

  * 验证是否成功通过访问 https://YOUR_GITHUB_USERNAME.github.io/microscope-v2/ i.e. if your github name is citahub then replace YOUR_GITHUB_USERNAME with citahub.

# 使用docker 部署一个microscope
  1. docker build -t microscope .  构建docker镜像
  2. docker run --name microscope -d -p 80:80 microscope   后台启动镜像，绑定80端口

# 目录结构


*  /public --------------------- html与字体图片等静态资源目录

*  /src/index.tsx -------------- 入口文件

*  /src/layouts/app.tsx -------- 应用root, 设置页面布局，全局模态框，加载框，toast提示等

*  /src/routes  ---------------- 分页面总路由文件

*  /src/locale  ---------------- 国际化文件

*  /src/layout/  --------------- 页面

*  /src/layouts/home/ ---------- 首页

*  /src/layouts/block/ --------- 区块列表、区块详情

*  /src/layouts/transaction/ --- 交易列表、交易详情

*  /src/layouts/address/ ------- 账户详情

*  /src/layouts/static/ -------- 统计页面

*  /src/layouts/api/ ----------- api列表与调用页面

*  /src/layouts/error/ --------- 404错误页面

*  /src/layouts/search/ -------- 搜索失败页面

*  /src/layouts/common --------- 页面共享组件，交易列表分页表格、交易搜索模态框、区块搜索模态框
 
*  /src/components/ ------------ 基础组件，header/content/footer/loading/tab/toast/modal

*  /src/components/redux ------- redux相关的reduce/action/state

*  /src/utils/ ----------------- 工具类

*  /src/utils/dataAPI ---------- microscope的所有数据API，目前依赖rebirthAPI

*  /src/utils/rebirthAPI ------- 封装兼容rebirth交互与citaSDK直接调用rpc交互

#库

* [react](https://reactjs.org/)

* [redux](https://github.com/reduxjs/redux)

* [react-router](https://github.com/ReactTraining/react-router)

* [bootstrap](https://github.com/twbs/bootstrap)

* [react-json-view](https://github.com/mac-s-g/react-json-view)

* [rc-pagination](https://github.com/react-component/pagination)

* [rc-select](https://github.com/react-component/select)

* [echarts-for-react](https://github.com/hustcc/echarts-for-react)

