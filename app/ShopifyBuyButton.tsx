"use client";
import { useState } from "react";
import { startShopifyCheckout, type ShopifyLaunchProduct } from "./shopify";

export default function ShopifyBuyButton({ product, quantity = 1, label = "Buy now", unavailableLabel = "Notify me" }: { product?: ShopifyLaunchProduct; quantity?: number; label?: string; unavailableLabel?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  if (!product) return null;
  const buy = async () => {
    if (!product.availableForSale || state === "loading") return;
    setState("loading");
    try { await startShopifyCheckout(product.variantId, quantity); }
    catch { setState("error"); }
  };
  return <div className="shopify-buy-wrap">
    <button className="button shopify-buy" disabled={!product.availableForSale || state === "loading"} onClick={buy}>
      {!product.availableForSale ? unavailableLabel : state === "loading" ? "Opening checkout…" : label} <span>↗</span>
    </button>
    {state === "error" && <small role="status">Checkout is temporarily unavailable. Please request a quote below.</small>}
  </div>;
}
