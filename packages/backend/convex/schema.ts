import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  npmPackageVersions: defineTable({
    name: v.string(),
    updatedAt: v.number(),
    version: v.string(),
  }).index("name", ["name"]),
});
