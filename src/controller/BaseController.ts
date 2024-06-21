import { Request } from 'express';
import { AppDataSource } from '../data-source';
import { Repository, FindOptionsWhere } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';
import { User } from '../entity/User';

export abstract class BaseController<T> extends BaseNotification {
    repository: Repository<T>;

    constructor(entity: any) {
        super();
        this.repository = AppDataSource.getRepository<T>(entity)
    }

    async all() {
        return this.repository.find()
    }

    async one() {
        return this.repository.findOne({delete: false} );
    }

    async save(model: any) {

        if (model.uid) {
            let _modelInDB = await this.repository.findOne(model.uid);
            if (_modelInDB) {
                Object.assign(_modelInDB, model);
            }
        }

        if (this.valid()) {
            return this.repository.save(model);
        } else {
            return {
                status: 400,
                errors: this.allNotifications
            }
        }
    }

    async remove(request: Request) {
        let uid = request.params.uid;
        let model: any = await this.repository.findOne(uid);
        if (model) {
            model.deleted = true;
        }
        return this.repository.save(model);
    }
}