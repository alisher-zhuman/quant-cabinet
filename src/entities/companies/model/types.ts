export interface CompanyUser {
  email?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface CompanyRow {
  id: string;
  name: string;
  address: string;
  createdAt: string;
  isArchived: boolean;
  user?: CompanyUser | null | undefined;
}

export interface CompaniesResponse {
  data: CompanyRow[];
  total: number;
}

export interface ToggleCompanyArchivePayload {
  id: string;
  isArchived: boolean;
}

export interface DeleteCompanyPayload {
  id: string;
}
