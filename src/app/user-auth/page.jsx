"use client";

import React, { Suspense } from "react";
import AuthContent from "./AuthContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
