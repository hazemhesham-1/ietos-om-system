const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

async function handleLogin(req, res) {
    const cookies = req.cookies;
    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const foundUser = await Employee.findOne({ email }).exec();
    if(!foundUser) {
        return res.status(401).json({ message: "Authentication failed. Please try again." });
    }

    const isMatch = await foundUser.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ message: "Authentication failed. Please try again." });
    }

    const tokenPayload = {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role
    };

    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

    let newRefreshTokenArray = !cookies.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter((token) => token !== cookies.jwt);
    
    if(cookies.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await Employee.findOne({ refreshToken }).exec();

        if(!foundToken) {
            newRefreshTokenArray = [];
        }

        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();

    res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
}

async function handleLogout(req, res) {
    const cookies = req.cookies;
    if(!cookies.jwt) {
        return res.status(204).json({ message: "No active session to log out" });
    }

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.json({ message: "Successfully logged out" });
}

async function handleRefreshToken(req, res) {
    const cookies = req.cookies;
    if(!cookies.jwt) {
        return res.status(401).json({ message: "Authentication cookie is missing" });
    }

    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const foundUser = await Employee.findOne({ refreshToken }).exec();

    if(!foundUser) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const employee = await Employee.findOne({ username: decoded.username }).exec();
            employee.refreshToken = [];
            await employee.save();
        }
        catch(err) {
            return res.status(403).json({ message: "Access denied: Invalid refresh token" });
        }

        return res.status(403).json({ message: "Access denied: Invalid refresh token" });
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter((token) => token !== refreshToken);

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if(decoded.username !== foundUser.username) {
            return res.status(403).json({ message: "Access denied: Invalid or expired token" });
        }

        const tokenPayload = {
            id: foundUser._id,
            username: decoded.username,
            role: foundUser.role
        };

        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const newRefreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({ role: foundUser.role, accessToken });
    }
    catch(err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();

        return res.status(403).json({ message: "Access denied: Invalid or expired token" });
    }
}

module.exports = { handleLogin, handleLogout, handleRefreshToken };