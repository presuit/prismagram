import { adjectives, nouns } from "./adjectives";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD,
        },
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "chldudgh8256@gmail.com",
        to: address,
        subject: "Login Secret for Prismagram 🔓",
        html: `Hello! Your Login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
    };
    return sendMail(email);
};

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};
