export async function GET() {
  const content = `google.com, pub-7211777208376091, DIRECT, f08c47fec0942fa0`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
