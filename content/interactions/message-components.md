---
id: message-components

title: Message Components

sidebar_position: 3
---

**Message components** — we'll call them "components" moving forward—are a framework for adding interactive elements to the messages your app or bot sends. They're accessible, customizable, and easy to use.

There are several different types of components; this documentation will outline the basics of this new framework and each example.

## Button

**Buttons** are interactive components that render on messages. They can be clicked by users, and send an [interaction](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object) to your app when clicked.

<img src="/img/content/button.png" alt="Buttons" width="500" />

```typescript title="discord.service.ts"
import { Injectable } from '@nestjs/common';
import { Context, Button, ButtonContext } from 'necord';

@Injectable()
export class DiscordService {
    @Button('BUTTON')
    public onButton(@Context() [interaction]: ButtonContext) {
        return interaction.reply({ content: 'Button clicked!' });
    }
}
```

### Dynamic Button
You can create buttons with dynamic `id` field. This is useful for passing metadata to buttons.

Dynamic buttons uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) format to perform regexp matching. Turn a path string such as `user/:name` into a regular expression.

To create a Dynamic button
```typescript
new ButtonBuilder()
  .setCustomId('click/12345')
  .setLabel('LABEL')
  .setStyle(ButtonStyle.Primary)
```

To receive a Dynamic button
```typescript
import { Injectable } from '@nestjs/common';
import { Context, Button, ButtonContext } from 'necord';

@Injectable()
export class DiscordService {
  @Button('click/:value')
  public onButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') value: string
  ) {
    return interaction.reply({ content: `Button clicked! Value: ${value}` });
  }
}

```

## Select Menu

**Select menus** are another interactive component that renders on messages. On desktop, clicking on a select menu opens a dropdown-style UI; on mobile, tapping a select menu opens up a half-sheet with the options.

<img src="/img/content/select-menu.png" alt="Select Menu" width="500" />

```typescript title="discord.service.ts"
import { Injectable } from '@nestjs/common';
import { Context, SelectMenu, SelectMenuContext, Values } from 'necord';

@Injectable()
export class DiscordService {
    @SelectMenu('SELECT_MENU')
    public onSelectMenu(@Context() [interaction]: SelectMenuContext, @Values() values: string[]) {
        return interaction.reply({ content: `Your selected color - ${values.join(' ')}` });
    }
}
```
