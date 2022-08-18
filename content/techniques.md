---
id: techniques

slug: /techniques

title: Techniques

sidebar_position: 4
---

## Async configuration

When you need to pass module options asynchronously instead of statically, use the `.forRootAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript title="src/app.module.ts"
import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';

@Module({
    imports: [
        NecordModule.forRootAsync({
            useFactory: () => ({
                token: 'DISCORD_BOT_TOKEN',
                intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
            }),
        }),
    ],
})
export class AppModule {}
```

Like other [factory providers](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory), our factory function can be async and can inject dependencies through inject.

```typescript title="src/app.module.ts"
import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';

@Module({
    imports: [
        NecordModule.forRootAsync({
            imports: [ConfigModule.forFeature(necordModuleConfig)],
            useFactory: async (configService: ConfigService) => ({
                token: configService.get<string>('DISCORD_BOT_TOKEN'),
                intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
```

Alternatively, you can configure the NecordModule using a class instead of a factory, as shown below:

```typescript title="src/app.module.ts"
import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';

@Module({
    imports: [
        NecordModule.forRootAsync({
            useClass: NecordConfigService,
        }),
    ],
})
export class AppModule {}
```

The construction above instantiates `NecordConfigService` inside `NecordModule`, using it to create the required options object. Note that in this example, the `NecordConfigService` has to implement the `NecordOptionsFactory` interface, as shown below. The `NecordModule` will call the `.createNecordOptions()` method on the instantiated object of the supplied class.

```typescript title="src/discord-config.service.ts"
import { Injectable } from '@nestjs/common';
import { NecordOptionsFactory, NecordModuleOptions } from 'necord';
import { GatewayIntentBits } from 'discord.js';

@Injectable()
class NecordConfigService implements NecordOptionsFactory {
    createNecordOptions(): NecordModuleOptions {
        return {
            token: 'DISCORD_BOT_TOKEN',
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
        };
    }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `NecordModule`, use the `useExisting` syntax.

## Standalone applications

If you initialized your application with the Nest CLI, Express framework will be installed by default along with Nest. Nest and Necord does not require Express for work. So if you you don't need a web server, you can remove Express.

To do this, change the bootstrap function in the `main.ts` file of your project on something like that:

```typescript title="src/main.ts"
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
}

bootstrap();
```

This initializes Nest as a **standalone application** (without any network listeners).

All that remains is to remove unused dependencies:

```bash
npm un @nestjs/platform-express @types/express
```

## Validation (WIP)

## Debugging (WIP)

## ContextOf (WIP)

## Application Registry (WIP)
