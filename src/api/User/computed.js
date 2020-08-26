import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                const exitst = await prisma.$exists.user({ AND: [{ id: user.id }, { followers_some: { id: parentId } }] });
                return exitst;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        },
    },
};
