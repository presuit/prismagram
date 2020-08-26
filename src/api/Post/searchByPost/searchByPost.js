import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchByPost: async (_, args) =>
            prisma.posts({
                where: {
                    OR: [
                        {
                            location_starts_with: args.term,
                        },
                        {
                            caption_starts_with: args.term,
                        },
                    ],
                },
            }),
    },
};
