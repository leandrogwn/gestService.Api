import { Request } from "express";
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import * as md5 from 'md5';
import { sign } from "jsonwebtoken";
import config from "../configuration/config";


export class UserController extends BaseController<User> {

    constructor() {
        super(User)
    }

    async auth(request: Request) {
        let { email, password } = request.body;
        if (!email || !password)
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        let user = await this.repository.findOne({ where: { email: email, password: md5(password) } });
        if (user) {
            let _payload = {
                uid: user.uid,
                name: user.name,
                photo: user.photo,
                email: user.email
            }
            return {
                status: 200,
                message: {
                    user: _payload,
                    token: sign({
                        ..._payload,
                        tm: new Date().getTime()
                    }, config.secretyKey)
                }
            }
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }


    }

    async createUser(request: Request) {
        let { name, photo, email, password, confirmPassword, isRoot } = request.body;
        super.isRequired(name, 'Informe o nome');
        super.isRequired(photo, 'Informe a foto');
        super.isRequired(email, 'Informe o e-mail');
        super.isRequired(password, 'Informe a  senha');
        super.isRequired(confirmPassword, 'Informe a confirmação de senha');

        let _user = new User();
        _user.name = name;
        _user.photo = photo;
        _user.email = email;

        if (password != confirmPassword)
            return { status: 400, errors: ['A senha e a confirmação são diferentes'] }
        if (password)
            _user.password = md5(password);

        _user.isRoot = isRoot;

        return super.save(_user);
    }

    async save(request: Request) {
        let _user = <User>request.body;
        return super.save(_user);
    }

}