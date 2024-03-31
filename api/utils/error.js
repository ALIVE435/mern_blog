export const errorHandler=(statusCode,message)=>{
    const error =new Error(); //constructing an error object using error constructor(an object constructor)
    error.statusCode=statusCode
    error.message=message
    return error;
};