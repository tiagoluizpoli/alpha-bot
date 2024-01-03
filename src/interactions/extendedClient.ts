import path from 'path';
import fs from 'fs';

import {
  ApplicationCommandDataResolvable,
  BitFieldResolvable,
  Client,
  ClientEvents,
  Collection,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from 'discord.js';

import { env } from '../main/config/env';

import { EventType } from './components/event';

import {
  CommandType,
  ComponentsButton,
  ComponentsModal,
  ComponentsSelect,
} from '@/interactions/components';

const fileCondition = (fileName: string): boolean =>
  fileName.endsWith('.ts') || fileName.endsWith('.js');
export class ExtendedClient extends Client {
  public commands = new Collection<string, CommandType>();
  public buttons: ComponentsButton = new Collection();
  public selects: ComponentsSelect = new Collection();
  public modals: ComponentsModal = new Collection();

  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
    });
  }

  public start = async (): Promise<void> => {
    this.registerModules();
    this.registerEvents();
    await this.login(env.botToken);
  };

  private readonly registerCommands = async (
    commands: ApplicationCommandDataResolvable[],
  ): Promise<void> => {
    await this.application?.commands
      .set(commands)
      .then(() => {
        console.info('✅ Slash commands (/) defined'.green);
      })
      .catch((error) => {
        console.error(
          `❌ An error occurred while trying to set the slash commmands (/): \n ${error}`.red,
        );
      });
  };

  private readonly registerModules = (): void => {
    const slashCommands: ApplicationCommandDataResolvable[] = [];

    const commandsPath = path.join(__dirname, 'commands');

    fs.readdirSync(commandsPath).forEach((local) => {
      fs.readdirSync(commandsPath + `/${local}/`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const command: CommandType = (await import(`./commands/${local}/${fileName}`))?.default;
          const { name, buttons, selects, modals } = command;
          if (name) {
            this.commands.set(name, command);
            slashCommands.push(command);

            if (buttons) {
              buttons.forEach((run, key) => this.buttons.set(key, run));
            }

            if (selects) {
              selects.forEach((run, key) => this.selects.set(key, run));
            }

            if (modals) {
              modals.forEach((run, key) => this.modals.set(key, run));
            }
          }
        });
    });

    this.on('ready', async () => {
      await this.registerCommands(slashCommands);
    });
  };

  private readonly registerEvents = (): void => {
    const eventsPath = path.join(__dirname, 'events');

    fs.readdirSync(eventsPath).forEach((local) => {
      fs.readdirSync(`${eventsPath}/${local}`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const { name, once, run }: EventType<keyof ClientEvents> = (
            await import(`./events/${local}/${fileName}`)
          )?.default;

          try {
            if (name) once ? this.once(name, run) : this.on(name, run);
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.info(`An error occurred on event: ${name} \n${error}`.red);
          }
        });
    });
  };
}
