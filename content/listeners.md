---
id: listeners

slug: listeners

title: Listeners

description: Listeners are used to listen to events emitted by Discord. They are used to listen to events like `messageCreate`, `interactionCreate`, `guildMemberAdd`, etc.

sidebar_position: 3
---

Necord supports interacting with all [discord events](https://discord.js.org/#/docs/main/stable/class/Client#Events) via the `@On`
and `@Once` decorator.  
While the best practice is to use the more specific decorators when possible, this is useful if you wish to use features Necord doesn't
support via custom decorators, to interact with the raw requests, or to listen to all events using a decorator such as `interactionCreate`.

```typescript title="app.service.ts"
import {Injectable, Logger} from '@nestjs/common';
import {Once, On, Context, ContextOf} from 'necord';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    @Once('ready')
    public onReady(@Context() [client]: ContextOf<'ready'>) {
        this.logger.log(`Bot logged in as ${client.user.username}`);
    }

    @On('warn')
    public onWarn(@Context() [message]: ContextOf<'warn'>) {
        this.logger.warn(message);
    }
}
```

:::caution Warning

If you use global filters, guards or interceptors, they will be triggered once per event!  
This means if you are replying to the message in guards, you can run into issues with duplicated responses or invalid interactions.
Have a look at the `NecordExecutionContext.getInfo()` metadata to learn more about the current context.

:::

## Context

You might have noticed the `@Context` decorator in the last snippet: This is used to inject the event context within the method.
As there are many type of events, its type must be inferred from the `ContextOf<type: string>` type.

You can access the context variables by using the `@Context()` decorator within your function, which will populate the variable with an
array of arguments.

```typescript title="app.service.ts"
@On('messageCreate')
public onMessageCreate(@Context() [message]: ContextOf<'messageCreate'>) {
    console.log(message.content);
}
```
