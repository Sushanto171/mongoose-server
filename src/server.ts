import { Server } from "http";
import app from "./app";
import { connectMongoose } from "./config/mongoose.config";

const port = 5000;

interface Bootstrap {
  (): Promise<void>;
}

let server: Server;
const bootstrap: Bootstrap = async (): Promise<void> => {
  await connectMongoose();
  server = app.listen(port, (): void => {
    console.log(`✅ Server listening to url: http://localhost:${port}`);
  });
};

bootstrap();
