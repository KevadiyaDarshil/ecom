var UM = require('../model/usermodel')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "kevadiyadarshil13@gmail.com",
        pass: "epjrxknxkwbzlune",
    },
});


exports.viewpage = async (req, res) => {
    try {
        const data = await UM.find()
        if (data.length == 0) throw new Error("data not found");
        res.status(200).json({
            status: 'success',
            message: "data found success",
            data: data
        })

    } catch (error) {
        res.status(400).json({
            status: "faild",
            message: error.message
        })

    }
}

exports.createpage = async (req, res) => {
    try {
        const data = req.body
        data.image = req.file.filename
        data.password = await bcrypt.hash(data.password, 10)
        const createdata = await UM.create(data)
        res.status(200).json({
            status: 'success',
            message: "data inserted ",
            data: createdata
        })



    } catch (error) {
        res.status(400).json({
            status: "faild",
            message: error.message
        })

    }

}

exports.deletedata = async (req, res) => {
    try {
        const deleteid = req.params.id
        const deletedata = await UM.findByIdAndDelete(deleteid)
        console.log(deletedata);


        res.status(200).json({
            status: 'success',
            message: 'data deleted',
            data: deletedata
        })

    } catch (error) {
        res.status(400).json({
            status: "faild",
            message: error.message
        })

    }
}

exports.updatedata = async (req, res) => {
    try {
        const updateid = req.params.id
        const data = req.body
        data.image = req.file.filename
        const updatedata = await UM.findByIdAndUpdate(updateid, data, { new: true })
        res.status(200).json({
            status: "success",
            message: "data updated",
            data: updatedata
        })

    } catch (error) {
        res.status(400).json({
            status: 'faild',
            message: error.message
        })

    }

}

async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'kevadiyadarshil13@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Final check ✔", // Subject line
        text: "Hello CDMI", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

exports.loginUser = async (req, res) => {
    try {
        const emailGet = await UM.findOne({ email: req.body.email })
        if (!emailGet) throw new Error("Invalid Email")
        const passVerify = await bcrypt.compare(req.body.password, emailGet.password)
        if (!passVerify) throw new Error("Invalid Password")
        main(req.body.email)
        const token = jwt.sign({ id: emailGet._id }, 'ecom')
        res.status(200).json({
            status: 'success',
            message: 'login Success',
            data: emailGet,
            token
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message
        })
    }

}
