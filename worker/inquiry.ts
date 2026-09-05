/** Validates complete purchase intentions; no order or payment is created. */
export interface InquiryEnv {RESEND_API_KEY?: string; INQUIRY_FROM?: string}
const SKUS=new Set(['W3975S00042','W5885P548263','W3975P502469','W3975P437947','W3975P484393','W3975P519663']);
const error=(status:number)=>Response.json({error:status===400?'invalid_inquiry':'inquiry_unavailable'},{status});
const clean=(v:unknown,max:number,required=false)=>{if(v===undefined&&!required)return '';if(typeof v!=='string'||v.length>max||(required&&!v.trim()))throw Error('invalid');return v.trim()};
export async function handleInquiry(request:Request,env:InquiryEnv,send:typeof fetch=fetch):Promise<Response>{
 if(request.method!=='POST')return Response.json({error:'method_not_allowed'},{status:405,headers:{Allow:'POST'}});
 if(request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return error(403);
 let data:Record<string,unknown>;let entries:string[];let email:string;let purpose:string;
 try{
  if(Number(request.headers.get('content-length'))>20000)return error(413);
  const body=await request.text();if(body.length>20000)return error(413);data=JSON.parse(body);
  if(!data||typeof data!=='object'||Array.isArray(data))return error(400);
  email=clean(data.email,320,true);if(!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||/[\r\n]/.test(email))return error(400);
  purpose=clean(data.purpose,40)||'wholesale';if(!['personal','wholesale','design','dealer','agent','retailer','project'].includes(purpose))return error(400);
  let lines:string[]=[];
  if(data.items!==undefined){if(!Array.isArray(data.items)||data.items.length<1||data.items.length>6)return error(400);const seen=new Set<string>();for(const item of data.items){if(!item||typeof item!=='object'||typeof item.sku!=='string'||!SKUS.has(item.sku)||seen.has(item.sku)||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>10000)return error(400);seen.add(item.sku);lines.push(`${item.sku} | Quantity: ${item.quantity}`)}}
  else {const product=clean(data.product,200,true);const quantity=clean(data.quantity,80);lines=[`${product} | Quantity: ${quantity||'Not specified'}`]}
  const company=clean(data.company,160),country=clean(data.country,100),message=clean(data.message,3000),language=clean(data.language,20),contact=clean(data.contact,160);
  const channel=clean(data.channel,20)||'email';if(!['email','whatsapp'].includes(channel))return error(400);
  if(data.items&&(!country||(['dealer','agent','retailer','project'].includes(purpose)&&!company)||(channel==='whatsapp'&&!contact)))return error(400);
  entries=['Tessilo purchase inquiry — not a confirmed order',`Purpose: ${purpose}`,`Company: ${company}`,`Country / market: ${country}`,`Reply email: ${email}`,`Preferred contact: ${channel} ${contact}`,`Language: ${language}`,'Products:',...lines,`Notes: ${message}`];
 }catch{return error(400)}
 if(!env.RESEND_API_KEY||!env.INQUIRY_FROM)return error(503);
 try {const response=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.INQUIRY_FROM,to:['leo@digitauro.com'],reply_to:email,subject:`Tessilo purchase inquiry — ${purpose}`,text:entries.join('\n')}),signal:AbortSignal.timeout(15000)});if(!response.ok)return error(502);const result=await response.json() as {id?:string};if(!result.id)return error(502);return Response.json({ok:true});}catch{return error(502)}
}
