const { Switch } = require("@mui/material");
const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    console.log('in error handler');
    const statusCode = res.statusCode ? res.statusCode : 500;

    if(err){
        console.log(err);
        res.json({
            title: "Error Handled by Error Handler",
            message: err.message
        });
    }

    switch(statusCode){
        case constants.VALIDATION_ERROR :

            res.json({
                title : "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.SERVER_ERROR :
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.FORBIDDEN :
            res.json({
                title: "ForBidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorised",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        
        default:
            console.log("No error All Good");
            break;


    }
    next();
}

module.exports = { errorHandler };