import { NextRequest, NextResponse } from 'next/server';

// Fix for SELF_SIGNED_CERT_IN_CHAIN in local development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return handleProxy(req, path);
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization, Accept, User-Agent, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const apiKey = req.headers.get('x-api-key') || '';
  
  // Use raw pathname to preserve trailing slashes that Next.js pathSegments strip
  const rawPath = req.nextUrl.pathname;
  let endpoint = rawPath.replace('/api/proxy', '') || '/';

  // HEURISTIC: If the full URL ends with / (before query params), ensure endpoint does too
  const fullUrl = req.url;
  const baseUrlPart = fullUrl.split('?')[0];
  if (baseUrlPart.endsWith('/') && !endpoint.endsWith('/')) {
    endpoint += '/';
  }

  if (!apiKey) {
    return NextResponse.json(
      { durum: 0, aciklama: 'X-API-KEY header missing' },
      { status: 400 }
    );
  }

  const targetHost = 'https://api.armoyu.com';
  let targetUrl;
  if (endpoint.startsWith(`/botlar/`)) {
    targetUrl = `${targetHost}${endpoint}`;
  } else {
    targetUrl = `${targetHost}/botlar/${apiKey}${endpoint}`;
  }

  const method = req.method;
  const headers = new Headers();

  const allowedHeaders = ['authorization', 'content-type', 'x-api-key', 'accept', 'user-agent', 'x-requested-with'];
  req.headers.forEach((value, key) => {
    if (allowedHeaders.includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  if (apiKey) {
    headers.set('X-API-KEY', apiKey);
  }

  try {
    const fetchOptions: any = {
      method,
      headers,
      cache: 'no-store'
    };

    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const bodyClone = req.clone();
        const arrayBuffer = await bodyClone.arrayBuffer();
        if (arrayBuffer.byteLength > 0) {
          fetchOptions.body = arrayBuffer;
          console.log(`[Proxy] Body detected: ${arrayBuffer.byteLength} bytes`);
        }
      } catch (bodyError: any) {
        console.warn(`[Proxy] Body read warning: ${bodyError.message}`);
      }
    }

    console.log(`[Proxy] ${method} -> ${targetUrl}`);

    const response = await fetch(targetUrl, fetchOptions);
    const responseText = await response.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // If not JSON, wrap in a standard error format so the client can handle it
      responseData = {
        durum: 0,
        aciklama: responseText.substring(0, 500) || "API'den boş veya geçersiz yanıt geldi.",
        isRaw: true,
        status: response.status
      };
    }

    return NextResponse.json(responseData, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization, Accept, User-Agent, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  } catch (error: any) {
    console.error(`[Proxy Error] ${method} ${targetUrl}:`, error);
    return NextResponse.json({
      durum: 0,
      aciklama: `Proxy Error: ${error.message}`,
      targetUrl,
      error: error.stack
    }, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  }
}
