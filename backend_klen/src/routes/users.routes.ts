import { Request, Response, NextFunction, Router } from "express";
import { authUser, createUser } from "../db/database.js";

const router = Router();

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });

      return;
    }

    const queryResult = await authUser(username);

    if (queryResult.length === 0) {
      res.status(401).json({
        success: false,
        message: "User is not registered.",
      });

      return;
    }

    const user = queryResult[0];

    if (password !== user.user_password) {
      res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });

      return;
    }

    req.session.user = {
      id: user.id,
      username: user.user_name,
      email: user.user_email,
    };

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        username: user.user_name,
        email: user.user_email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body as {
      username?: string;
      email?: string;
      password?: string;
    };

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Username, email and password are required.",
      });

      return;
    }

    const queryResult = await createUser(username, email, password);

    if (queryResult.affectedRows === 1) {
      res.status(201).json({
        success: true,
        message: "User registered.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "User was not registered.",
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (
  req: Request,
  res: Response
) => {
  if (!req.session.user) {
    res.status(200).json({
      loggedIn: false,
      user: null,
    });

    return;
  }

  res.status(200).json({
    loggedIn: true,
    user: req.session.user,
  });
};

const logoutUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
      return;
    }

    res.clearCookie("connect.sid");

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  });
};

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", getCurrentUser);
router.post("/logout", logoutUser);

export default router;
