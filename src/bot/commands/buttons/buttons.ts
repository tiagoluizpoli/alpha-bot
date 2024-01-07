import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const button = new ButtonBuilder({
  customId: 'join-button',
  label: 'Join draw',
  style: ButtonStyle.Primary,
});

export const joinRow = new ActionRowBuilder<ButtonBuilder>({ components: [button] });
