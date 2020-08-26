import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if (roomId === undefined) {
                // create room
                if (user.id !== toId) {
                    room = await prisma
                        .createRoom({
                            participants: {
                                connect: [
                                    {
                                        id: toId,
                                    },
                                    {
                                        id: user.id,
                                    },
                                ],
                            },
                        })
                        .$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if (!room) {
                throw Error("room not found");
            }
            const getTo = room.participants.filter((participants) => participants.id !== user.id)[0];
            const newMessage = await prisma.createMessage({
                text: message,
                from: {
                    connect: {
                        id: user.id,
                    },
                },
                to: {
                    connect: {
                        id: getTo.id,
                    },
                },
                room: {
                    connect: {
                        id: room.id,
                    },
                },
            });
            return newMessage;
        },
    },
};
