import express from "express"
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await signupModal.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found. Please sign up first." });
      }
  
      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password. Please try again." });
      }
  
      // Generate a new token for the session
      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Update the token in database
      user.token = token;
      await user.save();
  
      res.json({ message: "Login successful!", user, token });
  
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Error occurred while logging in" });
    }
  });
  