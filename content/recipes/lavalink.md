---
id: lavalink

title: Lavalink

sidebar_position: 3
---

Transform your bot into a professional DJ with the power of the [Lavalink](https://lavalink.dev/) ecosystem. This package uses [lavalink-client](https://github.com/Tomato6966/lavalink-client) behind the scenes, providing a high-performance and efficient solution for managing audio streams on Discord. By leveraging Lavalink, your bot gains the ability to manage audio playback, queues, and real-time controls with minimal latency, transforming it into a fully capable and professional music system.

## Installation

```bash npm2yarn
npm i @necord/lavalink necord discord.js lavalink-client
```

- [Lavalink Intallation Guide](https://lavalink.dev/getting-started/index.html)

## Usage

Once the installation process is complete, we can import the `NecordLavalinkModule` with your `NecordModule` into the root `AppModule`:

```typescript title="app.module.ts"
import { NecordLavalinkModule } from '@necord/lavalink';
import { Module } from '@nestjs/common';
import { Client } from 'discord.js';
import { AppService } from './app.service';

@Module({
    imports: [
        NecordModule.forRoot({
            token: process.env.DISCORD_TOKEN,
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildVoiceStates
            ],
        }),
        NecordLavalinkModule.forRoot({
            // At least 1 node is required
            nodes: [
                {
                    authorization: 'youshallnotpass',
                    host: 'localhost',
                    port: 2333,
                }
            ]
        })
    ],
    providers: [AppService]
})
export class AppModule {}
```

Checkout more Module options in the official [**lavalink-client** Documentation](https://lc4.gitbook.io/lavalink-client/docs/lavalinkmanager/manager-options).

## Listeners

In `@necord/lavalink` events handling works same as the [default Necord listeners](https://necord.org/listeners) with some changes.

- Instead of default `On`/`Once` decorators and `ContextOf` you can use
    - `OnLavalinkManager`/`OnceLavalinkManager` and `LavalinkManagerContextOf` for [LavalinkManager Events](#lavalinkmanager-events).
    - `OnNodeManager`/`OnceNodeManager` and `NodeManagerContextOf` for [NodeManager Events](#nodemanager-events).

```typescript title="app.service.ts"
import { Injectable, Logger } from '@nestjs/common';
import { Context } from 'necord';
import { OnLavalinkManager, OnNodeManager, LavalinkManagerContextOf, NodeManagerContextOf } from '@necord/lavalink';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    @OnNodeManager('connect')
    public onReady(@Context() [node]: NodeManagerContextOf<'connect'>) {
        this.logger.log(`Node: ${node.options.id} Connected`);
    }

    @OnLavalinkManager('playerCreate')
    public onPlayerCreate(@Context() [player]: LavalinkManagerContextOf<'playerCreate'>) {
        this.logger.log(`Player created at ${player.guildId}`);
    }
}
```

### LavalinkManager Events

- View in Official [**lavalink-client** Documentation](https://lc4.gitbook.io/lavalink-client/docs/lavalinkmanager#event-listeners).

| Event Name                | Description                                                |
|---------------------------|------------------------------------------------------------|
| `trackStart`              | Emitted whenever a Track plays.                            |
| `trackEnd`                | Emitted whenever a track finished playing.                 |
| `trackStuck`              | Emitted whenever a Track got stuck while playing.          |
| `trackError`              | Emitted whenever a Track errored.                          |
| `queueEnd`                | Emitted when the track Ended, but there are no more tracks in the queue. (`trackEnd`, does NOT get executed) |
| `playerCreate`            | Emitted whenever a Player gets created.                    |
| `playerMove`              | Emitted whenever a Player gets moved between Voice Channels. |
| `playerDisconnect`        | Emitted whenever a player is disconnected from a channel.  |
| `playerSocketClose`       | Emitted whenever a Node-Socket got closed for a specific Player. |
| `playerDestroy`           | Emitted whenever a Player got destroyed                    |
| `playerUpdate`            | Emitted whenever a Player gets an update from Lavalink's playerUpdate Event. |
| `debug`                   | Emitted for several erros, and logs within lavalink-client, if `managerOptions.advancedOptions.enableDebugEvents` is `true`                            |

#### SponsorBlock Plugin Events

- This Events is a part of [LavalinkManager Events](#lavalinkmanager-events).
- This requires the [**SponsorBlock Plugin**](https://github.com/topi314/Sponsorblock-Plugin) added in Lavalink Server.

| Event Name                | Description                                                |
|---------------------------|------------------------------------------------------------|
| `SegmentsLoaded`          | Emitted whenever Segments are loaded.                      |
| `SegmentSkipped`          | Emitted whenever a specific Segment was skipped.           |
| `ChapterStarted`          | Emitted whenever a specific Chapter starts playing.        |
| `ChaptersLoaded`          | Emitted whenever Chapters are loaded.                      |

#### LavaLyrics Plugin Events

- This Events is a part of [LavalinkManager Events](#lavalinkmanager-events).
- This requires the [**LavaLyrics Plugin**](https://github.com/topi314/LavaLyrics) added in Lavalink Server.

| Event Name                | Description                                                |
|---------------------------|------------------------------------------------------------|
| `LyricsLine`              | Emitted whenever a Lyrics line is received.                |
| `LyricsFound`             | Emitted whenever a Lyrics is found.                        |
| `LyricsNotFound`          | Emitted whenever a Lyrics is not found.                    |

### NodeManager Events

- View in Official [**lavalink-client** Documentation](https://lc4.gitbook.io/lavalink-client/docs/nodemanager#event-listeners).

| Event Name                | Description                                                |
|---------------------------|------------------------------------------------------------|
| `create`                  | Emitted whenever a Node is created.                        |
| `destroy`                 | Emitted whenever a Node is destroyed.                      |
| `connect`                 | Emitted whenever a Node is connected.                      |
| `reconnecting`            | Emitted whenever a Node is reconnecting.                   |
| `reconnectinprogress`     | Emitted whenever a node starts to reconnect. (if you have a reconnection delay, the reconnecting event will be emitted after the `retryDelay`.) Useful to check wether the internal node reconnect system works or not. |
| `disconnect`              | Emitted whenever a Node is disconnects.                    |
| `error`                   | Emitted whenever a Node is error.                          |
| `raw`                     |  Emits every single Node event.                            |

## Providers

- `@necord/lavalink` have snippets to access the lavalink-client methods. You can inject the managers using constructor.

```typescript title="app.service.ts"
import { Injectable } from '@nestjs/common';
import { LavalinkManager, NodeManager } from 'lavalink-client';

@Injectable()
export class AppService {
    public constructor(
        private readonly lavalinkManager: LavalinkManager,
        private readonly nodeManager: NodeManager,
    ) {}
}
```

| Class (Type to be injected) | Manager Property (Will access to) | Description            |
|-----------------------------|-----------------------------------|------------------------|
| `LavalinkManager`           | `lavalinkManager`                 | Lavalink Manager       |
| `NodeManager`               | `lavalinkManager.nodeManager`     | Node Manager           |

## Play Tracks

- Here you'll view a sample of PlayCommand using the best techniques of [Slash Commands](https://necord.org/interactions/slash-commands) tutorial.
- View in Official [**lavalink-client** Documentation](https://lc4.gitbook.io/lavalink-client/basics/getting-started#play-songs).

```typescript title="app.commands.ts"
import { Injectable, UseInterceptors } from '@nestjs/common';
import { GuildMember } from 'discord.js';
import { LavalinkManager } from 'lavalink-client';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { QueryDto } from './query.dto';
import { SourceAutocompleteInterceptor } from 'source.autocomplete';

@Injectable()
export class AppCommands {
    public constructor(private readonly lavalinkManager: LavalinkManager) {}

    @UseInterceptors(SourceAutocompleteInterceptor)
    @SlashCommand({
        name: 'play',
        description: 'play a track',
    })
    public async onPlay(
        @Context() [interaction]: SlashCommandContext,
        @Options() { query, source }: QueryDto,
    ) {
        const player =
            this.lavalinkManager.players.get(interaction.guild.id) ??
            this.lavalinkManager.createPlayer({
                guildId: interaction.guild.id,
                voiceChannelId: (interaction.member as GuildMember).voice.channel.id,
                textChannelId: interaction.channel.id,
                // optional configurations:
                selfDeaf: true,
                selfMute: false,
                volume: 100,
            });

        await player.connect();

        const res = await player.search(
            {
                query,
                source: source ?? 'soundcloud'
            },
            interaction.user.id,
        );

        await player.queue.add(res.tracks[0]);
        if (!player.playing) await player.play();

        // It's extremely recommended to use `trackStart` event for this announcement
        return interaction.reply({
            content: `Now playing ${res.tracks[0].info.title}`,
        });
    }
}
```

```typescript title="query.dto.ts"
import { SearchPlatform } from 'lavalink-client';
import { StringOption } from 'necord';

export class QueryDto {
    @StringOption({
        name: 'query',
        description: '<name | url> of the requested track'
        required: true
    })
    public readonly query!: string;

    @StringOption({
        name: 'source',
        description: 'source of the track',
        autocomplete: true,
        required: false,
    })
    public readonly source?: SourcePlatform;
}
```

```typescript title="source.autocomplete.ts"
import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { DefaultSources } from 'lavalink-client';
import { AutocompleteInterceptor } from 'necord';

@Injectable()
export class SourceAutocompleteInterceptor extends AutocompleteInterceptor {
    public transformOptions(interaction: AutocompleteInteraction) {
        const focused = interaction.options.getFocused(true);
        let choices: string[];

        if (focused.name === 'source') {
            choices = [DefaultSources.soundcloud] // Note that some Sources needs extra plugins/configuration to property work
        }

        return interaction.respond(
        choices
            .filter((choice) => choice.startsWith(focused.value.toString()))
            .map((choice) => ({ name: choice, value: choice })),
        );
    }
}
```

You can view a working example [here](https://github.com/necordjs/examples/tree/master/08-lavalink).
