let latestData = { distance1: null, distance2: null ,distance3: null};

export async function POST(request) {
  const body = await request.json();
  latestData = {
    distance1: body.distance1,
    distance2: body.distance2,
    distance3: body.distance3
  };
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function GET() {
  return new Response(JSON.stringify(latestData), { status: 200 });
}
