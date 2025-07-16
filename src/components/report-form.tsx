"use client";

import { useState } from "react";
import { Camera, MapPin, Loader2, Send, LocateFixed } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type LatLng = {
    lat: number;
    lng: number;
} | null;

export function ReportForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [location, setLocation] = useState<LatLng>(null);
    const { toast } = useToast();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLocationClick = () => {
        if (!navigator.geolocation) {
            toast({
                variant: "destructive",
                title: "Geolocation Not Supported",
                description: "Your browser does not support geolocation.",
            });
            return;
        }

        setIsFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsFetchingLocation(false);
                 toast({
                    title: "Location Found",
                    description: "Your current location has been successfully set.",
                });
            },
            (error) => {
                setIsFetchingLocation(false);
                toast({
                    variant: "destructive",
                    title: "Location Error",
                    description: "Could not retrieve your location. Please ensure you have granted permission.",
                });
                console.error("Geolocation error:", error);
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Submitting with location:", location, "and image:", selectedImage?.name);
        setIsSubmitting(false);
        // Reset form or redirect
    };

    return (
        <Card className="w-full max-w-2xl shadow-2xl rounded-2xl">
            <CardHeader>
                <CardTitle className="text-2xl">Report a New Issue</CardTitle>
                <CardDescription>
                    Help us improve your community by providing details about the issue.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="picture">
                            <Camera className="inline-block mr-2 h-4 w-4" />
                            Upload a Picture
                        </Label>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    <Camera className="w-8 h-8 text-muted-foreground" />
                                )}
                            </div>
                            <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="e.g., 'Large pothole on the main road near the school.'"
                            className="min-h-[100px]"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            <MapPin className="inline-block mr-2 h-4 w-4" />
                            Location
                        </Label>
                         <Button type="button" variant="outline" onClick={handleLocationClick} disabled={isFetchingLocation} className="w-full">
                            {isFetchingLocation ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Fetching Location...
                                </>
                            ) : (
                                <>
                                    <LocateFixed className="mr-2 h-4 w-4" />
                                    Use My Current Location
                                </>
                            )}
                        </Button>
                         {location && (
                            <p className="text-sm text-muted-foreground pt-2">
                                Location set: Latitude {location.lat.toFixed(4)}, Longitude {location.lng.toFixed(4)}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting || !location}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Submit Report
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
