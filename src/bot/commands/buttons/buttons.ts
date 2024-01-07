import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const joinButton = new ButtonBuilder({
  customId: 'join-button',
  label: 'Join draw',
  style: ButtonStyle.Primary,
});

export const leaveButton = new ButtonBuilder({
  customId: 'leave-button',
  label: 'Leave draw',
  style: ButtonStyle.Danger,
});
