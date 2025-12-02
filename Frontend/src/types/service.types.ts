// Service Types matching backend DTOs

export interface ServiceDto {
  serviceId: number;
  businessId: number;
  serviceName: string;
  description?: string;
  price: number;
  duration?: number;
}

export interface CreateServiceDto {
  businessId: number;
  serviceName: string;
  description?: string;
  price: number;
  duration?: number;
}

export interface UpdateServiceDto {
  serviceName?: string;
  description?: string;
  price?: number;
  duration?: number;
}
