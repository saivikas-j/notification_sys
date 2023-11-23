import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';
import * as nodemailer from 'nodemailer';
import { iUserData, iAQIData} from '../dataInterfaces';

const helpers = {
    eq: function (a: any, b: any, options: Handlebars.HelperOptions) {
        return a === b ? options.fn(this) : options.inverse(this);
    },
};


export const sendMail = async (user: iUserData, AQIvalues: iAQIData, date: Date, AQIparameters: string[]) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: '<YOUR_EMAIL_ID',
        pass: '<YOUR_PASSWORD>',
        },
    });

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
        viewEngine: {
            extname: '.handlebars',
            partialsDir: './emailTemplates/',
            layoutsDir: './emailTemplates/',
            defaultLayout: 'notification',
            helpers: helpers,
        },
        viewPath: './emailTemplates/',
        extName: '.handlebars',
    };

    console.log('Setting up handlebars');
    transporter.use('compile', hbs(handlebarOptions));

    interface MailOptions {
        from: string;
        to: string;
        subject: string;
        template: string;
        context: {
            mail: string;
            name: string;
            AQIvals: iAQIData;
            date: string;
            AQIparams: string[]
            //   applogoUrl: string;
        };
    }

    const mailOptions: MailOptions = {
        from: '"AirLifeGoa" balijapellypranav2507@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Daily Air Quality Indices',
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            mail: 'noreply@example.com',
            name: user.firstName,
            AQIvals: AQIvalues,
            date: (date.getDate().toString()) + '-' + ((date.getMonth() + 1).toString()) + '-' + (date.getFullYear().toString()),
            AQIparams: AQIparameters,
        //   applogoUrl: emailConfigs.appLogoUrl + encodedImage,
        },
    };

    // trigger the sending of the E-mail
    console.log(`Sending mail to ${user.email}...`)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:' + error);
            return error;
        }
        console.log('Message sent: ' + info.response);
    });
};
