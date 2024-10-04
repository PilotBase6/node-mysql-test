import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import type {
    IUpdateUserService,
    IUpdateUserServiceRequest,
    IUpdateUserServiceResponse,
    IUpdateUserServiceDataResponseData,
} from "src/core/users/IUpdateUserService";
import { SedeRepository } from "src/repositories/sede.repository";
import { UserRepository } from "src/repositories/user.repository";
import { UserValidations } from "src/services/users/UserValidations";

@Injectable()
export class UpdateUserService implements IUpdateUserService {
    public constructor(
        private readonly userValidations: UserValidations,
        private readonly userModel: UserRepository,
        private readonly sedeRepository: SedeRepository,
    ) {}

    public ExecuteAsync = async (
        request: IUpdateUserServiceRequest,
    ): Promise<IUpdateUserServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new UpdateUserServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const user = await this.userModel.GetByEmail(request.Email);
        const sede = await this.sedeRepository.GetByName(request.Sede.toLowerCase());

        user.name = request.Name;
        user.password = request.Password;
        user.sede = sede;
        user.updatedAt = new Date();

        await this.userModel.Update(user);

        return new UpdateUserServiceResponse({
            Message: "User information updated",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: IUpdateUserServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const emailErrors: string[] = await this.userValidations.EmailIsValidAsync(request.Email);
        const passwordErrors: string[] = this.userValidations.PasswordIsValid(request.Password);

        if (emailErrors.length > 0) {
            errors.push(...emailErrors);
        }
        if (!request.Email) {
            errors.push("Email is required");
        }
        if (!request.Name) {
            errors.push("Name is required");
        }
        if (!request.Password) {
            errors.push("Password is required");
        }
        if (passwordErrors.length > 0) {
            errors.push(...passwordErrors);
        }

        return errors;
    };
}

export class UpdateUserServiceRequest implements IUpdateUserServiceRequest {
    @ApiProperty()
    public Name!: string;
    @ApiProperty()
    public Email!: string;
    @ApiProperty()
    public Password!: string;
    @ApiProperty()
    public Sede!: string;
}

export class UpdateUserServiceDataResponseData implements IUpdateUserServiceDataResponseData {}

export class UpdateUserServiceResponse implements IUpdateUserServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: UpdateUserServiceDataResponseData;

    public constructor(data: IUpdateUserServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
    }
}
