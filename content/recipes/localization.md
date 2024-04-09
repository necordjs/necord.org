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
import { DefaultLocalizationAdapter, DescriptionTranslations, LOCALIZATION_ADAPTER, NameTranslations } from '@necord/localization';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(
        @Inject(LOCALIZATION_ADAPTER)
        private readonly localizationAdapter: DefaultLocalizationAdapter
    ) {
    }

    @NameTranslations('commands.ping.name')
    @DescriptionTranslations('commands.ping.description')
    @SlashCommand({ name: 'ping', description: 'Pong!' })
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
import { DefaultLocalizationAdapter, DescriptionTranslations, CurrentTranslate, TranslationFn, NameTranslations } from '@necord/localization';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class AppService implements OnModuleInit {
    @NameTranslations('commands.ping.name')
    @DescriptionTranslations('commands.ping.description')
    @SlashCommand({ name: 'ping', description: 'Pong!' })
    public ping(
        @Context() [interaction]: SlashCommandContext,
        @CurrentTranslate() t: TranslationFn
    ) {
        const message = t('commands.ping.description');
        return interaction.reply(message);
    }
}
```

Decorators `NameTranslations` and `DescriptionTranslations` are used to localize the command name and description. You pass the translation key or localization map as an argument to the decorator.

Congratulations! You have successfully created your first localized command with Necord!