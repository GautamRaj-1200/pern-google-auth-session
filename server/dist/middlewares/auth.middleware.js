export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized" });
};
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
};
export const notFoundHandler = (req, res) => {
    res.status(404).json({ error: "Route not found" });
};
