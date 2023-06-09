import isDogPresent from "./is-dog-present";
import { ApolloError } from "apollo-server-express";

const resolvers = {
  Query: {
    isDogPresent: async function (
      _: any,
      { url: imageUrl }: { url: string }
    ): Promise<boolean> {

      const dogPresenceStringResponse = String(await isDogPresent(imageUrl)).toLowerCase();

      const isAppropriateResponse = ( 
        dogPresenceStringResponse === "true" ||
        dogPresenceStringResponse === "false"   
      )

      if(imageUrl.trim() === ""){
        throw new ApolloError("image url cannot be empty");
      }
      
      if(!isAppropriateResponse){
        throw new ApolloError(`Silly AI Response with ${dogPresenceStringResponse} instead of true or false  :(`) 
      }
      
      const isDogPresentInImage = dogPresenceStringResponse === "true";
      
      return isDogPresentInImage;
    },
  },
};

export default resolvers;