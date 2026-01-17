import * as bcrypt from 'bcrypt';
import dbClient from '../lib/dbClient.js';
import { hasString } from '../util/checkProperty.js';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';
import { JWTSECRET } from '../util/loadEnv.js';
import { ObjectId } from 'mongodb';

type APISignupInput = {
    name: string,
    role: string,
    email: string,
    pw: string
}   

type APILoginInput = {
    email: string,
    pw: string
}

class AuthService {
    static BCRYPTMAXPWLENGTH = 72;
    static BCRYPTSALTROUNDS = 10;
    static JWTALG = 'HS256';
    static JWTEXPIRYTIME = "15min";

    // [TODO] make sync
    async validateRawPassword(pw: string) {
        const pwByteBuffer = await new Blob([pw]).bytes();
        if(pwByteBuffer.length > AuthService.BCRYPTMAXPWLENGTH) {
            return false;
        }
        return true;
    }

    hashPassword(pw: string) {
        // const passwordOk = await this.validateRawPassword(pw);
        // if(!passwordOk) {
        //     throw new Error("Invalid password");
        // }

        const hash = bcrypt.hashSync(pw, AuthService.BCRYPTSALTROUNDS);
        return hash;
    }

    async compareHash(pw: string, hash: string) {
        return await bcrypt.compare(pw, hash);
    }

    async checkPasswordEmail(email: string, pw: string) {
        let users = dbClient.collection("users");
        let user = await users.findOne({email: email});
        if(!user) {
            return false;
        }
        let hash = user.pw;
        return this.compareHash(pw, hash);
    }

    async checkPasswordId(id: string, pw: string) {
        let users = dbClient.collection("users");
        let user = await users.findOne({_id: new ObjectId(id)});
        if(!user) {
            return false;
        }
        let hash = user.pw;
        return this.compareHash(pw, hash);
    }

    async generateSessionToken(id: string) {
        const jwt = await new SignJWT()
                              .setProtectedHeader({alg: AuthService.JWTALG})
                              .setIssuedAt()
                              .setExpirationTime(AuthService.JWTEXPIRYTIME)
                              .setSubject(id)
                              .sign(JWTSECRET);
        return jwt;
    }

    async checkSessionToken(token: string) {
        try {
            return await jwtVerify(token, JWTSECRET);
        } catch {
            return false;
        }
    }
    
    async getIdFromToken(token: string) {
        return (await decodeJwt(token)).sub;
    }

    // something simple first
    validateAPISignupInput(req_body: any) {
        if(!hasString(req_body, 'name') ||
           !hasString(req_body, 'role') ||
           !hasString(req_body, 'email') ||
           !hasString(req_body, 'pw')) {
            return false;
        }

        if(!req_body.name || !req_body.role || !req_body.email || !req_body.pw) {
            return false;
        }

        return true;
    }

    validateAPILoginInput(req_body: APILoginInput) {
        if(!hasString(req_body, 'email') ||
           !hasString(req_body, 'pw')) {
            return false;
        }

        if(!req_body.email || !req_body.pw) {
            return false;
        }

        return true;
    }
}

const authService = new AuthService();

export default authService;