# TiebaCleaner / 贴吧清洁者
chrome扩展，主要功能：屏蔽百度广告，拉黑百度用户。屏蔽列表自动同步云端，可多设备共享。

# Feature
* 屏蔽贴吧广告
* 拉黑贴吧用户, (屏蔽帖子&帖子回复&楼中楼)
* 用户名片上提供拉黑按钮, 一键拉黑

## 技术相关
代码上，大致用了``webpack+vue+sass``，也掺和了一些的``jQuery``。主要还是对js在操作样式上有了更深一步的了解。

## 界面/效果预览
<img src="https://github.com/hanFengSan/TiebaCleaner/blob/master/image/preview-1.jpg"/>
<img src="https://github.com/hanFengSan/TiebaCleaner/blob/master/image/preview-2.jpg" style="width: 400px; display: inline-block; padding: 10px;"/>
<img src="https://github.com/hanFengSan/TiebaCleaner/blob/master/image/preview-4.jpg" style="width: 400px; display: inline-block; padding: 10px;"/>
<img src="https://github.com/hanFengSan/TiebaCleaner/blob/master/image/preview-5.jpg" style="width: 400px; display: inline-block; padding: 10px;"/>
<img src="https://github.com/hanFengSan/TiebaCleaner/blob/master/image/preview-6.jpg" style="width: 400px; display: inline-block; padding: 10px;"/>
<img src="https://github.com/hanFengSan/TiebaCleaner/blob/master/image/preview-7.jpg" style="width: 400px; display: inline-block; padding: 10px;"/>

## 用户使用说明
[chrome webstore 下载地址](https://chrome.google.com/webstore/detail/%E8%B4%B4%E5%90%A7%E6%B8%85%E6%B4%81%E8%80%85/ffnpdhifpelckhfkhnamdpimbleanpom/)

所有广告开关开启都是直接见效，小部分在关闭时需要刷新。**侧边工具栏要打开的话，必须要同时打开礼包**，这个问题后面再解决。用户屏蔽列表会自动同步到云端，不用担心丢失。添加是立即见效的，而删除需要重新刷新页面。

## 使用
```
npm install
```
先解决依赖，需要``node``环境。
```
npm start
```
如上，即可完成编译，然后在chrome://extensions中勾选``开发者模式``，再选择``已解压的扩展程序``，选择此根目录，即加载成功。