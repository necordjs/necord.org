export const IntroduceCodeData = [
	{
		name: 'app.updates.ts',
		content: `import { Injectable, Logger } from '@nestjs/common';
import { Once, On, Context, ContextOf } from 'necord';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    @Once('ready')
    public onReady(@Context() [client]: ContextOf<'ready'>) {
        this.logger.log(\`Bot logged in as \${client.user.username}\`);
    }
}`
	},
	{
		name: 'app.commands.ts',
		content: `import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class AppCommands {
    @SlashCommand({ name: 'ping', description: 'Ping the bot' })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: 'Pong!' });
    }
}`
	}
];
