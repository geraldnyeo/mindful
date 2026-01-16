const bcrypt = require('bcrypt');
const { dbClient } = require('../lib/dbClient');
const { hasString } = require('../util/checkProperty');
const { SignJWT, jwtVerify } = require('jose');
const { JWTSECRET } = require('../util/loadEnv');

class AuthService {
    static BCRYPTMAXPWLENGTH = 72;
    static BCRYPTSALTROUNDS = 10;
    static JWTALG = 'HS256';
    static JWTEXPIRYTIME = "15min";

    // [TODO] make sync
    async validateRawPassword(pw) {
        const pwByteBuffer = await new Blob([pw]).bytes();
        if(pwByteBuffer.length > AuthService.BCRYPTMAXPWLENGTH) {
            return false;
        }
        return true;
    }

    hashPassword(pw) {
        // const passwordOk = await this.validateRawPassword(pw);
        // if(!passwordOk) {
        //     throw new Error("Invalid password");
        // }

        const hash = bcrypt.hashSync(pw, AuthService.BCRYPTSALTROUNDS);
        return hash;
    }

    async compareHash(pw, hash) {
        return await bcrypt.compare(pw, hash);
    }

    async checkPasswordEmail(email, pw) {
        let users = dbClient.collection("users");
        let hash = (await users.findOne({email: email})).pw;
        const ok = await this.compareHash(pw, hash);
        return this.compareHash(pw, hash);
    }

    async checkPasswordId(id, pw) {
        let users = dbClient.collection("users");
        let hash = (await users.findOne({_id: id})).pw;
        return this.compareHash(pw, hash);
    }

    async generateSessionToken(id) {
        const jwt = await new SignJWT()
                              .setProtectedHeader({alg: AuthService.JWTALG})
                              .setIssuedAt()
                              .setExpirationTime(AuthService.JWTEXPIRYTIME)
                              .setSubject(id)
                              .sign(JWTSECRET);
        return jwt;
    }

    async checkSessionToken(token) {
        try {
            return await jwtVerify(token, JWTSECRET);
        } catch {
            return false;
        }
    }

    // something simple first
    validateAPISignupInput(req_body) {
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

    validateAPILoginInput(req_body) {
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

module.exports = {
    authService
}