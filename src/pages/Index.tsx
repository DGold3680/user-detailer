import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "@/components/UserCard";
import { UserCardSkeleton } from "@/components/UserCardSkeleton";
import { ErrorPage } from "@/components/ErrorPage";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import type { User, UserFilters } from "@/types/user";
import { Helmet } from "react-helmet";

const ITEMS_PER_PAGE = 3;

const Index = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<UserFilters>({ search: "", company: "all" });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json() as Promise<User[]>;
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (error) {
    return <ErrorPage title="Error Loading Users" description={error.message} />;
  }

  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCompany = filters.company === "all" || user.company.name === filters.company;
    return matchesSearch && matchesCompany;
  });

  const companies = [...new Set(users?.map((user) => user.company.name) || [])];
  const totalPages = Math.ceil((filteredUsers?.length || 0) / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Helmet>
        <title>User Directory - Browse Users</title>
        <meta name="description" content="Browse and search through our user directory. Find users by name or company, with detailed profile information." />
        <meta property="og:title" content="User Directory - Browse Users" />
        <meta property="og:description" content="Browse and search through our comprehensive user directory. Find detailed user profiles and company information." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
        <meta name="keywords" content="user directory, profiles, company directory, user search" />
      </Helmet>

      <div className="container mx-auto px-4 py-8" role="main">
      <h1 className="text-4xl font-bold mb-8">User Directory</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by name..."
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="md:w-64"
          aria-label="Search users by name"
        />
        
        <Select
          value={filters.company}
          onValueChange={(value) => setFilters(prev => ({ ...prev, company: value }))}
        >
          <SelectTrigger className="md:w-64" aria-label="Filter by company">
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))
          : paginatedUsers?.map((user) => (
              <UserCard key={user.id} {...user} />
            ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      </div>
    </>
  );
};

export default Index;
