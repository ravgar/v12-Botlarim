const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
 
    if(!message.guild) return;
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(client.config.SetFooter).setColor("RANDOM");

    let embed2 = new MessageEmbed().setColor("RANDOM");

    if(!message.member.roles.cache.has(client.config.OwnerRole))
    if(message.author.id !== client.config.BotOwner)
    return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    if(!message.member.voice.channel) return message.channel.send(embed.setDescription(`:x: Bir ses kanalında **bulunmuyorsun!**`)).then(x => x.delete({timeout: 10000}));
    let kanal = message.member.voice.channel.id
    let firstChannelMembers = message.guild.channels.cache.get(kanal).members.array().filter(x => x.id !== message.member.id);

    firstChannelMembers.forEach((x, i) => {
    setTimeout(async () => {
        x.voice.setMute(true).catch(e => { })
    }, i*200)
    })
   
    await message.channel.send(embed.setDescription(`**${message.guild.channels.cache.get(kanal).name}** Adlı kanaldaki \`${firstChannelMembers.length}\` üyeler susturuldu!`)).catch(e => { })
    
  };

exports.conf = {
  command: "allmute", // Asıl komutumuz
  description: "Herkesi muteleme komutu", // Komut açıklamamız
  aliases: ["all-mute"] // Komutumuzun yardımcıları
};