import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        isLiked: async (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({ AND: [{ user: { id: user.id } }, { post: { id } }] });
        },
        likeCount: (parent) =>
            prisma
                .likesConnection({ where: { post: { id: parent.id } } })
                .aggregate()
                .count(),
        files: (parent) => {
            const { id } = parent;
            return prisma.post({ id }).files();
        },
        user: (parent) => {
            const { id } = parent;
            return prisma.post({ id }).user();
        },
        likes: (parent) => {
            const { id } = parent;
            return prisma.post({ id }).likes();
        },
        comments: (parent) => {
            const { id } = parent;
            return prisma.post({ id }).comments();
        },
    },
};
