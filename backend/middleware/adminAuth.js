import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        // Retrieve token from the headers
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        // Verify the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the correct admin email (or any other identifying claim)
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth;
