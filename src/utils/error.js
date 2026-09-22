export class AppError extends Error{
    constructor(message, status){
        super(message)
        this.status = status
    };
};
export class BadRequest extends AppError{
    constructor(message){
       super(message, 400)
    }
}
export class NotFound extends AppError{
    constructor(id){
        super(`No existe un id: ${id}`, 404)
    }
}