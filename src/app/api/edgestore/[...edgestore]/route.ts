
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';
import { createEdgeStoreServerClient } from '@edgestore/server/core';

const es = initEdgeStore.create();

/**
 * This is the main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket()
    .input(
      z.object({
        type: z.string(),
      }),
    )
    // e.g. /publicFiles/{type}/{fileName}
    .path(({ input }) => [{ type: input.type }])
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
