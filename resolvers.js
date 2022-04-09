import pc from "@prisma/client";
import { ApolloError, AuthenticationError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new pc.PrismaClient();


const resolvers = {
  Query: {},
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({ where: { email: userNew.email } });
      console.log(user)
      if (user)
        throw new AuthenticationError("User already exists with this email");
      const hashedPassword = await bcrypt.hash(userNew.password, 10);
      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },
    signinUser: async (_,{userSignin}) =>{
        const user = await prisma.user.findUnique({where:{email:userSignin.email}})
        if(!user) throw new AuthenticationError("User does not exist with that email");
        const doMatch = await bcrypt.compare(userSignin.password,user.password);
        if(!doMatch) throw new AuthenticationError("Password is incorrect");
        const token = jwt.sign({userId:user.id},process.env.JWT_SECRET)
        return {token}

    }
  },
};

export default resolvers;
