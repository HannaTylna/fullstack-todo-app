import { Credentials } from "@fullstack-todo-app/shared";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { loadUserByUsername, IUser } from "../models/user-repository";

const secret: string = process.env.TOKEN_SECRET || "isfbofbowäeifbenlkscxzndoewihfndslkcnqwoådjlasndåowjlsdowqdwiodn";
const JWT_COOKIE_NAME = "jwt";

export type TokenPayload = {
    sub: string;
    name: string;
    role: string[];
};

export interface JwtRequest<T> extends Request<T> {
    jwt?: TokenPayload;
}

export const authenticateToken = ( req: JwtRequest<any>, res: Response, next: NextFunction ) => {
    const token: string | undefined = req.header("authorization")?.split(" ")[1];

    if (token) {
        try {
            const decoded = jsonwebtoken.verify(token, secret) as TokenPayload;
            req.jwt = decoded;
        } catch (err) {
            return res.sendStatus(403) //Bad token
        }
    } else {
        return res.sendStatus(401) //No token, unauthorized
    }
    next();
}

export const loginUser = async (req: JwtRequest<Credentials>, res: Response<string>) => {
    const credentials = req.body;
    const userInfo = await performUserAuthentication(credentials);
    if (!userInfo) {
        return res.sendStatus(403);
    }
    console.log("Got credentials: ", credentials)
    const token = jsonwebtoken.sign({ sub: userInfo.username, name: userInfo.name, roles: userInfo.roles }, secret, { expiresIn: "1800s" });
    res.send(token);
    return res.sendStatus(200);
}

const performUserAuthentication = async (credentials: Credentials): Promise<IUser | null> => {
    const userInfo = await loadUserByUsername(credentials.username);
    return userInfo
}