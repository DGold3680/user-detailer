import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export const UserCard = ({ id, name, email, company }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{email}</p>
        <p className="text-sm text-muted-foreground mb-4">{company.name}</p>
        <Button 
          onClick={() => navigate(`/user/${id}`)}
          className="w-full"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};