import { Client, Intents, MessageEmbed } from "discord.js"
import {botPrefix} from "../Data/Config.json"
import Domains from "../Models/Domains";

function checkEmpty(text: string) {
    if (text === '' || text === null || text === undefined){
        return 'Пусто'
    } else {
        return text
    }
}
function checkStatus(status: any) {
    if (status === true){
        return 'Да'
    } else {
        return  'Нет'
    }
}

class BotManager {
    public static readonly Instance: BotManager = new BotManager()
    public client!: Client

    private constructor() {
        this.client = new Client({ intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ]})
    }

    async Start(){
        this.client.on('ready', () => {
            // @ts-ignore
            console.log(`Logged in as ${this.client.user.tag}!`);
        })
        this.client.on('messageCreate', async (message) => {
            if (message.content.startsWith(botPrefix) === true) {
                let domain = message.content.replace('!', '')
                switch (domain){
                    case 'beget':
                        message.reply('bebet');
                        break;
                    default:
                        await Domains.findDomain(domain)
                            .then((res: any) => {
                                if (res.length > 0){
                                    let info = res[0];
                                    let date = checkEmpty(info.paidDate)
                                    let options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    const exampleEmbed = new MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('Информация о домене: ' + info.domain)
                                        .addField('Дата окончания', new Date(date).toLocaleDateString('ru-RU', options), true)
                                        .addField('Цена домена', checkEmpty(info.price), true)
                                        .setDescription('Информация о хостинге')
                                        .addFields(
                                            {name: 'Хостинг обслуживается у нас', value: checkStatus(info.serviceHost)},
                                            {name: 'Адрес хоста', value: checkEmpty(info.hostUrl), inline: true},
                                            {name: 'Логин хоста', value: checkEmpty(info.hostLogin), inline: true},
                                            {name: 'Пароль хоста', value: checkEmpty(info.hostPass), inline: true},
                                        )
                                        .setDescription('Информация о регристраторе')
                                        .addFields(
                                            {name: 'Домен обслуживается у нас', value: checkStatus(info.serviceDomain)},
                                            {name: 'Адрес регистратора', value: checkEmpty(info.domainUrl), inline: true},
                                            {name: 'Логин регистратора', value: checkEmpty(info.domainLogin), inline: true},
                                            {name: 'Пароль регистратора', value: checkEmpty(info.domainPass), inline: true},
                                        )
                                        .setTimestamp();
                                    message.reply({embeds: [exampleEmbed]});
                                } else {
                                    message.reply('``` Ничего не найдено ```')
                                }
                            })
                        break;
                }
            }
        })
        await this.client.login('NzE4NDQwODk3NzU0MzAwNTAw.Xto6Og.rEXrFLy_2W7fO31N_UPSRG_RZwg')
    }

}

export default BotManager