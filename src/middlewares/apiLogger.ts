import { Request, Response, NextFunction } from "express";

export function apiLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    console.log(`[API]`, JSON.stringify(log, null, 2));
  });

  next();
}
