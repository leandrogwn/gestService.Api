import { Request } from 'express';
import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';

export abstract class BaseController<T> extends BaseNotification {
    private _repository: Repository<T>;

    constructor(entity: any) {
        super();
        this._repository = AppDataSource.getRepository<T>(entity)
    }


    async all() {
        return this._repository.find()
    }

    async one(request: Request) {
        return this._repository.findOne(request.params.uid)
    }

    async save(model: any) {

        if (model.uid) {
            let _modelInDB = await this._repository.findOne(model.uid);
            if (_modelInDB) {
                Object.assign(_modelInDB, model);
            }

        }

        if (this.valid()) {
            return this._repository.save(model);
        } else {
            return {
                status: 400,
                errors: this.allNotifications
            }
        }
    }

    async remove(request: Request) {
        let uid = request.params.uid;
        let model: any = await this._repository.findOne(uid);
        if (model) {
            model.deleted = true;
        }
        return this._repository.save(model);
    }
}