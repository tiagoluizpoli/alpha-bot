import {
  ComponentEventBuilder,
  IEventBuilder,
  ReadyEventBuilder,
  SlashEventBuilder,
} from '@/bot/core';

export const makeEvents = (): IEventBuilder[] => {
  const componenentEvent = new ComponentEventBuilder();
  const readyEvent = new ReadyEventBuilder();
  const slashEvent = new SlashEventBuilder();
  return [componenentEvent, readyEvent, slashEvent];
};
