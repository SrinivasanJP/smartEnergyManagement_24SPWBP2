const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;
  console.log(recipient,subject,body)

  const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: 'spwbp124@gmail.com', // generated ethereal user
            pass: "xsmtpsib-676238405bae86d943cb48c05eee13ee8cf5b1633f20294c6a9829820d86859c-LanVzGIXk2BWF6wg"  // generated ethereal password
        }
    });
  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'spwbp124@gmail.com',
    to: recipient,
    subject: subject,
    text: body,
  });

  console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
  res.send('Email sent successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
