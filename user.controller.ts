import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { Controller, Post } from "@danet/core";
import { Tag } from "@danet/swagger/decorators";
import { Body, ReturnedSchema } from "@danet/zod";
import { z } from "zod";

extendZodWithOpenApi(z);

export const User = z
	.object({
		id: z.string(),
		name: z.string().min(1).max(255),
		email: z.string().email().min(1).max(255)
	})
	.openapi({ title: "User" });
export type User = z.infer<typeof User>;

export const CreateUser = User.omit({ id: true }).openapi({
	title: "Create User"
});
export type CreateUser = z.infer<typeof CreateUser>;

@Tag("User")
@Controller("/user")
export class UserController {
	@ReturnedSchema(User)
	@Post()
	async create(@Body(CreateUser) user: CreateUser) {
		return user;
	}
}
