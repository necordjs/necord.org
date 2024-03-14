---
id: client-providers

title: Client Providers

sidebar_position: 4
---

Necord have snippets to access the client and its properties in your application.
You can inject managers and utils of discord.js client using constructor.

```typescript title="app.service.ts"
import { Injectable } from '@nestjs/common';
import { Client, ClientApplication, ChannelManager, BaseGuildEmojiManager, GuildManager, ClientUser, UserManager, ShardClientUtil, ClientVoiceManager, WebSocketManager, REST } from 'discord.js';

@Injectable()
export class AppService {
    public constructor(
        private readonly client: Client,
        private readonly application: ClientApplication,
        private readonly channels: ChannelManager,
        private readonly emojis: BaseGuildEmojiManager,
        private readonly guilds: GuildManager,
        private readonly user: ClientUser,
        private readonly users: UserManager,
        private readonly shard: ShardClientUtil,
        private readonly voice: ClientVoiceManager,
        private readonly ws: WebSocketManager,
        private readonly rest: REST
    ) {}
}
```

| Class (Type to be Injected) | Client Property (Will access to) | Description        |
|-----------------------------|----------------------------------|--------------------|
| `Client`                    | `client`                         | Discord.js client  |
| `ClientApplication`         | `client.application`             | Application        |
| `ChannelManager`            | `client.channels`                | Channels of client |  
| `BaseGuildEmojiManager`     | `client.emojis`                  | Emojis of client   |  
| `GuildManager`              | `client.guilds`                  | Guilds of client   |
| `ClientUser`                | `client.user`                    | User of client     |  
| `UserManager`               | `client.users`                   | Users of client    |
| `ShardClientUtil`           | `client.shard`                   | Shards utilities   |
| `ClientVoiceManager`        | `client.voice`                   | Voice manager      |
| `WebSocketManager`          | `client.ws`                      | Websocket manager  |
| `REST`                      | `client.rest`                    | REST manager       |
