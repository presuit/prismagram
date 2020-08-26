import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            isAuthenticated(request);
            const { postId } = args;
            const { user } = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id,
                        },
                    },
                    {
                        post: {
                            id: postId,
                        },
                    },
                ],
            };
            try {
                const existingLike = await prisma.$exists.like(filterOptions);
                if (existingLike) {
                    // todo : delete Like
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    // create like
                    const newLike = await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                        post: {
                            connect: {
                                id: postId,
                            },
                        },
                    });
                }
            } catch (error) {
                console.log(error);
            }
            return true;
        },
    },
};
