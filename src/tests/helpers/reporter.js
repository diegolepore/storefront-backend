import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'

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