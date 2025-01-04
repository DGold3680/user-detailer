import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      return response.json() as Promise<User>;
    },
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load user details. Please try again later.",
    });
  }

  return (
    <>
      <Helmet>
        {user && (
          <>
            <title>{`${user.name} - User Profile`}</title>
            <meta name="description" content={`Profile page for ${user.name}, working at ${user.company.name}. Contact via ${user.email}`} />
            <meta property="og:title" content={`${user.name} - User Profile`} />
            <meta property="og:description" content={`View detailed profile information for ${user.name}`} />
            <meta property="og:type" content="profile" />
            <meta property="profile:first_name" content={user.name.split(' ')[0]} />
            <meta property="profile:last_name" content={user.name.split(' ').slice(1).join(' ')} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={window.location.href} />
          </>
        )}
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : user ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Company</h3>
                <p>Name: {user.company.name}</p>
                <p>Catch Phrase: {user.company.catchPhrase}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p>{user.address.street}</p>
                <p>{user.address.suite}</p>
                <p>{user.address.city}, {user.address.zipcode}</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
};

export default UserDetails;