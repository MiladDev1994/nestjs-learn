import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision',
}

class EnvironmentVariables {

    @IsEnum(Environment)
    NODE_ENV: Environment

    @IsNumber()
    PORT: number;

    @IsNumber()
    DB_PORT: number;

    @IsString()
    DB_HOST: string;
    
    @IsString()
    USERNAME: string;
    
    @IsString()
    PASSWORD: string;
    
    @IsString()
    DB_NAME: string;
    
    @IsString()
    SECRET: string;
}

export function validate(config: Record<string, unknown>) {
    // console.log("config ", config);
    const validateConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true
    })
    // console.log(validateConfig);

    const errors = validateSync(validateConfig, {
        skipMissingProperties: false
    })

    if (errors.length > 0) {
        // console.log(errors);
    }
    return validateConfig
}