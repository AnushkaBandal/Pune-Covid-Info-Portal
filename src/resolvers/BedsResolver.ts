import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Beds } from "../entities/Beds";

@InputType()
export class bedsInput {
    @Field()    
    hosp_Name!: string;
  
    @Field()    
    phone_no!: string;
  
    @Field()
    address!: string;

    @Field()  
    location!: string;    
  
    @Field()
    with_oxygen!: number;
  
    @Field()
    without_oxygen!: number;
  
    @Field()
    icu!: number;
  
    @Field()
    icu_ventilator!: number;
  
    @Field()
    with_oxygen_left!: number;
  
    @Field()
    without_oxygen_left!: number;
  
    @Field()
    icu_left!: number;
  
    @Field()
    icu_ventilator_left!: number;
}

@Resolver()
export class BedsResolver {

  @Query(() => [Beds])
  async getBeds(): Promise<Beds[]> {
    return Beds.find({order: {id: 'DESC'}});
  }

  @Query(() => Beds, { nullable: true })
  post(@Arg("id") id: number): Promise<Beds | undefined> {
    return Beds.findOne(id);
  }

  @Mutation(() => Beds)
  async createBeds(
    @Arg("data") data: bedsInput,    
  ): Promise<Beds> {
    return await Beds.create({
        hosp_Name: data.hosp_Name,
        phone_no: data.phone_no,
        address: data.address,
        location: data.location,
        with_oxygen: data.with_oxygen,
        without_oxygen: data.without_oxygen,
        icu: data.icu,
        icu_ventilator: data.icu_ventilator,
        with_oxygen_left: data.with_oxygen_left,
        without_oxygen_left: data.without_oxygen_left,
        icu_left: data.icu_left,
        icu_ventilator_left: data.icu_ventilator_left,
    }).save();
  }

  @Mutation(() => Beds, { nullable: true })
  async updateBeds(
    @Arg("id") id: number,
    @Arg("hosp_name", () => String, { nullable: true }) hosp_name: string,    
  ): Promise<Beds | null> {
    const post = await Beds.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof hosp_name !== "undefined") {
      await Beds.update({id}, {hosp_Name: hosp_name});
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deleteBeds(
    @Arg("id") id: number,    
  ): Promise<boolean> {
    await Beds.delete(id);
    return true;
  }
}
