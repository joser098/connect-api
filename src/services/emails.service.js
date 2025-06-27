import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import dotenv from "dotenv";
dotenv.config();

// Set the AWS Region.
const REGION = "us-east-1";
const accessKeyId = process.env.CONNECT_AWS_SES_ACCESS_KEY;
const secretAccessKey = process.env.CONNECT_AWS_SES_SECRET_ACCESS_KEY;
// Create SES service object.
const sesClient = new SESClient({ region: REGION, credentials: { accessKeyId, secretAccessKey} });

const createSendEmailCommand = (toEmail, subject, template) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [toEmail],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: template,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: '"Grupos de Conexion" <noreply@gruposdeconexion.info>',
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const sendEmailSES = async (toEmail, subject, template) => {
  const sendEmailCommand = createSendEmailCommand(
    toEmail,
    subject,
    template
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    console.log(caught)
    return caught;
  }
};

const emailsService = {
  sendEmailSES
};

export default emailsService;