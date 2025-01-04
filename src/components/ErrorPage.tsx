import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  title?: string;
  description?: string;
}

export const ErrorPage = ({ 
  title = "Error",
  description = "Something went wrong. Please try again later."
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/')}>
          Go Home
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  );
};