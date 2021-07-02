import {
    Resolver,
    Mutation,
    Arg,
    Field,
    Ctx,
    ObjectType,
    Query,
  } from "type-graphql";
  import { MyContext } from "../types";
  import { Admin } from "../entities/Admin";
import { COOKIE_NAME } from "../constants";
  
  @ObjectType()
  class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
  }

  export class UsernamePasswordInput {
    @Field()
    email: string;
    @Field()
    username: string;
    @Field()
    password: string;
  }
  
  @ObjectType()
  class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
  
    @Field(() => Admin, { nullable: true })
    user?: Admin;
  }
  
  @Resolver(Admin)
  export class AdminResolver {
      
    @Query(() => Admin, { nullable: true })
    me(@Ctx() { req }: MyContext) {
      // you are not logged in
      if (!req.session.userId) {
        return null;
      }
  
      return Admin.findOne(req.session.userId);
    }
  
    @Mutation(() => UserResponse)
    async login(
      @Arg("username") username: string,
      @Arg("password") password: string,
      @Ctx() { req }: MyContext
    ): Promise<UserResponse> {

      const user = await Admin.findOne(                  
          { where: { username: username } }
      );
      if (!user) {
        return {
          errors: [
            {
              field: "username",
              message: "that username doesn't exist",
            },
          ],
        };
      }
      if (user.password!=password) {
        return {
          errors: [
            {
              field: "password",
              message: "incorrect password",
            },
          ],
        };
      }
  
      req.session.userId = user.id;
  
      return {
        user,
      };
    }
  
    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
      return new Promise((resolve) =>
        req.session.destroy((err) => {
          res.clearCookie(COOKIE_NAME);
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }
  
          resolve(true);
        })
      );
    }
  }