import nodemailer from "nodemailer"
import BegetApi from "../Api/BegetApi";
import {smtpLogin, smtpPass, smtpUrl} from "../Data/Config.json"
import Setting from "../Models/Setting";


export default class SendMailHosting {
    public static readonly Instance: SendMailHosting = new SendMailHosting()

    // @ts-ignore
    async SendMail() {
        try {
            const accounts = await BegetApi.AccountInformation()
            let message: string = ''
            for (const domain of accounts){
                if (domain.user_days_to_block <= 70){
                    message += `
                        <tr>
                            <td>${domain.host}</td>
                            <td>${domain.user_days_to_block}</td>
                        </tr>
                    `
                }
            }
            if (message != ''){
                let transporter = nodemailer.createTransport({
                    host: smtpUrl,
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: smtpLogin, // generated ethereal user
                        pass: smtpPass, // generated ethereal password
                    },
                });
                const mailTo = await Setting.getSetting('mail_to');

                let info = await transporter.sendMail({
                    from: '"Информация по хостингам 👻" <support@site-creative.ru>', // sender address
                    to: mailTo[0].value, // list of receivers
                    subject: "Хостинг к продлению ✔", // Subject line
                    text: "Хостинг к продлению", // plain text body
                    html: `
                <table border="1" cellpadding="3" width="100%">
                   <caption>Хостинг к продлению</caption>
                   <tr>
                    <th>Подписка</th>
                    <th>Кол-во дней до отключения</th>
                   </tr>
                   ${message}
                  </table>
                `, // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        } catch (e) {
            console.error(e)
        }
    }
}

