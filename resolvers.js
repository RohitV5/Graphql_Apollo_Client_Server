import pc from "@prisma/client";
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new pc.PrismaClient();

const resolvers = {
  Query: {
    users: async (_, _args, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in");
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        where: { id: { not: userId } },
      });
      return users;
    },
    messagesByUser: async (_, { receiverId }, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in");
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: userId,
              receiverId: receiverId,
            },
            {
              senderId: receiverId,
              receiverId: userId,
            },
          ],          
        },
        orderBy:{
            createdAt:"asc"
        }
      });
      return messages
    },
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
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
    signinUser: async (_, { userSignin }) => {
      const user = await prisma.user.findUnique({
        where: { email: userSignin.email },
      });
      if (!user)
        throw new AuthenticationError("User does not exist with that email");
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) throw new AuthenticationError("Password is incorrect");
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token };
    },
    createMessage: async (_, { receiverId, text }, { userId }) => {
      if (!userId) throw new ForbiddenError("You must be logged in");
      const message = await prisma.message.create({
        data: {
          text,
          receiverId,
          senderId: userId,
        },
      });
      return message;
    },
  },
};

export default resolvers;
