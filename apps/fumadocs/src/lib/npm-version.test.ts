import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";

import { getLatestNpmVersion } from "./npm-version";

afterEach(() => {
  mock.restoreAll();
});

test("reads npm latest with a six-hour cache and a request timeout", async () => {
  const fetchMock = mock.method(
    globalThis,
    "fetch",
    async (
      _url: string,
      options: RequestInit & { next?: { revalidate: number } }
    ) => {
      assert.equal(_url, "https://registry.npmjs.org/@nest-arch%2Ftui/latest");
      assert.equal(options.next?.revalidate, 21_600);
      assert.ok(options.signal instanceof AbortSignal);
      return Response.json({ name: "@nest-arch/tui", version: "0.5.2" });
    }
  );

  assert.equal(await getLatestNpmVersion(), "0.5.2");
  assert.equal(fetchMock.mock.callCount(), 1);
});

test("keeps documentation available when npm fails", async () => {
  mock.method(globalThis, "fetch", async () => {
    throw new Error("Registry unavailable");
  });

  assert.equal(await getLatestNpmVersion(), null);
});

test("rejects HTTP errors and unexpected package metadata", async () => {
  const invalidResponses = [
    new Response(null, { status: 503 }),
    Response.json(null),
    Response.json({ name: "another-package", version: "1.0.0" }),
    Response.json({ name: "@nest-arch/tui", version: "0.6.0-beta.1" }),
    Response.json({ name: "@nest-arch/tui", version: 5 }),
    new Response("invalid JSON"),
  ];

  for (const response of invalidResponses) {
    mock.method(globalThis, "fetch", async () => response);
    assert.equal(await getLatestNpmVersion(), null);
    mock.restoreAll();
  }
});
