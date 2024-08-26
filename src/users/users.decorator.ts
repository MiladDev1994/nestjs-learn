import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.user = {
        id: 1, 
        firstName: "milad",
        lastName: "goli",
        email: "milad@gmail.com",
        password: "123456",
        enable2FA: true,
        apiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        playlists: [1, 2],
    }
    return request.user
})