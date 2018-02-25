const GenericImageCommand = require('../models/GenericImageCommand.js')

const command = new GenericImageCommand('b1nzy', (msg, args) => {
  let avatarurl = msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL
  if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
    avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
  }

  if (!args[0]) {
    msg.channel.createMessage('You need to add something to make b1nzy say, try again.')
    return false
  }

  if (args.join(' ').length > 250) {
    msg.channel.createMessage(`Too long. You're ${args.join(' ').length - 250} characters over the limit!`)
    return false
  }

  if (!/^[\x00-\x7F]*$/.test(args.join(' '))) { // eslint-disable-line
    msg.channel.createMessage('Your argument contains invalid characters. Please try again.')
    return false
  }

  return JSON.stringify([`${avatarurl}`, `${args.join(' ')}`])
}, {
  usage: '{command} <something to make b1nzy say>',
  aliases: ['catman'],
  description: 'OH NO ITS B1NZY'
})

module.exports = command