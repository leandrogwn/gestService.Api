import { Category } from "../entity/Category";
import { BaseController } from "./BaseController";

export class CategoryController extends BaseController<Category>{
    constructor(){
        super(Category);
    }
}