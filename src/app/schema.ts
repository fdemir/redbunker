import { z } from "zod";

export const outputSchema = z.object({
  summary: z.object({
    bulletpoints: z.array(z.string()).describe("A list of bulletpoints"),
    summary: z.string().describe("The summary of the book"),
    info: z.object({
      author: z.object({
        name: z.string().describe("The name of the author"),
        description: z.string().describe("The short description of the author"),
      }),
    }),
  }),
});
