import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {products} from '../../catalog';
import ProductClient from '../../ProductClient';
export async function generateMetadata({params}:{params:Promise<{sku:string}>}):Promise<Metadata>{const {sku}=await params;const p=products.find(p=>p.sku===sku);if(!p)return {title:'Product not found — Tessilo'};return {title:`${p.name} · ${p.sku} — Tessilo`,description:`${p.subtitle}. ${p.description} Explore dimensions, an interactive concept preview and bulk purchase inquiries.`}}
export default async function ProductPage({params}:{params:Promise<{sku:string}>}){const {sku}=await params;const p=products.find(p=>p.sku===sku);if(!p)notFound();return <ProductClient product={p}/>}
