import { getHttpClient } from '@/lib/http-client';
import { fechasSalidaListSchema, type FechaSalidaCalendarioDTO } from '../dto/calendario.schemas';

const http = getHttpClient();

export const calendarioApi = {
  getActivas(): Promise<FechaSalidaCalendarioDTO[]> {
    return http.get<FechaSalidaCalendarioDTO[]>('/fechas-salida/activas', fechasSalidaListSchema);
  },
};
