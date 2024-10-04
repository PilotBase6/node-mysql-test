import { Injectable } from "@nestjs/common";
import type {
    IGetAllUserService,
    IGetAllUserServiceRequest,
    IGetAllUserServiceResponse,
    IGetAllUserServiceDataResponseData,
    IUsersInfo,
} from "src/core/users/IGetAllUserService";
import { UserValidations } from "./UserValidations";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class GetAllUserService implements IGetAllUserService {
    public constructor(
        private readonly userValidations: UserValidations,
        private readonly userModel: UserRepository
    ) {}

    public ExecuteAsync = async (): Promise<IGetAllUserServiceResponse> => {
        const validations = await this.ValidateAsync();
        if (validations.length > 0) {
            return new GetAllUserServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const users = await this.userModel.GetAll();

        const userInfo: IUsersInfo[] = users.map((user) => {
            return {
                Id: user.id.toString(),
                Name: user.name,
                Email: user.email,
                CreatedAt: user.createdAt,
                UpdatedAt: user?.updatedAt,
            };
        });

        return new GetAllUserServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
            Data: { UserInfo: userInfo },
        });
    };

    public ValidateAsync = async (): Promise<string[]> => {
        const errors: string[] = [];

        const users = await this.userModel.GetAll();

        if (users.length === 0) {
            errors.push("No users found");
        }

        return errors;
    };
}

export class GetAllUserServiceRequest implements IGetAllUserServiceRequest {}

export class GetAllUserServiceDataResponseData implements IGetAllUserServiceDataResponseData {
    public UserInfo!: IUsersInfo[];
}

export class GetAllUserServiceResponse implements IGetAllUserServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: GetAllUserServiceDataResponseData;

    public constructor(data: IGetAllUserServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
