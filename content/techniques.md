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
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.DirectMessages
                ]
            })
        })
    ]
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
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.DirectMessages
                ]
            }),
            inject: [ConfigService]
        })
    ]
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
            useClass: NecordConfigService
        })
    ]
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
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages
            ]
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

## Bot Sharding

### What is sharding?
Discord prevents your bot application from logging in without sharding once you hit a scale of 2,500 guilds. If you are not planning to create a public bot application, then you can go ahead and ignore this section. However, if you are creating a public bot application, it would be wise to keep sharding in mind as it can increase the complexity of your application due to how a sharded process works.

:::caution
This guide takes the built-in `ShardingManager` from discordjs. You should refer to the discordjs documentation for anything sharding specific. The idea of this guide is to only show you an example of how you would go ahead and implement sharding for necord.
:::

### How to implement sharding

:::caution
If you are running the bot as part of a webserver within NestJS, then in order to implement sharding you must understand that initialising `necord` within your HTTP server process isn't going to be a viable option. So we're going to have to split the two into their own independent processes. This doesn't mean you can't share code between the two, just that they will be running on different processes. You could consider your "bot" application as a microservice of sorts.
:::

1. In your `src` directory, create a new `bot.ts` file, this will be used to instantiate the bot as a standalone application wth some slight differences. The `DiscordModule` cannot be imported within your `AppModule`. This is because we do not want any bot processes on unsharded processes, so if you need to share code between the two, you should import the necessary modules into your `DiscordModule` or alternatively, create a `SharedModule` which is imported both into your `AppModule` and `DiscordModule`.
```typescript
import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './discord/discord.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(DiscordModule);
}

bootstrap();
```
:::info
You may also need to add a `webpack.config.js` file to your root directory which exports the `bot.ts` file as it's not automatically exported with the application due to how the `bot.ts` file is used within another process which webpack is unable to detect. You can use the following snippet to achieve this:
```js
const Path = require('path');

module.exports = function (options) {
    return {
        ...options,
        entry: {
            main: options.entry,
            bot: Path.join(__dirname, 'src', 'bot.ts')
        },
        output: {
            filename: '[name].js'
        }
    };
};
```
:::

2. Modify your `main.ts` file to create a new `ShardingManager` instance which calls your `bot.js` file (not .ts extension), specifying a .ts extension will cause errors as this is executed only after your code has been transpiled into JavaScript. You can use the snippet below as an example:
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ShardingManager } from 'discord.js';
import * as Path from 'path';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = app.get(ConfigService);
  const port = 80; // config.get<string>('app.port');

  await app.listen(port);

  const manager = new ShardingManager(Path.join(__dirname, 'bot.js'), {
    token: 'secret', // config.get<string>('discord.bot.token')
  });

  manager.spawn();

  manager.on("shardCreate", shard => {
    shard.on('reconnecting', () => {
      console.log(`Reconnecting shard: [${shard.id}]`);
     });
    shard.on('spawn', () => {
      console.log(`Spawned shard: [${shard.id}]`);
    });
    shard.on('ready', () => {
      console.log(` Shard [${shard.id}] is ready`);
    });
    shard.on('death', () => {
      console.log(`Died shard: [${shard.id}]`);
    });
    shard.on('error', (err)=>{
      console.log(`Error in  [${shard.id}] with : ${err} `)
      shard.respawn()
    })
  });
}
bootstrap();
```

3. Now when you bootstrap your application, your `bot.ts` context is created on a sharded process.
:::tip
If you are running into further issues and require cross-hosting your bot application, then just swap the `ShardingManager` out for other sharding packages like the [discord-hybrid-sharding](https://github.com/meister03/discord-hybrid-sharding) which is required for the [discord-cross-hosting](https://github.com/meister03/discord-cross-hosting) package.
:::

## Validation (WIP)

## Debugging (WIP)

## ContextOf (WIP)

## Application Registry (WIP)