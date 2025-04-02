import {ConsoleLogger} from '@nestjs/common'

export class NestjsLoggerService extends ConsoleLogger {

    log(message: string, context?: any) {
        super.log(message, context);
    }

    error(message: string,context?: any) {
        super.error(message, context);
    }

    warn(message: string, context?: any) {
        super.warn(message, context);
    }

    debug(message: string, context?: any) {
        super.debug(message, context);
    }

    verbose(message: string, context?: any) {
        super.verbose(message, context);
    }
}