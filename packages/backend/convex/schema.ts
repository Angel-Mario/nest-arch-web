import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  npmPackageVersions: defineTable({
    name: v.string(),
    version: v.string(),
    updatedAt: v.number(),
  }).index("name", ["name"]),
});
