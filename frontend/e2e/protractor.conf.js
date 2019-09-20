/* eslint-disable no-undef */
const isHeadless = process.argv.includes('--headless');
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  framework: 'jasmine',
  specs: ['./protractor/**/*.spec.js'],

  baseUrl: 'https://geography.lh',
  directConnect: true,

  getPageTimeout: 10000,
  allScriptsTimeout: 15000,

  jasmineNodeOpts: {
    print: () => {},
    showColors: true,
    isVerbose: true,
    includeStackTrace: false,
    realtimeFailure: true,
    defaultTimeoutInterval: 40000,
  },

  restartBrowserBetweenTests: false,

  onPrepare: () => {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(
      new SpecReporter({
        suite: {
          displayNumber: true,
        },
        spec: {
          displayPending: true,
          displayDuration: true,
          displayErrorMessages: true,
          displayStacktrace: true,
        },
        summary: {
          displaySuccesses: true,
          displayFailed: true,
          displayPending: true,
        },
      }),
    );
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [isHeadless && '--headless'].filter(Boolean),
    },
  },
};
