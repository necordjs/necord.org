---
id: slash-commands

title: Slash Commands

sidebar_position: 1
---

**Slash Commands** are the new, exciting way to build and interact with bots on **Discord**. With Slash Commands, all you have to do is
type `/` and you're ready to use your favorite bot. You can easily see all the commands a bot has, and validation and error handling help
you get the command right the first time.

![Slash Commands](https://miro.medium.com/max/700/0*Q5CzShKq5zm3kzcv.png "Slash Commands")

## Global Commands

:::tip

Global commands are cached for one hour. New global commands will fan out slowly across all guilds and will only be guaranteed to be updated
after an hour. Guild commands update instantly. As such, we recommend you use guild-based commands during development and publish them to
global commands when they're ready for public use.

[Read more about dev-mode configuration](https://github.com/necordjs/necord/wiki/Overview#module-configuration)
:::

Create `app.commands.ts` file and add method with `SlashCommand` decorator.

```typescript title="app-commands.service.ts"
import { Injectable } from "@nestjs/common";
import { Context, SlashCommand, SlashCommandContext } from "necord";

@Injectable()
export class AppCommands {
    @SlashCommand({
        name: "ping",
        description: "Ping-Pong Command",
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: "Pong!" });
    }
}
```

## Guild Commands

If you want to have guild specific commands, use the `guilds` property on the `SlashCommand` decorator

```typescript title="app-commands.service.ts"
import { Injectable } from "@nestjs/common";
import { Context, SlashCommand, SlashCommandContext } from "necord";

@Injectable()
export class AppCommands {
    @SlashCommand({
        name: "ping",
        description: "Ping-Pong Command",
        guilds: [process.env.DEV_GUILD],
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: "Pong!" });
    }
}
```

> You can use decorator on both method and class.

## Options

Use the option decorator to define a parameter in a slash command, let's create the `LengthDto` class:

```typescript title="length.dto.ts"
import { StringOption } from "necord";

export class LengthDto {
    @StringOption({
        name: "text",
        description: "Your text",
        required: true,
    })
    text: string;
}
```

It has only one basic properties. Thereafter we can use the newly created DTO inside the `AppCommands`:

```typescript title="app-commands.service.ts"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, Options, SlashCommandContext } from 'necord';
import { LengthDto } from './dtos/length.dto';

@Injectable()
export class AppCommands {
...

    @SlashCommand({
        name: "length",
        description: "Get length of text"
    })
    public async onLength(@Context() [interaction]: SlashCommandContext, @Options() { text }: LengthDto) {
        return interaction.reply({content: `Length of your text ${text.length}`});
    }
}
```

List of all built-in option decorators:

| Decorator         | Return                         |
| ----------------- | ------------------------------ |
| StringOption      | `string`                       |
| NumberOption      | `number`                       |
| IntegerOption     | `number`                       |
| BooleanOption     | `boolean`                      |
| UserOption        | `User`                         |
| MemberOption      | `GuildMember`                  |
| ChannelOption     | `Channel`                      |
| RoleOption        | `Role`                         |
| MentionableOption | `GuildMember`, `User`, `Role ` |
| AttachmentOption  | `Attachment`                   |

## Autocomplete

TODO

## Groups

> **💡 TIP**
>
> For those developers looking to make more organized and complex groups of commands, look no further than subgroups and groups.

Use `SlashGroup` decorators on class-level `(Group)` and method-level `(SubGroup)`:

```typescript title="utils-commands.service.ts"
import {createCommandGroupDecorator, Subcommand} from 'necord';

export const UtilsCommandDecorator = createCommandGroupDecorator({
    name: 'utils',
    description: 'Utils group',
});

@UtilsCommandDecorator()
export class UtilsCommands {
    @Subcommand({
        name: 'ping',
        description: 'Ping-pong command'
    })
    public async onPing(...) {
    ...
    }
}

@UtilsCommandDecorator({
    name: "string",
    descriptionn: "String utility commands"
})
export class UtilsStringCommands {
    @Subcommand({
        name: 'length',
        description: 'String length command'
    })
    public async onLength(...) {
    ...
    }
}


```

After the registration commands, the bot will process `/utils ping` and `/utils string length` commands, like here:

![Commands](https://i.imgur.com/SmljfJH.png)

## Permissions (WIP)

Use [Nest Guards](https://docs.nestjs.com/guards) until its done

Slash commands have their own permissions system, which allows you to control who has access to use which commands. Unlike the slash
commands permission setting within the Discord client, you can fine-tune access to commands without preventing the selected user or role
from using all commands.
