const bcrypt = require('bcrypt');
const { dbClient } = require('../lib/dbClient');

class AuthService {
    static BCRYPTMAXPWLENGTH = 72;
    static BCRYPTSALTROUNDS = 10;

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

    async checkPasswordEmail(email, pwHash) {
        let users = dbClient.collection("users");
        let hash = (await users.findOne({email: email})).pw;
        return this.compareHash(pwHash, hash);
    }

    async checkPasswordId(id, pwHash) {
        let users = dbClient.collection("users");
        let hash = (await users.findOne({_id: id})).pw;
        return this.compareHash(pwHash, hash);
    }
}

const authService = new AuthService();

module.exports = {
    authService
}