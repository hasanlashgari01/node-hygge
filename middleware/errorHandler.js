exports.notFoundError = (req, res, next) => {
    res.status(404).json({
        message: "Not Found Page",
    });
};

exports.errorHandler = (err, req, res, next) => {
    const status = err.status ?? err.statusCode ?? 500;
    const success = err.success ?? false;

    res.status(status).json({
        status: status,
        success,
        message: err?.message ?? "Internal Server Error",
    });
};
