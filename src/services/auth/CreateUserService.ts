import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import type {
    ICreateUserService,
    ICreateUserServiceRequest,
    ICreateUserServiceResponse,
    ICreateUserServiceDataResponseData,
} from "src/core/auth/ICreateUserService";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "src/repositories/user.repository";
import { UserValidations } from "src/services/users/UserValidations";
import { User } from "src/entities/user.schema";
import { SedeRepository } from "src/repositories/sede.repository";

@Injectable()
export class CreateUserService implements ICreateUserService {
    public constructor(
        private readonly userValidations: UserValidations,
        private readonly userModel: UserRepository,
        private readonly sedeRepository: SedeRepository,
    ) {}

    public ExecuteAsync = async (
        request: ICreateUserServiceRequest,
    ): Promise<ICreateUserServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new CreateUserServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const id = uuidv4();
        const sede = await this.sedeRepository.GetByName(request.Sede.toLowerCase());

        const userInstance = new User({
            id: id,
            name: request.Name,
            email: request.Email,
            password: request.Password,
            sedeId: sede.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await this.userModel.Create(userInstance);

        return new CreateUserServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: ICreateUserServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const emailErrors: string[] = await this.userValidations.EmailIsValidAsync(request.Email);
        const passwordErrors: string[] = this.userValidations.PasswordIsValid(request.Password);

        if (request.Email && emailErrors.length > 0) {
            errors.push("Email already exists");
        }

        if (passwordErrors.length > 0) {
            errors.push(...passwordErrors);
        }
        if (emailErrors.length > 0) {
            errors.push(...emailErrors);
        }
        if (!request.Email) {
            errors.push("Email is required");
        }
        if (!request.Password) {
            errors.push("Password is required");
        }
        return errors;
    };
}

export class CreateUserServiceRequest implements ICreateUserServiceRequest {
    @ApiProperty()
    public Name!: string;
    @ApiProperty()
    public Email!: string;
    @ApiProperty()
    public Password!: string;
    @ApiProperty()
    public Sede!: string;
}

export class CreateUserServiceDataResponseData implements ICreateUserServiceDataResponseData {
    public Message!: string;
}

export class CreateUserServiceResponse implements ICreateUserServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: CreateUserServiceDataResponseData;

    public constructor(data: ICreateUserServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
