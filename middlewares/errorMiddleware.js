// error middleware || NEXT function
const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    const defaultErrors = {
        statusCode: 500,
        message: err,
    }
    
    // missing filed error
    if (err.name === 'ValidationError'){
        defaultErrors.statusCode = 400;
        defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
    }

    // duplicate key error
    if (err.code && err.code === 11000){
        defaultErrors.statusCode = 400;
        defaultErrors.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    }
    res.status(defaultErrors.statusCode).json({message: defaultErrors.message})
};

export default errorMiddleware;