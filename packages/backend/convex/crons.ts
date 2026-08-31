import { cronJobs } from "convex/server";
import { v } from "convex/values";

import { internal } from "./_generated/api";
import { internalAction, internalMutation, query } from "./_generated/server";
import { ossStats } from "./ossStats";

const PACKAGE_NAME = "@nest-arch/tui";

export const syncStars = internalAction(async (ctx) => {
  await ossStats.sync(ctx);
});

export const writePackageVersion = internalMutation({
  args: {
    name: v.string(),
    version: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("npmPackageVersions")
      .withIndex("name", (q) => q.eq("name", args.name))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        version: args.version,
        updatedAt: Date.now(),
      });
      return;
    }

    await ctx.db.insert("npmPackageVersions", {
      name: args.name,
      version: args.version,
      updatedAt: Date.now(),
    });
  },
});

export const syncPackageVersion = internalAction({
  args: {},
  handler: async (ctx) => {
    const response = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(PACKAGE_NAME)}`
    );

    if (!response.ok) {
      throw new Error(
        `No se pudo consultar ${PACKAGE_NAME} desde npm (${response.status})`
      );
    }

    const data = (await response.json()) as {
      "dist-tags"?: {
        latest?: string;
      };
    };

    const version = data["dist-tags"]?.latest;

    if (!version) {
      throw new Error(`No se encontró la versión latest de ${PACKAGE_NAME}`);
    }

    await ctx.runMutation(internal.crons.writePackageVersion, {
      name: PACKAGE_NAME,
      version,
    });
  },
});

export const getLatestNpmPackageVersion = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      name: v.string(),
      version: v.string(),
      updatedAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    const record = await ctx.db
      .query("npmPackageVersions")
      .withIndex("name", (q) => q.eq("name", PACKAGE_NAME))
      .unique();

    if (!record) {
      return null;
    }

    return {
      name: record.name,
      version: record.version,
      updatedAt: record.updatedAt,
    };
  },
});

const crons = cronJobs();

crons.interval(
  "syncPackageVersionJob",
  { hours: 6 },
  internal.crons.syncPackageVersion,
  {}
);

export default crons;
