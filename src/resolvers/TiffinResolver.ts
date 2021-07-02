import { Tiffin } from "../entities/Tiffin";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
export class TiffinInput {
  @Field()
  provider_name!: string;

  @Field()
  phone_no!: string;

  @Field()
  address!: string;

  @Field()
  price!: string;

  @Field()
  delivery!: string;

  @Field()
  food!: string;
}

@Resolver()
export class TiffinResolver {

  @Query(() => [Tiffin])
  async getTiffin(): Promise<Tiffin[]> {
    return Tiffin.find({order: {id: 'DESC'}});
  }

  @Query(() => Tiffin, { nullable: true })
  async getTiffinById(@Arg("id") id: number): Promise<Tiffin | undefined> {
    return Tiffin.findOne(id);
  }

  @Mutation(() => Tiffin)
  async createTiffin(
    @Arg("data") data: TiffinInput,    
  ): Promise<Tiffin> {
    return await Tiffin.create({
        provider_name: data.provider_name,
        phone_no: data.phone_no,
        address: data.address,
        price: data.price,
        delivery: data.delivery,
        food: data.food
    }).save();
  }

  @Mutation(() => Tiffin, { nullable: true })
  async updateTiffin(
    @Arg("id") id: number,
    @Arg("provider_name", () => String, { nullable: true }) provider_name: string,    
  ): Promise<Tiffin | null> {
    const data = await Tiffin.findOne(id);
    if (!data) {
      return null;
    }
    if (typeof provider_name !== "undefined") {
      await Tiffin.update({id}, {provider_name: provider_name});
    }
    return data;
  }

  @Mutation(() => Boolean)
  async deleteTiffin(
    @Arg("id") id: number,    
  ): Promise<boolean> {
    await Tiffin.delete(id);
    return true;
  }
}
