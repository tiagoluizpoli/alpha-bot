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

import {
  CommandType,
  ComponentsButton,
  ComponentsModal,
  ComponentsSelect,
  EventType,
  ICommandBuilder,
} from './components';

import { IEventBuilder } from '@/bot';

export class ExtendedClient extends Client {
  public commands = new Collection<string, CommandType>();
  public buttons: ComponentsButton = new Collection();
  public selects: ComponentsSelect = new Collection();
  public modals: ComponentsModal = new Collection();

  public constructor(
    private readonly botToken: string,
    commands: ICommandBuilder[],
    events: IEventBuilder[],
  ) {
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
    this.registerModules(commands.map((cmd) => cmd.build()));
    this.registerEvents(events.map((event) => event.build(this)));
  }

  public start = async (): Promise<void> => {
    await this.login(this.botToken);
  };

  private readonly registerCommands = async (
    commands: ApplicationCommandDataResolvable[],
  ): Promise<void> => {
    try {
      await this.application?.commands.set(commands);
      console.info('✅ Slash commands (/) defined'.green);
    } catch (error) {
      console.error(
        `❌ An error occurred while trying to set the slash commmands (/): \n ${error as any}`.red,
      );
    }
  };

  private readonly registerModules = (commands: CommandType[]): void => {
    const slashCommands: ApplicationCommandDataResolvable[] = commands.map((command) => {
      const { name, buttons, selects, modals } = command;
      if (name) {
        this.commands.set(name, command);

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
      return command;
    });
    this.on('ready', async () => {
      await this.registerCommands(slashCommands);
    });
  };

  private readonly registerEvents = (events: Array<EventType<keyof ClientEvents>>): void => {
    events.forEach(async ({ name, run, once }) => {
      try {
        if (name) once ? this.once(name, run) : this.on(name, run);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.info(`An error occurred on event: ${name} \n${error}`.red);
      }
    });
  };
}
