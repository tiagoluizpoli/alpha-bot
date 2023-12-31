import { ExtendedClient } from './structs/extendedClient'

export * from 'colors'

const client = new ExtendedClient()

void client.start()

export { client }

client.on('ready', () => {
  console.info('Bot online'.green)
})

client.on('messageCreate', async (message) => {
  if (message.author.id === client.user?.id) return

  await message.reply({
    content: `Olá ${message.author.username}`,
  })
})
