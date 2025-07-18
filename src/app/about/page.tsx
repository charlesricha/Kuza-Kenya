import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Target, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">About Kuza Kenya</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We are dedicated to empowering communities by providing a platform to voice their concerns and contribute to a better, more responsive Kenya.
          </p>
        </div>

        {/* Mission and Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="bg-card/50 border-0 shadow-lg">
            <CardHeader className="flex-row items-center gap-4">
              <div className="bg-primary/20 text-primary p-3 rounded-lg">
                <Target className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To bridge the gap between citizens and local authorities by providing a simple, transparent, and effective platform for reporting and resolving community issues. We aim to foster accountability and drive positive change from the ground up.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-0 shadow-lg">
            <CardHeader className="flex-row items-center gap-4">
              <div className="bg-accent/20 text-accent p-3 rounded-lg">
                  <Eye className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a future where every Kenyan citizen feels heard and empowered to contribute to their community’s development. A Kenya where infrastructure is well-maintained, public services are responsive, and communities thrive through collaboration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Creator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This project was brought to life by the passion and dedication of a single developer.
          </p>
        </div>
        <div className="flex justify-center">
            <Card className="text-center bg-card/50 border-0 shadow-lg p-6 w-full max-w-sm">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src="/charles.jpg" alt={"Charles Muthui"} className="object-cover"/>
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Charles Muthui</h3>
              <p className="text-primary">Lead Developer & Creator</p>
              <p className="text-muted-foreground mt-2">
                Charles single-handedly designed, developed, and deployed Kuza Kenya with the vision of making a tangible difference in his community.
              </p>
            </Card>
        </div>

      </div>
    </div>
  );
}
