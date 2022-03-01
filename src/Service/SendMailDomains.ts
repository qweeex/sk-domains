import nodemailer from "nodemailer"
import Domains from "../Models/Domains";
import {smtpLogin, smtpPass, smtpUrl} from "../Data/Config.json"
import Setting from "../Models/Setting";

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
            let options = {  year: 'numeric', month: 'long', day: 'numeric' }
            for (const domain of domains){
                if (getNumberOfDays(new Date(domain.paidDate)) <= 50){
                    message += `
                        <tr>
                            <td>${domain.domain}</td>
                            <td>${getNumberOfDays(new Date(domain.paidDate))}</td>
                            <td>${new Date(domain.paidDate).toLocaleDateString('ru-RU', options)}</td>
                        </tr>
                    `
                }
            }

            if (message != ''){
                let transporter = nodemailer.createTransport({
                    host: smtpUrl,
                    port: 465,
                    secure: true,
                    auth: {
                        user: smtpLogin,
                        pass: smtpPass,
                    },
                });
                const mailTo = await Setting.getSetting('mail_to');

                let info = await transporter.sendMail({
                    from: '"Информация по доменам 👻" <support@site-creative.ru>', // sender address
                    to: mailTo[0].value, // list of receivers
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
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

        } catch (e) {
            console.error(e)
        }
    }
}

