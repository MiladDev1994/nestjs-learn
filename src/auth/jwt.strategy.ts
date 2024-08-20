import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "./auth.constants";
import { payloadTypes } from "./types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstants.secret
        })
    }

    async validate(payload: payloadTypes) {
        return {
            userId: payload.userId, 
            email: payload.email, 
            artistId: payload.artistId
        }
    }
}