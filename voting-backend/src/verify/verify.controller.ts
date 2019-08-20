import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {VerifyEmailModel} from './verify-email.model';
import {VerifyMobileModel} from './verify-mobile.model';
import * as nodeMailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import {Twilio} from 'twilio';

const client = new Twilio('ACbbd12d808ad8e4bc88bf24a6aae4b84c', '5818539d9a9020eec6fc8e26d59101ab');

@Controller('api/v1/verify')
export class VerifyController {
    private emailVerifications: VerifyEmailModel[] = [];
    private mobileVerifications: VerifyMobileModel[] = [];

    private transporter = nodeMailer.createTransport( smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'votingportal.sjpuc@gmail.com',
            pass: 'st.josephs',
        },
    }));

    @Post('/send-email')
    async sendVerificationCode(@Body() payload: { email: string }) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const emailVerification: VerifyEmailModel = {
            emailAddress: payload.email,
            OTP: otp.toString(),
        };
        this.emailVerifications.push(emailVerification);
        await this.transporter.sendMail({
            from: 'votingportal.sjpuc@gmail.com',
            to: emailVerification.emailAddress,
            subject: 'Verify your email.',
            html: `OTP: ${emailVerification.OTP}`,
        });
        return { success: true };
    }

    @Post('/verify-email')
    verifyUserEmail(@Body() Request) {
        let pos = -1;
        this.emailVerifications.forEach( emailVerification => {
            pos++;
            if (Request.emailAddress === emailVerification.emailAddress ) {
                if (Request.enteredOTP === emailVerification.OTP) {
                    this.emailVerifications.splice(pos, 1);
                    return { verified: true };
                } else {
                    return { verified: false };
                }
            } else {
                return { verified: false };
            }
        });
    }

    @Post('/send-mobile')
    sendMobileOTP(@Body() payload: { mobileNumber: string}) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const mobileVerification: VerifyMobileModel = {
            mobileNumber: payload.mobileNumber,
            otp: otp.toString(),
        };
        client.messages.create({
            body: `OTP: ${otp}`,
            from: '+12067852378',
            to: payload.mobileNumber,
        });
        this.mobileVerifications.push(mobileVerification);
        return { success: true };
    }

    @Post('/verify-mobile')
    verifyMobile(@Body() Request: { mobileNumber: string, enteredOTP: string }) {
        let pos = -1;
        this.mobileVerifications.forEach( mobileVerification => {
            pos++;
            if (Request.mobileNumber === mobileVerification.mobileNumber ) {
                if (Request.enteredOTP === mobileVerification.otp) {
                    this.emailVerifications.splice(pos, 1);
                    return { verified: true };
                } else {
                    return { verified: false };
                }
            } else {
                return { verified: false };
            }
        });
    }
}
