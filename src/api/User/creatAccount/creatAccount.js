import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        creatAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio } = args;
            const user = await prisma.createUser({ username, email, firstName, lastName, bio });
            return user;
        },
    },
};
