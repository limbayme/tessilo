"use client";
import type { ShopifyLaunchProduct } from "./shopify";

export default function ARButton({product,label}:{product?:ShopifyLaunchProduct;label:string}){
  const sources=product?.model?.sources||[];
  const usdz=sources.find(source=>source.format?.toLowerCase()==='usdz'||source.mimeType?.includes('usdz'));
  const glb=sources.find(source=>source.format?.toLowerCase()==='glb'||source.mimeType?.includes('gltf'));
  const source=usdz||glb;
  if(!source)return null;
  return <a className="ar-button" href={source.url} rel={usdz?'ar noreferrer':'noreferrer'} target={usdz?undefined:'_blank'}><span className="ar-icon">⌗</span><span>{label}<small>AR / actual scale</small></span><span>↗</span></a>;
}
