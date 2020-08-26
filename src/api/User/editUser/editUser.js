import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { username, email, firstName, lastName, bio } = args;
            const { user } = request;
            // you dont need to await on return code
            return prisma.updateUser({
                where: { id: user.id },
                data: {
                    username,
                    email,
                    firstName,
                    lastName,
                    bio,
                },
            });
        },
    },
};
