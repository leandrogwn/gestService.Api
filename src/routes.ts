import { UserController } from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "post",
    route: "/users/create",
    controller: UserController,
    action: "createUser"
}, {
    method: "post",
    route: "/users/auth",
    controller: UserController,
    action: "auth"
},{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]