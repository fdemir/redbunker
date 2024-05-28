"use server";

import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { outputSchema } from "./schema";

export async function summary(input: string, language: string = "en") {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4o-2024-05-13"),
      prompt:
        `Summarry this book: ${input}. Return the output with the ${language} language.`,
      schema: outputSchema,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
