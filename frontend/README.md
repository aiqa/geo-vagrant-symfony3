# AIQA - geography

License: `MIT`<br>
Author: `AIQA Techologies - AI powered QA`<br>

---

## Requirements

`../up.sh`

To run `backend` and allow `nginx` to handle production build, at first run following command for `aiqa-geography` root folder.

`yarn`

To run developement server or build production version you need to install dependecies.<br>
To install dependecies run following command in your console.

`yarn postinstall`

This command will execute webdriver-manager to update chromedrivers for selenium e2e testing framework.

---

## Running app

`yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`yarn build`

Builds the app for production to the `dist` folder.<br>
Open [http://geography.lh/](http://geography.lh/) to view deployed production build in the browser.

---

## Running e2e tests
### Protractor

`yarn e2e-dev`

Runs protractor tests in _browser_ for [http://geography.lh/](http://geography.lh/)

`yarn e2e-local`

Runs protractor tests in _browser_ for [http://localhost:3000](http://localhost:3000)


##### Headless flag
```
yarn e2e-dev --headless
yarn e2e local --headless
```

Add `--headless` flag to run tests only in _CLI_, without displaying the browser.

---

## Running e2e tests
### Cypress

`yarn test-dev`

Runs cypress tests in _CLI_ for [http://geography.lh/](http://geography.lh/)

`yarn test-local`

Runs cypress tests in _CLI_ for [http://localhost:3000](http://localhost:3000)

`yarn open-dev`

Runs cypress tests in _browser_ for [http://geography.lh/](http://geography.lh/)

`yarn open-local`

Runs cypress tests in _browser_ for [http://localhost:3000](http://localhost:3000)
