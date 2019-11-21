GEOGRAPHY
=========

## 1. Software

Software:

```
OPERATING SYSTEMS:
    - MacOS Mojave 10.14.6
    - Windows 10 Pro
```

```
Vagrant:     2.2.4
VirtualBox:  6.0.6r130049

node    12.10.0
npm     6.11.3
yarn    1.17.3
```

How to check versions?

```
vagrant --version
VBoxManage --version

node --version
yarn --version
npm --version
```


## 2. Configuration

Hosts configuration:

```
# on HOST OS (e.g. Windows, Ubuntu, OS X)
# /etc/hosts
10.0.0.120 geography.lh
```

## 3. How to start the project?

### 3.1. Clone the project

```
mkdir aiqa
cd aiqa
git clone git@github.com:aiqa/geo-vagrant-symfony3.git
``` 

### 3.2. Build REACT app

```
cd geo-vagrant-symfony3
cd frontend
yarn install
yarn run build
```

### 3.3. Start VM

```
cd geo-vagrant-symfony3
./up.sh
```

### 3.4. Visit homepage

* [https://geography.lh](https://geography.lh)


## 4. REST API documentation

```
documentation/aiqa-geo-rest-api.html
```

## 5. How to run REST API tests locally

```
vagrant ssh
cd /app/behat
composer install
./ci.sh
```

## 6. How to run REST API with AIQA system

```
vagrant ssh
cd /app/behat
composer install
./ci.sh --full-set
```


Demo account:

* https://app.aiqa.tech
* email: 'demo@aiqa.tech'
* password: thisIsTheDemo987ACCount
