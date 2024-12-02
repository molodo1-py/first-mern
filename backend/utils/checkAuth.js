import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    const token = req.headers.authorization?.replace(/Bearer\s+?/, '');
    if (!token) {
        res.status(403).json({
            message: 'Access denied'
        });
    }
    try {
        const decoded = jwt.verify(
            token,
            'hvxerbs1ckm7CWcngrojWwIWKX6r8NQ2oYt23+Ybvjg='
        );
        req.userId = decoded._id;
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: 'Invalid token'
        });
    }
};
