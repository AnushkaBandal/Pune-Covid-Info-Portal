import { Plasma } from "../entities/Plasma";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class PlasmaInput {
  @Field()  
  hosp_Name!: string;

  @Field()  
  phone_no!: string;

  @Field()  
  mail_id!: string;

  @Field()
  location!: string;

  @Field()  
  address!: string;
}

@Resolver()
export class PlasmaResolver {

  @Query(() => [Plasma])
  async getPlasma(): Promise<Plasma[]> {
    return Plasma.find({order: {id: 'DESC'}});
  }

  @Query(() => Plasma, { nullable: true })
  async getPlasmaById(@Arg("id") id: number): Promise<Plasma | undefined> {
    return Plasma.findOne(id);
  }

  @Mutation(() => Plasma)
  async createPlasma(
    @Arg("data") data: PlasmaInput,    
  ): Promise<Plasma> {
    return await Plasma.create({
        hosp_Name: data.hosp_Name,
        phone_no: data.phone_no,
        mail_id: data.mail_id,
        location: data.location,
        address: data.address
    }).save();
  }

  @Mutation(() => Plasma, { nullable: true })
  async updatePlasma(
    @Arg("id") id: number,
    @Arg("hosp_name", () => String, { nullable: true }) hosp_name: string,    
  ): Promise<Plasma | null> {
    const post = await Plasma.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof hosp_name !== "undefined") {
      await Plasma.update({id}, {hosp_Name: hosp_name});
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePlasma(
    @Arg("id") id: number,    
  ): Promise<boolean> {
    await Plasma.delete(id);
    return true;
  }
}
