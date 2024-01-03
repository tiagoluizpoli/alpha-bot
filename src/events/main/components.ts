import { Event } from '../../structs/types/event';

import { client } from '@/src';

export default new Event({
  name: 'interactionCreate',
  run: (interaction) => {
    if (interaction.isModalSubmit()) client.modals.get(interaction.customId)?.(interaction);
    if (interaction.isButton()) client.buttons.get(interaction.customId)?.(interaction);
    if (interaction.isStringSelectMenu()) client.selects.get(interaction.customId)?.(interaction);
  },
});
