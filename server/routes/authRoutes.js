const express = require("express");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Check tokens and handle each case
router.get("/auth/check-tokens", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let hasValidJWT = false;
    let hasValidAccessToken = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (user) {
          hasValidJWT = true;
          if (user.expiryDate > Date.now()) {
            hasValidAccessToken = true;
          }
        }
      } catch (err) {
        console.log("IN catch");
        console.log("Invalid JWT:", err.message);
      }
    }

    res.json({ hasValidJWT, hasValidAccessToken });
  } catch (err) {
    console.error("Error checking tokens:", err);
    res.status(500).json({ error: "Error checking tokens" });
  }
});

// Start OAuth flow
router.get("/auth", async (req, res) => {
  try {
    const authUrl = await auth.getAuthUrl();
    res.redirect(authUrl);
  } catch (err) {
    res.status(500).send("Error starting OAuth flow: " + err.message);
  }
});

// Handle OAuth callback
router.get("/auth/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).send("Authorization code missing");
    }

    // Exchange the code for tokens
    const tokens = await auth.getTokens(code);

    // Calculate JWT expiration time based on access token's expiry_date
    const jwtExpiry = Math.floor((new Date(tokens.expiry_date).getTime() - Date.now()) / 1000); // in seconds

    // Generate a JWT for the user
    const token = jwt.sign({ email: "bloody.founder@gmail.com" }, process.env.JWT_SECRET, {
      expiresIn: jwtExpiry, // Set JWT expiration to match access token's expiry_date
    });

    // Store the JWT in a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: jwtExpiry * 1000, // in milliseconds
    });

    res.status(200).json({
      success: true,
      data: "Authorization successful! JWT stored in cookies",
    });
  } catch (err) {
    console.error("Error handling OAuth callback:", err);
    res.status(500).send("Error handling OAuth callback: " + err.message);
  }
});

// Logout route
router.post("/auth/logout", (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ error: "Error during logout" });
  }
});

// Delete account route
router.delete("/auth/delete-account", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No JWT token found" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // Delete the user document from the database
    const result = await User.deleteOne({ email: userEmail });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Clear the JWT cookie after deleting the account
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Error deleting account" });
  }
});

module.exports = router;