export class OverrideDefaultFunctionUtil {
  public static consoleLog = () => {
    if (process.env.NODE_ENV !== 'local') {
      console.log = () => {}
      return
    }
    const originalConsoleLog = console.log
    // Override console.log with a custom implementation
    // use rest parameters to get all the arguments passed to console.log
    console.log = function (...params) {
      // Add a new line character at the start of the arguments array
      params.unshift('\n')
      // Call the original console.log function with the modified arguments
      originalConsoleLog.apply(console, params)
    }
  }
}
