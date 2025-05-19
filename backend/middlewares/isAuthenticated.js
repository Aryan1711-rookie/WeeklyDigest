import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized',
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token',
                success: false
            });
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized: User not found',
                success: false
            });
        };
        req.user = user;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error while Authenticating",
            success: false
        });
    }
};
export default isAuthenticated;