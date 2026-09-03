import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  description:
    "Powerful CLI and interactive TUI generator for building opinionated, production-ready NestJS applications and microservices.",
  title: "Nest Arch — Scaffold Smarter. Ship Faster.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) =>
  children;

export default RootLayout;
