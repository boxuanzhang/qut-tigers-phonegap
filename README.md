# QUT Tigers PhoneGap Project

## Install Dev Env

### Install NodeJS

Follow the instructions of [Node.js](https://nodejs.org/)

### Install PhoneGap

```
$ sudo npm install -g phonegap
```

### Install cordova

```
$ sudo npm install -g cordova
```

### Install Yeoman

```
$ sudo npm install -g yo
```

### Install AngularJS Generator

```
$ sudo npm install -g generator-angular
```

### Install Grunt Build System

```
$ sudo npm install -g grunt-cli
```

### Install Bower Manager

```
$ sudo npm install -g bower
```

### Install npm dependencies

```
$ cd $PROJECT_ROOT/app
$ sudo npm install --development
```

### Prepare bower packages

```
$ cd $PROJECT_ROOT/app
$ sudo bower install
```

## Build

### Step 1: Build Web App

```
$ cd $PROJECT_ROOT/app
$ grunt build
```

### Step 2: Prepare iOS Project

```
$ cd $PROJECT_ROOT
$ cordova prepare
```

### Step 3: Build iOS App

Build project located at `$PROJECT_ROOT/platforms/ios/` using Xcode.
