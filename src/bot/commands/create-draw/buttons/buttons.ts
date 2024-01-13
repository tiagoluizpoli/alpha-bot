import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

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

export const cancelDrawButton = new ButtonBuilder({
  customId: 'cancel-draw-button',
  label: 'Cancel draw',
  style: ButtonStyle.Danger,
});

export const drawTeamsButton = new ButtonBuilder({
  customId: 'draw-teams-button',
  label: 'Draw',
  style: ButtonStyle.Success,
});

export const buttonsRow = new ActionRowBuilder<ButtonBuilder>({
  components: [joinButton, leaveButton, cancelDrawButton],
});

export const drawRow = new ActionRowBuilder<ButtonBuilder>({
  components: [drawTeamsButton],
});
