import { Request, Response, NextFunction, RequestHandler } from 'express';

declare global {
  namespace Express {
    interface Request {
      validatedNumber: number;
      validatedBoolean: boolean;
    }
  }
}


export const validateNumberParam = (paramName: string): RequestHandler => {
  console.log('calling validateNumberParam with paramName', paramName);
  const validator: RequestHandler = (req, res, next) => {
    console.log('now i\'m inside validator number', req.body);
    const errorResponse = () => res.status(400).json({ error: 'Invalid number param' });
    const value = req.params.paramName;
    const trimmed: string = value.trim();
    const number = Number(trimmed);
    if (trimmed === '' || Number.isNaN(number)) {
      errorResponse();
      return;
    }
    req.validatedNumber = number;
    next();
  };
  return validator;
};


export const validateBooleanQueryParam = (paramName: string): RequestHandler => {
  console.log('calling validateBooleanQueryParamWithParamWithParamName', paramName);
  const validator: RequestHandler = (req, res, next) => {
    console.log('now i\'m inside validator boolean', req.body);
    const errorResponse = () => res.status(400).json({ error: 'Invalid boolean query param' });
    const value = req.query.paramName;
    if (typeof (value) !== 'string') {
      errorResponse();
      return;
    }
    const trimmed: string = value.trim().toLowerCase();
    let converted: boolean;
    if (trimmed === 'true') {
      converted = true;
    } else if (trimmed === 'false') {
      converted = false;
    } else {
      errorResponse();
      return;
    }
    req.validatedBoolean = converted;
    next();
  };
  return validator;
};