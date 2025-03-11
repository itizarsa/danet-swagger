import { DanetApplication } from "@danet/core";
import { SpecBuilder, SwaggerModule } from "@danet/swagger";
import { AppModule } from "./app.module.ts";

export const bootstrap = async () => {
	const app = new DanetApplication();

	await app.init(AppModule);

	const spec = new SpecBuilder()
		.setTitle("API")
		.setDescription("The API")
		.setVersion("1.0")
		.build();

	const document = await SwaggerModule.createDocument(app, spec);

	app.router.get("/docs/json", (ctx, _) => ctx.json(document));

	await app.listen(7777);
};

bootstrap();
