"use client";

import { MapPin } from 'lucide-react';

export function GoogleMapPlaceholder() {
  return (
    <div className="w-full h-64 bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4 border border-dashed">
        <MapPin className="w-12 h-12 text-muted-foreground mb-2" />
        <h3 className="font-semibold text-lg">Google Maps Placeholder</h3>
        <p className="text-sm text-muted-foreground">Location selection will appear here.</p>
    </div>
  );
}
