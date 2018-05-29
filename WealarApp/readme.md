![Ionic logo](https://ionicframework.com/img/meta/ionic-framework-og.png)

# WEALAR APP

The app for our connecting alarm / meteo station control with STM32

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* NodeJs
* Ionic
* Cordova


### Installing

#### How to install NodeJs

```
https://nodejs.org/en/
```
#### How to install Cordova and Ionic on your computer

```
Windows : C:\> npm install -g cordova ionic
Linux : $ sudo npm install -g cordova ionic
```

#### Don't forget to install node package at first

```
npm install
```

## Ionic

#### How to create a project

```
ionic start myApp tabs|blank|sidemenu|empty
```

#### How to launch it

```
cd myApp
ionic serve -l
```

#### How to create new things

```
cd myApp
ionic g provider authService
ionic g page home
```

### Description of the different folder
* [platforms](https://ionicframework.com/docs/cli/cordova/platform/): configuration of the differents platform generate automatically:
```
ionic cordova add platform Android|ios|windows
```
* __plugins__: the differents cordova plugin add to the project
* __ressources__: default loading imgs for platforms
* __src__: the most important folder with the code pour the app
    * __app__: regroup the declarations files
        * *app.component.ts*: declaration of rootPage and what to do when the platform is ready
    * __app.module.ts__: this is the brain of the code which will make the connexion between each other
    * __assets__: ressources for the app imgs, icon, json or whatever
    * __page__: this folder contains the code for all the differents pages of our app including html, css and js adapt with typescrit
    * __providers__: the provider can share information to a lots of pages and keep these information in memory in contrary, pages will reset all variable when it is leave
    * __theme__: colors of the theme of the app is define here and can be call wherever
* __www__: the [build](https://ionicframework.com/docs/cli/cordova/build/) create to launch the app:
```
ionic cordova build Android|ios|windows
```
* *config.xml*: Declaration of name, description, author and preferencies for the application
* *package/package-lock.json*: npm dependencies
* *tsconfig/tslint.json*: typescript configuration




### Sources
* [Ionic Doc](https://ionicframework.com/docs/): For most of the parts I find documentation here, for components or ionic API
* [Agular Doc](https://angular.io/docs):For technical javascript code I look in the angular documentation, like for the observable, promise or HttpClient

* [Login](https://devdactic.com/login-ionic-2/): Only for the login I used this good template. But this version was for Ionic 2 and Angular 2. So, I have to adapt some parts and create all the connexion code to our API



