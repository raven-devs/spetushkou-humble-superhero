# Pino

## Log Filtering

The Pino philosophy advocates common, preexisting, system utilities.

Some recommendations in line with this philosophy are:

1. Use [grep](https://linux.die.net/man/1/grep):

```bash
# View all "INFO" level logs
node app.js | grep '"level":30'
```

2. Use [jq](https://jqlang.github.io/jq/)

```bash
# View all "ERROR" level logs
node app.js | jq 'select(.level == 50)'
```

## Mapping Pino Log Levels to Google Cloud Logging (Stackdriver) Severity Levels

Google Cloud Logging uses `severity` levels instead of log levels. As a result, all logs may show as INFO level logs while completely ignoring the level set in the pino log. Google Cloud Logging also prefers that log data is present inside a message key instead of the default msg key that Pino uses. Use a technique similar to the one below to retain log levels in Google Cloud Logging

```javascript
const pino = require('pino');

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const PinoLevelToSeverityLookup = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

const defaultPinoConf = {
  messageKey: 'message',
  formatters: {
    level(label, number) {
      return {
        severity: PinoLevelToSeverityLookup[label] || PinoLevelToSeverityLookup['info'],
        level: number,
      };
    },
  },
};

module.exports = function createLogger(options) {
  return pino(Object.assign({}, options, defaultPinoConf));
};
```
