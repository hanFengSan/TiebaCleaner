# TiebaCleaner / 贴吧清洁者
chrome扩展，主要功能：屏蔽百度广告，拉黑百度用户。屏蔽列表自动同步云端，可多设备共享。

## 技术相关
代码上，大致用了``webpack+vue+sass``，也掺和了一些的``jQuery``。主要还是对js在操作样式上有了更深一步的了解。

## 界面/效果预览
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-1.jpg"/>
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-2.jpg" width="400px"/>
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-3.jpg" width="400px"/>
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-4.jpg" width="400px"/>
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-5.jpg" width="400px"/>
<img src="https://github.com/hanFengSan/BilibiliCleaner/blob/master/image/preview-6.jpg" width="400px"/>

## 用户使用说明
[chrome webstore 下载地址](https://chrome.google.com/webstore/detail/%E8%B4%B4%E5%90%A7%E6%B8%85%E6%B4%81%E8%80%85/ffnpdhifpelckhfkhnamdpimbleanpom/)

所有广告开关开启都是直接见效，小部分在关闭时需要刷新。**侧边工具栏要打开的话，必须要同时打开礼包**，这个问题后面再解决。用户屏蔽列表会自动同步到云端，不用担心丢失。添加是立即见效的，而删除需要重新刷新页面。

## 使用
```
npm install
```
先解决依赖，需要``node``环境。
```
webpack
```
如上，即可完成编译，然后在chrome://extensions中勾选``开发者模式``，再选择``已解压的扩展程序``，选择此根目录，即加载成功。




# License

    Copyright (C) 2016 hanFengSan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
