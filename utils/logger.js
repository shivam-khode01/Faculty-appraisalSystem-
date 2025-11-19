/**
 * Logger utility for consistent logging across the application
 */

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const logger = {
  info: (...args) => {
    console.log(`${colors.cyan}[INFO]${colors.reset}`, ...args);
  },
  
  success: (...args) => {
    console.log(`${colors.green}[SUCCESS]${colors.reset}`, ...args);
  },
  
  warn: (...args) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset}`, ...args);
  },
  
  error: (...args) => {
    console.error(`${colors.red}[ERROR]${colors.reset}`, ...args);
  },
  
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.magenta}[DEBUG]${colors.reset}`, ...args);
    }
  }
};

module.exports = logger;
