import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserCard } from '../UserCard';

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  company: {
    name: "Test Corp"
  }
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    renderWithRouter(<UserCard {...mockUser} />);
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.company.name)).toBeInTheDocument();
  });

  it('has a working view details button', () => {
    renderWithRouter(<UserCard {...mockUser} />);
    
    const detailsButton = screen.getByText('View Details');
    expect(detailsButton).toBeInTheDocument();
  });
});