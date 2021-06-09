import { RATCenter } from "../entities/RATCenter";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class RATCenterInput {
  @Field()
  hosp_Name!: string;

  @Field()
  location!: string;

  @Field()
  address!: string;
}

@Resolver()
export class RATCenterResolver {

  @Query(() => [RATCenter])
  async getRATCenter(): Promise<RATCenter[]> {
    return RATCenter.find();
  }

  @Query(() => RATCenter, { nullable: true })
  async getRATCenterById(@Arg("id") id: number): Promise<RATCenter | undefined> {
    return RATCenter.findOne(id);
  }

  @Mutation(() => RATCenter)
  async createRATCenter(
    @Arg("data") data: RATCenterInput,    
  ): Promise<RATCenter> {
    return await RATCenter.create({
        hosp_Name: data.hosp_Name,
        location: data.location,
        address: data.address
    }).save();
  }

  @Mutation(() => RATCenter, { nullable: true })
  async updateRATCenter(
    @Arg("id") id: number,
    @Arg("address", () => String, { nullable: true }) address: string,
    @Arg("location", () => String, { nullable: true }) location: string,    
  ): Promise<RATCenter | null> {
    const data = await RATCenter.findOne(id);
    if (!data) {
      return null;
    }
    if (typeof address !== "undefined") {
      await RATCenter.update({id}, {address: address, location: location});
    }
    return data;
  }

  @Mutation(() => Boolean)
  async deleteRATCenter(
    @Arg("id") id: number,    
  ): Promise<boolean> {
    await RATCenter.delete(id);
    return true;
  }
}
