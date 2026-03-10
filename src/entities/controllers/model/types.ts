export interface ControllerCompany {
  name?: string | undefined;
}

export interface ControllerMeter {
  id?: string | undefined;
}

export interface ControllerRow {
  id: string;
  createdAt: string;
  company?: ControllerCompany | null | undefined;
  meters?: ControllerMeter[] | undefined;
}

export interface ControllersResponse {
  data: ControllerRow[];
  total: number;
}
