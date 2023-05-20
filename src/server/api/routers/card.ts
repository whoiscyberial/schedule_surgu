import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "../trpc";

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cards = await ctx.prisma.lesson.findMany();
    return cards;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }).required())
    .query(async ({ input, ctx }) => {
      const card = await ctx.prisma.card.findUnique({
        where: { id: input.id },
      });
      return card;
    }),

  create: adminProcedure
    .input(
      z
        .object({
          title: z.string(),
          description: z.string(),
          price: z.string(),
          imageSources: z.string(),
          videoSource: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.card.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          imageSources: input.imageSources,
          videoSource: input.videoSource,
        },
      });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }).required())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.card.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
