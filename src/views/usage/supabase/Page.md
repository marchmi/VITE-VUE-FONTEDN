# 项目概述
---
## Element Plus 组件库使用说明
#### 1.概述

当前项目采用[Element Plus](https://doc-archive.element-plus.org/#/zh-CN)作为基础的视图组件库。为了优化项目性能和减少打包体积，采用了按需引入的方式引入 Element Plus 的组件。

#### 2.按需引入的优势

- 减少打包体积：仅引入项目中实际使用的组件，避免了整个组件库的冗余代码。
- 提升加载速度：按需加载的组件在需要时才被加载，减少了初始加载时间。
- 优化性能：减少不必要的代码执行，提升应用的整体性能。

#### 3.配置按需引入

- 在`/src/plugins`目录下创建一个文件（`element.js`），用于按需引入 Element Plus 的组件
- 在项目的入口文件（`main.js`）中引入并使用`plugins/element.js`配置
- 需要使用某个 Element Plus 的组件时，进入`plugins/element.js`检查是否引入对应的组件，未引入时按照文件中的引入流程说明进行操作

#### 4.参考文档

- [Element Plus 官方文档](https://doc-archive.element-plus.org/#/zh-CN)

---