import serverlessExpress from '@codegenie/serverless-express'
import {NestFactory} from '@nestjs/core'
import {Callback,Context,Handler} from 'aws-lambda'
import * as dotenv from 'dotenv'
import {AppModule} from './app.module'
import {NestjsLoggerService} from './common/services/logger.service'


let server: Handler

async function bootstrap() {
    dotenv.config({path: '.env.development'})
    const app=await NestFactory.create(AppModule,{
        bufferLogs: true,
    })
    app.useLogger(app.get(NestjsLoggerService))

    // const globalPrefix = 'api/v1'
    // app.setGlobalPrefix(globalPrefix)


    //   await app.listen(process.env.PORT ?? 3000);
    await app.init()

    const expressApp=app.getHttpAdapter().getInstance()
    return serverlessExpress({app: expressApp})
}

export const handler: Handler=async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    server=server??(await bootstrap())
    return server(event,context,callback)
}

// bootstrap()
