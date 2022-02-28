import nodemailer from "nodemailer"
import Domains from "../Models/Domains";
import {smtpLogin, smtpPass, smtpUrl} from "../Data/Config.json"

function getNumberOfDays(end: any) {
    const date1 = new Date();
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    return Math.round(diffInTime / oneDay);
}

export default class SendMailDomains {
    public static readonly Instance: SendMailDomains = new SendMailDomains()

    // @ts-ignore
    async SendMail() {
        try {
            const domains = await Domains.getAllDomains()
            let message: string = ''
            for (const domain of domains){
                if (getNumberOfDays(new Date(domain.paidDate)) <= 50){
                    message += `
                <tr>
                    <td>${domain.domain}</td>
                    <td>${getNumberOfDays(new Date(domain.paidDate))}</td>
                    <td>${new Date(domain.paidDate).toLocaleDateString()}</td>
                </tr>
            `
                }
            }

            let transporter = nodemailer.createTransport({
                host: smtpUrl,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: smtpLogin, // generated ethereal user
                    pass: smtpPass, // generated ethereal password
                },
            });

            let info = await transporter.sendMail({
                from: '"Информация по доменам 👻" <support@site-creative.ru>', // sender address
                to: "qweeex@yandex.ru", // list of receivers
                subject: "Домены к продлению ✔", // Subject line
                text: "Домены к продлению", // plain text body
                html: `
                <table border="1" cellpadding="3" width="100%">
                   <caption>Домены к продлению</caption>
                   <tr>
                    <th>Домен</th>
                    <th>Кол-во дней</th>
                    <th>Дата окночания</th>
                   </tr>
                   ${message}
                  </table>
                `, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        } catch (e) {
            console.error(e)
        }
    }
}

