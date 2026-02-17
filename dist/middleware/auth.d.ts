import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../shared/utils/jwt';
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}
export declare function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map