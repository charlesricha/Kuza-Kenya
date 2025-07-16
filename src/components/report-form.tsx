"use client";

import { useState } from "react";
import { Camera, MapPin, Loader2, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GoogleMapPlaceholder } from "./google-map-placeholder";

export function ReportForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
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
                        <Label htmlFor="location">
                            <MapPin className="inline-block mr-2 h-4 w-4" />
                            Location
                        </Label>
                        <GoogleMapPlaceholder />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
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
