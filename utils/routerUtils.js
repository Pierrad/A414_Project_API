let paths = new Set(["/", "/users", "/history", "/english"]);

exports.isAuthorizedRoute = (req) => {
    return (paths.has("/"+req.originalUrl.split("/")[1]));
};

