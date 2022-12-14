const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db")
const moment = require("moment");
require("../ravgarcık.js");
exports.execute = async (client, message, args) => {
  var tarih = [moment().format('DD/MM/YYYY | H:mm')]
  let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`Tarih: ${tarih}`).setColor("GREEN"); 
  let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return  message.react("❌");

    if(client.config.SadeceTaglı) {
      let tarih = moment(Date.now()).format('DD/MM/YYYY H:mm')

  
    if(!message.member.roles.cache.has(client.config.Booster))
    if(!message.member.roles.cache.has(client.config.TagRolRegister))
    if(message.author.id !== client.config.BotOwner)
    if(!message.member.roles.cache.has(client.config.OwnerRole)) return message.react(client.config.emoji.red);

    let sebep = args.join(' ');
    if (!sebep) sebep = "Belirtilmedi."
    let zatenafk = qdb.fetch(`zAfk_${message.author.id}`)
    if(zatenafk) return message.channel.send(`2. kez afk olamazsın dostum.`);

    qdb.set(`zAfk_${message.author.id}`, sebep)  

    if(message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => { });
    message.reply(`Başarılı şekilde afk moduna geçiş yapılmıştır`).then(x => x.delete({timeout: 5000}));

} else {

    let sebep = args.join(' ');
    if (!sebep) sebep = "Belirtilmedi."
    let zatenafk = qdb.fetch(`zAfk_${message.author.id}`)
    if(zatenafk) return message.channel.send(`2. kez afk olamazsın dostum.`);

    qdb.set(`zAfk_${message.author.id}`, sebep)  

    if(message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => { });
    message.reply(`Başarılı şekilde afk moduna geçiş yapılmıştır.`).then(x => x.delete({timeout: 5000}));

    let teyzennabuyo = client.channels.cache.find(a => a.name === "afk-log"); 
    client.channels.cache.get(teyzennabuyo).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) kişisi [AFK] moduna geçti.`)).catch(e => { })

}
};
exports.conf = {
  command: "afk", // Asıl komutumuz
  description: "Sunucuda [AFK] olmanı sağlar. ", // Komut açıklamamız
  aliases: [] // Komutumuzun yardımcıları
};