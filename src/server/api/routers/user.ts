import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAccount: protectedProcedure.query(async ({ ctx }) => {
    const vkAccount = await ctx.prisma.account.findFirst({
      where: { userId: ctx.session?.user.id, provider: "vk" },
    });
    return vkAccount;
  }),
});
