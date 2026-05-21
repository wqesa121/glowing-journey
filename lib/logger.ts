/**
 * Structured logging system for the application
 * Supports different log levels and formats
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: {
    message: string;
    stack?: string;
    name?: string;
  };
}

/**
 * Format log entry for console output
 */
function formatLogEntry(entry: LogEntry): string {
  const timestamp = entry.timestamp;
  const level = entry.level.toUpperCase().padEnd(5);
  const message = entry.message;
  
  let output = `[${timestamp}] ${level} ${message}`;
  
  if (entry.context && Object.keys(entry.context).length > 0) {
    output += ` ${JSON.stringify(entry.context)}`;
  }
  
  if (entry.error) {
    output += `\n  Error: ${entry.error.message}`;
    if (entry.error.stack && process.env.NODE_ENV === 'development') {
      output += `\n  ${entry.error.stack}`;
    }
  }
  
  return output;
}

/**
 * Get console color for log level
 */
function getColorCode(level: LogLevel): string {
  switch (level) {
    case 'debug':
      return '\x1b[36m'; // Cyan
    case 'info':
      return '\x1b[32m'; // Green
    case 'warn':
      return '\x1b[33m'; // Yellow
    case 'error':
      return '\x1b[31m'; // Red
  }
}

const RESET = '\x1b[0m';

/**
 * Logger class for structured logging
 */
export class Logger {
  private name: string;
  private minLevel: LogLevel = 'info';

  constructor(name: string) {
    this.name = name;
    
    // Set min level from env
    const envLevel = process.env.LOG_LEVEL as LogLevel;
    if (envLevel) {
      this.minLevel = envLevel;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private formatContext(context?: Record<string, any>): Record<string, any> {
    return {
      logger: this.name,
      ...context
    };
  }

  private output(entry: LogEntry): void {
    // Don't log in test environment unless explicitly enabled
    if (process.env.NODE_ENV === 'test' && process.env.ENABLE_LOGS !== 'true') {
      return;
    }

    const formatted = formatLogEntry(entry);
    const colored = `${getColorCode(entry.level)}${formatted}${RESET}`;

    if (entry.level === 'error') {
      console.error(colored);
    } else if (entry.level === 'warn') {
      console.warn(colored);
    } else {
      console.log(colored);
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog('debug')) return;
    
    this.output({
      timestamp: new Date().toISOString(),
      level: 'debug',
      message,
      context: this.formatContext(context)
    });
  }

  info(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog('info')) return;
    
    this.output({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context: this.formatContext(context)
    });
  }

  warn(message: string, context?: Record<string, any>): void {
    if (!this.shouldLog('warn')) return;
    
    this.output({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context: this.formatContext(context)
    });
  }

  error(message: string, error?: Error | unknown, context?: Record<string, any>): void {
    if (!this.shouldLog('error')) return;

    let errorData: { message: string; stack?: string; name?: string } | undefined;
    
    if (error instanceof Error) {
      errorData = {
        message: error.message,
        stack: error.stack,
        name: error.name
      };
    } else if (typeof error === 'string') {
      errorData = { message: error };
    } else if (error) {
      errorData = { message: String(error) };
    }

    this.output({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      context: this.formatContext(context),
      error: errorData
    });
  }
}

/**
 * Create logger instance
 */
export function createLogger(name: string): Logger {
  return new Logger(name);
}

// Global logger instance
export const logger = createLogger('APP');
