/* eslint-disable no-undef */
const DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor
const SpecReporter = require('jasmine-spec-reporter').SpecReporter
const StacktraceOption = require('jasmine-spec-reporter').StacktraceOption

class CustomProcessor extends DisplayProcessor {
  displayJasmineStarted(info, log) {
    return `TypeScript ${log}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE,
      displayDuration: true
    },
    summary: {
      displayErrorMessages: true
    },
    prefixes: {
      successful: '✅ - '
    },
    customProcessors: [CustomProcessor]
  })
)