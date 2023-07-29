import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const logger = new Logger('MAIN')

// allow to register the swagger api
// through the document and as the api documentation
async function registerSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tooo Core API')
    .setDescription('The core api documentation')
    .addTag('core')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // register all deps and settings
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.use(compression())
  app.use(helmet())
  app.enableCors({ origin: '*' })

  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get<number>('port')

  await registerSwagger(app)

  await app.listen(port, () => {
    logger.log(`🏀 The application running on port ${port}`)
  })
}

bootstrap()
