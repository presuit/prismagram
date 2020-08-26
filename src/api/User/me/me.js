import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const u = await prisma.user({ id: user.id });
            const p = await prisma.user({ id: user.id }).posts();
            return { user: u, posts: p };
        },
    },
};
