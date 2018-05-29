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
#### How to install Cordova and Ionic

```
Windows :	C:\>npm install -g cordova ionic
Linux : $ sudo npm install -g cordova ionic
```

## Ionic

#### How to create a project

```
ionic start myApp tabs|blank|sidemenu|empty
```

#### How to launch it

```
cd myApp
npm install
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
* plugins: the differents cordova plugin add to the project
* ressources: default loading imgs for platforms
* src: the most important folder with the code pour the app
    * app: regroup the declarations files
        * app.component.ts: declaration of rootPage and what to do when the platform is ready
    * app.module.ts: this is the brain of the code which will make the connexion between each other
    * assets: ressources for the app imgs, icon, json or whatever
    * page: this folder contains the code for all the differents pages of our app including html, css and js adapt with typescrit
    * providers: the provider can share information to a lots of pages and keep these information in memory in contrary, pages will reset all variable when it is leave
    * theme: colors of the theme of the app is define here and can be call wherever
* www: the [build](https://ionicframework.com/docs/cli/cordova/build/) create to launch the app:
```
ionic cordova build Android|ios|windows
```
* config.xml: Declaration of name, description, author and preferencies for the application
* package/package-lock.json: npm dependencies
* tsconfig/tslint.json: typescript configuration




### Sources
For most of the parts I find documentation on ionic official doc: https://ionicframework.com/docs/ or on the Angular official doc: https://angular.io/docs
Only for the login I used a good template here : https://devdactic.com/login-ionic-2/
But this version was for Ionic 2 and Angular 2
I have to adapt some parts and create all the connexion code to our API

