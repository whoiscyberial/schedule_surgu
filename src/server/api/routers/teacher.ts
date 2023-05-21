import { z } from "zod";

import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

export const teacherRouter = createTRPCRouter({
  add: adminProcedure
    .input(
      z.object({
        fullName: z.string(),
        job: z.string().optional(),
        email: z.string().email().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.teacher.create({
        data: {
          fullName: input.fullName,
          job: input.job,
          email: input.email,
          description: input.description,
        },
      });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }).required())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.teacher.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }).required())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.teacher.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.teacher.findMany();
  }),
});
