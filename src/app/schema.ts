import { z } from "zod";

export const outputSchema = z.object({
  summary: z.object({
    summary: z.string().describe("The summary of the book"),
    bulletpoints: z.array(z.string()).describe("A list of bulletpoints"),
    funfacts: z.array(z.string()).describe("A list of fun facts"),
    info: z.object({
      author: z.object({
        name: z.string().describe("The name of the author"),
        description: z.string().describe("The short description of the author"),
      }),
    }),
  }),
});
