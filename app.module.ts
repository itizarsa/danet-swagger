import { Module } from "@danet/core";
import { UserController } from "./user.controller.ts";

@Module({
	controllers: [UserController]
})
export class AppModule {}
