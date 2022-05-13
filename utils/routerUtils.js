let paths = new Set(["/", "/users"]);

exports.isAuthorizedRoute = (req) => {
    return (paths.has("/"+req.originalUrl.split("/")[1]));
};

