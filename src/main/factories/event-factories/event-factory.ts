import { ClientEvents } from 'discord.js';

import {
  ComponentEventBuilder,
  EventType,
  ExtendedClient,
  ReadyEventBuilder,
  SlashEventBuilder,
} from '@/bot/core';

export const makeEvents = (client: ExtendedClient): Array<EventType<keyof ClientEvents>> => {
  const componenentEvent = new ComponentEventBuilder(client);
  const readyEvent = new ReadyEventBuilder();
  const slashEvent = new SlashEventBuilder(client);
  return [componenentEvent.build(), readyEvent.build(), slashEvent.build()];
};
