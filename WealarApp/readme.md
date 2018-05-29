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

#### How to install Cordova

```
Windows : C:\>npm install -g cordova
Linux : $ sudo npm install -g cordova
```

#### How to install Ionic

```
Windows :	C:\>npm install -g ionic
Linux : $ sudo npm install -g ionic
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
ionic serve -l
```

#### How to create new things

```
cd myApp
ionic g provider authService
ionic g page home
```

## Git

### Preparation

```
git init 
touch .ignore
touch readme.md
```

### Use

Make sure you are at the root of the project

#### How to use git

```
To have status of file : git status
To track file : git add .
First commit : git commit -m "Initial commit"
To take into account the modifications : git commit -a -m "updated readme"
```

#### How to push your code to git

```
HTTPS : git remote add origin https://github.com/LucienDoustaly/WealarApp.git
SSH : git@github.com:LucienDoustaly/WealarApp.git
How to configure ssh : https://help.github.com/articles/connecting-to-github-with-ssh/

Push your code : git push -u origin master
```

#### Add tags (version)

```
git tag v0.1
git push origin v0.1
```