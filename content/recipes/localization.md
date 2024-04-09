---
id: localization

title: Localization

sidebar_position: 2
---

`@necord/localization` is a lightweight localization module for [Necord](https://necord.org/). It allows you to easily localize your bot's commands and messages. The module provides a simple API for managing locales and translations, as well as a powerful localization adapter system.

## Installation

```bash npm2yarn
npm i @necord/localization necord discord.js
```

## Usage

Once the installation process is complete, we can import the `NecordLocalizationModule` with your `NecordModule` into the root `AppModule`:

```typescript
import { NecordModule } from 'necord';
import { Module } from '@nestjs/common';
import { NecordLocalizationModule, DefaultLocalizationAdapter, UserResolver } from '@necord/localization';
import { AppService } from './app.service';

@Module({
    imports: [
        NecordModule.forRoot({
            token: process.env.DISCORD_TOKEN,
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.DirectMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent
            ],
            prefix: '!',
            development: [process.env.DISCORD_TEST_GUILD]
        }),
        NecordLocalizationModule.forRoot({
            resolvers: UserResolver,
            // Also you can provide class for support injection by @Inject
            adapter: new DefaultLocalizationAdapter({
                fallbackLocale: 'en-US',
                locales: {
                    'en-US': {
                        'commands.ping.name': 'ping',
                        'commands.ping.description': 'Pong!'
                    },
                    ru: {
                        'commands.ping.name': 'пинг',
                        'commands.ping.description': 'Понг!'
                    }
                }
            })
        })
    ],
    providers
})
export class AppModule {
}
```

`UserResolver` gets the location for translation from `interaction.locale` and `GuildResolver` gets it from `interaction.guildLocation`. Also, you can create your own Resolver. Just implement the `LocaleResolver` interface:

```typescript
import { CommandContext, LocaleResolver } from '@necord/localization';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { NecordExecutionContext } from 'necord';

@Injectable()
export class GuildResolver implements LocaleResolver {
 resolve(context: ExecutionContext): string | string[] | undefined {
  const necordContext = NecordExecutionContext.create(context);
  const [interaction] = necordContext.getContext<CommandContext>();

  return interaction.guildLocale;
 }
}
```

`DefaultLocalizationAdapter` can translate your localization strings and placeholders (e.g `{{username}}`)
Also, you can create your own localization adapter. Just implement the `BaseLocalizationAdapter` interface:

```typescript
import { BaseLocalizationAdapter } from '@necord/localization';

interface CustomLocalizationOptions {
    fallbackLocale: string;
    locales: Record<string, Record<string, string>>;
}

export class CustomLocalizationAdapter extends BaseLocalizationAdapter<CustomLocalizationOptions> {
    public getTranslation(key: string, locale: string, ...args: any[]): string {
        return `${key} by ${locale}`;
    }
}
```

Then, we can inject the `LOCALIZATION_ADAPTER` into our service and use it to localize our commands and messages:

```typescript
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DefaultLocalizationAdapter, localizationMapByKey, LOCALIZATION_ADAPTER } from '@necord/localization';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(
        @Inject(LOCALIZATION_ADAPTER)
        private readonly localizationAdapter: DefaultLocalizationAdapter
    ) {
    }
    @SlashCommand({ 
      name: 'ping', 
      description: 'Pong!', 
      nameLocalizations: localizationMapByKey('commands.ping.name'), 
      descriptionLocalizations: localizationMapByKey('commands.ping.name') 
    })
    public ping(@Context() [interaction]: SlashCommandContext) {
        const message = this.localizationAdapter.getTranslation(
            'commands.ping.description',
            interaction.locale
        );
        return interaction.reply(message);
    }
}
```

Or you can use `@CurrentTranslate` decorator to get the current translation from context:

```typescript
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DefaultLocalizationAdapter, CurrentTranslate, localizationMapByKey, TranslationFn } from '@necord/localization';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class AppService implements OnModuleInit {
    @SlashCommand({ 
      name: 'ping', 
      description: 'Pong!', 
      nameLocalizations: localizationMapByKey('commands.ping.name'), 
      descriptionLocalizations: localizationMapByKey('commands.ping.name') 
    })
    public ping(
        @Context() [interaction]: SlashCommandContext,
        @CurrentTranslate() t: TranslationFn
    ) {
        const message = t('commands.ping.description');
        return interaction.reply(message);
    }
}
```

Function `localizationMapByKey` are used to localize the command name and description. You pass the translation key or localization map as an argument to the function.
Also you can set what locales the command will be localized

```typescript
@SlashCommand({ 
      name: 'ping', 
      description: 'Pong!', 
      nameLocalizations: localizationMapByKey('commands.ping.name', ['en', 'ru']), 
      descriptionLocalizations: localizationMapByKey('commands.ping.name', ['en', 'ru']) 
    })
```

Or just pass a localization object with the location id and translation key to the `nameLocalization` and `descriptionLocalizations` properties

```typescript
@SlashCommand({ 
  name: 'ping', 
  description: 'Pong!', 
  nameLocalizations: {
    en: 'command.ping.name',
    ru: 'command.ping.name'
  }, 
  descriptionLocalizations: {
    en: 'command.ping.description',
    ru: 'command.ping.description'
  }
})
```

Congratulations! You have successfully created your first localized command with Necord!
