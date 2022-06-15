const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const db = admin.firestore();

const mailsender = 'Sprent <sprent@snajd.se>';
const mailuser = 'sprent@snajd.se';
const mailhost = 'webmail.atellus.se';
const mailport = 587;
const mailpass = 'b9YWp28F7e';

const options = {
  host: mailhost,
  port: mailport,
  secure: true,
  auth: {
    user: mailuser,
    pass: mailpass,
  }
}

const templates = {
  housing: {
    subject: 'Hello <companyname>',
    html: `
      Thank you for your email, we'll get back to you as soon as we have an accommodation that suits your request.<br />
      <br />
      If your request is urgent please give us an E-mail or Call!<br />
      <br />
      Best regards,<br />
      Sprent AB<br />
      +46(0)793-258022 (Simon Ödmark)<br />
      Simon@sprent.se<br />
      <br />
      +46(0)793-290612 (Patrik Falk)<br />
      Patrik@sprent.se<br />
    `,
  },
  landlords: {
    subject: 'Hello <companyname>',
    html: `
      Tack för er anmälan om att bli uthyrare hos Sprent AB. <br />
      Ni finns nu registrerad hos oss.  <br />
      <br />
      Vi kommer att kontakta dig när vi önskar hyra ert boende. <br />
      <br />
      Vänliga hälsningar  <br />
      Sprent AB <br />
      <br />
      ——————————————————————————————— <br />
      Thank you for your application to become a landlord at Sprent AB. <br />
      You are now registered with us. <br />
      <br />
      We will contact you when we wish to rent your accommodation. <br />
      <br />
      Sincerely <br />
      Sprent AB <br />
    `,
  },
};

const replaceAll = (str, placeholder, value) => str ? str.split(placeholder).join(value) : str;

const formatEmail = (recipient, template, data) => {
  let { subject, html } = template;

  const keys = Object.keys(data);

  keys.map((key) => {
    const val = data[key];

    if (typeof val === 'string' || typeof val === 'number') {
      html = replaceAll(html, `<${key}>`, `${val}`);
      subject = replaceAll(subject, `<${key}>`, `${val}`);
    }
  });

  return {
    to: recipient,
    from: mailsender,
    subject,
    html,
  };
};

const saveHousingRequest = async ({ data }) => (
  new Promise(async (resolve, reject) => {
    try {
      const increment = admin.firestore.FieldValue.increment(1);
      const ref = db
        .collection("counter")
        .doc("housing")

      await ref.update({ latest: increment });
      const number = await ref.get();
      const { latest: requestId } = number.data();

      await db
        .collection("rental")
        .add({
          createdAt: admin.firestore.Timestamp.now(),
          status: 'pending',
          requestId,
          ...data
        })

      const mailer = nodemailer.createTransport(options);
      const { email: recipient } = data;

      const email = formatEmail(recipient, templates.housing, data);
      await mailer.sendMail(email);

      const emailCC = formatEmail('ojna@hey.com', templates.housing, data);
      await mailer.sendMail(emailCC);

      resolve({ requestId });
    } catch (err) {
      console.log(err);

      reject({ error: true });
    }
  })
);

const saveLandlordRequest = async ({ data }) => (
  new Promise(async (resolve, reject) => {
    try {
      const increment = admin.firestore.FieldValue.increment(1);
      const ref = db
        .collection("counter")
        .doc("landlords")

      await ref.update({ latest: increment });
      const number = await ref.get();
      const { latest: requestId } = number.data();

      const landlord = await db
        .collection("landlords")
        .add({
          createdAt: admin.firestore.Timestamp.now(),
          status: 'pending',
          requestId,
          ...data
        })

      const mailer = nodemailer.createTransport(options);
      const { email: recipient } = data;

      const email = formatEmail(recipient, templates.landlords, data);
      await mailer.sendMail(email);

      resolve({ requestId, documentId: landlord.id });
    } catch (err) {
      console.log(err);

      reject({ error: true });
    }
  })
);

exports.saveHousingRequest = saveHousingRequest;
exports.saveLandlordRequest = saveLandlordRequest;
