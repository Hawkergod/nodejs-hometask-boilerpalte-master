const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query
    //good
    // if (res.data) { res.status(200).json({ data: res.data }); next() }

    // console.log(res.err);
    // if (res.err.error) {
    //     res.status(res.err.status).json({
    //         error: res.err.error,
    //         status: res.err.status,
    //         message: res.err.message,
    //     })
    //     next(req, res)
    // }

    //end good

    console.log(res.locals);
    if (res.locals.error) {
        res.status(res.locals.status).json({
            error: res.locals.error,
            status: res.locals.status,
            message: res.locals.message,
        })
    }
    else
        if (res.err) {
            res.status(404).json({
                error: true,
                status: 404,
                message: `${res.err}`,
            })
        } else
            next();




}

exports.responseMiddleware = responseMiddleware;