import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import {createConnection} from 'typeorm';
import cors from "cors";
import dotenv from "dotenv";
import { Beds } from "./entities/Beds";
import { Plasma } from "./entities/Plasma";
import { RATCenter } from "./entities/RATCenter";
import { Tiffin } from "./entities/Tiffin";
import { BedsResolver } from "./resolvers/BedsResolver";
import { PlasmaResolver } from "./resolvers/PlasmaResolver";
import { RATCenterResolver } from "./resolvers/RATCenterResolver";
import { TiffinResolver } from "./resolvers/TiffinResolver";
dotenv.config();

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'covidinfo',
    username: 'kishorshivsharan',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [Beds, Plasma, RATCenter, Tiffin]
  });
  
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, //cookie only works in https
      },
      saveUninitialized: false,
      secret: "huifewuoaf9ryifnsdoisdf",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BedsResolver, PlasmaResolver, RATCenterResolver, TiffinResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.SERVER_DOMAIN_PORT, () => {
    console.log("server started localhost:4001");
  });
};

main().catch((err) => {
  console.log(err);
});