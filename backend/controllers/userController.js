const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

// we are passing in id because it's going to be part of the payload in jwt
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    console.log(user._id);
    const token = createToken(user._id);

    // res.status(200).json({email, user})
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);

    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Admin",
        link: "https://mailgen.js/",
      },
    });
    let response = {
      body: {
        name: name,
        intro:
          "Welcome to Slimnatics! We're very excited to have you on board.This app will help you stay fit and also help you shed off that excess",
      },
    };
    let mail = mailGenerator.generate(response);
    let message = {
      from: "olayinka4grace@gmail.com",
      to: email,
      subject: "Welcome",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: "You should recieve an email",
        });
      })
      .catch((error) => {
        res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //test account
// const sendMail = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });

//   let message = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<div><p>Hey Niga</p> <b>Wassup</b></div>",
//     // html body
//   };

//   transporter
//     .sendMail(message)
//     .then((info) => {
//       return res.status(201).json({
//         msg: "you should receive an email ",
//         info: info.messageId,
//         preview: nodemailer.getTestMessageUrl(info),
//       });
//     })
//     .catch((error) => {
//       return res.status(500).json({ error: error.message });
//     });
// };

// // gmail
// const sendMailTwo = async (req, res) => {
//   const { userEmail } = req.body;
//   let config = {
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   };

//   let transporter = nodemailer.createTransport(config);
//   let mailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Ade",
//       link: "https://mailgen.js/",
//     },
//   });
//   let response = {
//     body: {
//       name: "Ade",
//       intro: "Your bill has arrived",
//       table: {
//         data: [
//           {
//             item: "Nodemailer Stack Book",
//             description: "A Backend application",
//             price: "$10",
//           },
//         ],
//       },
//       outro: "Looking forward to doing more business with you",
//     },
//   };
//   let mail = mailGenerator.generate(response);
//   let message = {
//     from: "olayinka4grace@gmail.com",
//     to: userEmail,
//     subject: "Place Order",
//     html: mail,
//   };
//   transporter
//     .sendMail(message)
//     .then(() => {
//       return res.status(201).json({
//         msg: "You should recieve an email",
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({ msg: error.message });
//     });
// };

module.exports = {
  loginUser,
  signupUser,
//   sendMail,
//   sendMailTwo,
};
