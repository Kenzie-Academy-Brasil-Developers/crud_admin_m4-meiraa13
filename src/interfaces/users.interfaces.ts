interface IUser {
    id:number,
    name:string,
    email:string,
    password:string,
    admin:boolean,
    active:boolean
}

type TUserRequest = Omit<IUser, 'id'>

type TUserResponse = Omit<IUser, 'password'>

export { IUser, TUserRequest, TUserResponse }
