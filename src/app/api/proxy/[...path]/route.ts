import { NextRequest, NextResponse } from 'next/server';

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
  const origin = req.headers.get('origin') || '*';
  const apiKey = req.headers.get('x-api-key') || '';
  const endpoint = '/' + pathSegments.join('/');
  
  if (!apiKey) {
    return NextResponse.json(
      { durum: 0, aciklama: 'X-API-KEY header missing' }, 
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    );
  }

  // Target Armoyu API host
  const targetHost = 'https://api.aramizdakioyuncu.com';
  
  // Prevent double /botlar/[apiKey] prefixing
  let targetUrl;
  if (endpoint.startsWith(`/botlar/${apiKey}`)) {
    targetUrl = `${targetHost}${endpoint}`;
  } else {
    targetUrl = `${targetHost}/botlar/${apiKey}${endpoint}`;
  }

  const method = req.method;
  const headers = new Headers();
  
  // Helper to safely set headers and avoid ISO-8859-1 errors
  const safeSetHeader = (key: string, value: string) => {
    if (!value) return;
    const isAscii = /^[ -~]*$/.test(value);
    if (isAscii) {
      headers.set(key, value);
    } else {
      console.warn(`[Proxy] Skipping header ${key} due to non-ASCII characters`);
    }
  };

  // Whitelist of headers to forward
  const allowedHeaders = ['authorization', 'content-type', 'x-api-key', 'accept', 'user-agent', 'x-requested-with'];
  
  req.headers.forEach((value, key) => {
    if (allowedHeaders.includes(key.toLowerCase())) {
      safeSetHeader(key, value);
    }
  });

  if (apiKey) {
    safeSetHeader('X-API-KEY', apiKey);
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
        }
      } catch (bodyError: any) {
        console.warn(`[Proxy] Body read warning: ${bodyError.message}`);
      }
    }

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
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
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
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      }
    });
  }
}
