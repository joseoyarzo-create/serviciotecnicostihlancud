import { supabase } from '@/integrations/supabase/client';
import { Cliente, Repuesto, FichaTecnica, ServicioItem, RepuestoFicha } from '@/types';
import type { Json } from '@/integrations/supabase/types';

const PAGE_SIZE = 1000;

export const generateId = (): string => {
  return crypto.randomUUID();
};

// Clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const all: any[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('nombre')
      .range(from, from + PAGE_SIZE - 1);
    if (error) {
      console.error('Error fetching clientes:', error);
      break;
    }
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all.map(c => ({
    id: c.id,
    nombre: c.nombre,
    telefono: c.telefono || '',
  }));
};

export const saveCliente = async (cliente: Cliente): Promise<void> => {
  const { error } = await supabase
    .from('clientes')
    .upsert({
      id: cliente.id,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
    }, { onConflict: 'id' });
  
  if (error) {
    console.error('Error saving cliente:', error);
    throw error;
  }
};

export const deleteCliente = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting cliente:', error);
    throw error;
  }
};

// Repuestos
export const getRepuestos = async (): Promise<Repuesto[]> => {
  const all: any[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('repuestos')
      .select('*')
      .order('nombre')
      .range(from, from + PAGE_SIZE - 1);
    if (error) {
      console.error('Error fetching repuestos:', error);
      break;
    }
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all.map(r => ({
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    precio: Number(r.precio),
  }));
};

export const saveRepuesto = async (repuesto: Repuesto): Promise<void> => {
  const { error } = await supabase
    .from('repuestos')
    .upsert({
      id: repuesto.id,
      codigo: repuesto.codigo,
      nombre: repuesto.nombre,
      precio: repuesto.precio,
    }, { onConflict: 'id' });
  
  if (error) {
    console.error('Error saving repuesto:', error);
    throw error;
  }
};

export const saveRepuestosBulk = async (nuevosRepuestos: Repuesto[]): Promise<void> => {
  const payload = nuevosRepuestos.map(r => ({
    id: r.id,
    codigo: r.codigo,
    nombre: r.nombre,
    precio: r.precio,
  }));
  const { error } = await supabase
    .from('repuestos')
    .upsert(payload, { onConflict: 'codigo' });
  if (error) {
    console.error('Error bulk saving repuestos:', error);
    throw error;
  }
};

export const deleteRepuesto = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('repuestos')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting repuesto:', error);
    throw error;
  }
};

// Modelos
export const getModelos = async (): Promise<{ id: string; modelo: string }[]> => {
  const { data, error } = await supabase
    .from('modelos')
    .select('*')
    .order('nombre');
  
  if (error) {
    console.error('Error fetching modelos:', error);
    return [];
  }
  
  return data.map(m => ({
    id: m.id,
    modelo: m.nombre,
  }));
};

export const saveModelo = async (modelo: { id: string; modelo: string }): Promise<void> => {
  const { error } = await supabase
    .from('modelos')
    .upsert({
      id: modelo.id,
      nombre: modelo.modelo,
    }, { onConflict: 'id' });
  
  if (error) {
    console.error('Error saving modelo:', error);
    throw error;
  }
};

// Fichas Técnicas
export const getFichas = async (): Promise<FichaTecnica[]> => {
  const { data, error } = await supabase
    .from('fichas')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching fichas:', error);
    return [];
  }
  
  return data.map(f => ({
    id: f.id,
    numeroBoleta: f.numero_boleta,
    numeroServicio: f.numero_boleta,
    fechaIngreso: new Date(f.fecha_ingreso),
    fechaReparacion: f.fecha_reparacion ? new Date(f.fecha_reparacion) : null,
    fechaEntrega: f.fecha_entrega ? new Date(f.fecha_entrega) : null,
    cliente: {
      id: f.id,
      nombre: f.cliente_nombre,
      telefono: f.cliente_telefono || '',
    },
    modeloMaquina: f.modelo_maquina,
    numeroSerie: f.numero_serie || '',
    tipoAveria: f.observaciones || '',
    repuestos: validateRepuestos(f.repuestos),
    servicios: validateServicios(f.servicios),
    recomendaciones: 'REPARACIÓN GARANTIZADA POR 10 DÍAS DE LA FECHA DE RETIRO',
    tecnico: f.mecanico as 'JORGE' | 'JEAN',
  }));
};

export const getFichaById = async (id: string): Promise<FichaTecnica | null> => {
  const { data, error } = await supabase
    .from('fichas')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching ficha:', error);
    return null;
  }
  
  return {
    id: data.id,
    numeroBoleta: data.numero_boleta,
    numeroServicio: data.numero_boleta,
    fechaIngreso: new Date(data.fecha_ingreso),
    fechaReparacion: data.fecha_reparacion ? new Date(data.fecha_reparacion) : null,
    fechaEntrega: data.fecha_entrega ? new Date(data.fecha_entrega) : null,
    cliente: {
      id: data.id,
      nombre: data.cliente_nombre,
      telefono: data.cliente_telefono || '',
    },
    modeloMaquina: data.modelo_maquina,
    numeroSerie: data.numero_serie || '',
    tipoAveria: data.observaciones || '',
    repuestos: validateRepuestos(data.repuestos),
    servicios: validateServicios(data.servicios),
    recomendaciones: 'REPARACIÓN GARANTIZADA POR 10 DÍAS DE LA FECHA DE RETIRO',
    tecnico: data.mecanico as 'JORGE' | 'JEAN',
  };
};

// Helper functions for validation
const validateRepuestos = (json: Json | null): RepuestoFicha[] => {
  if (!Array.isArray(json)) return [];
  return json.map((item: any) => ({
    id: item.id || '',
    codigo: item.codigo || '',
    nombre: item.nombre || '',
    precio: Number(item.precio) || 0,
    cantidad: Number(item.cantidad) || 1,
    precioEditado: item.precioEditado ? Number(item.precioEditado) : undefined
  })).filter(r => r.id && r.codigo);
};

const validateServicios = (json: Json | null): ServicioItem[] => {
  if (!Array.isArray(json)) return [];
  return json.map((item: any) => ({
    nombre: item.nombre || '',
    revision: Boolean(item.revision),
    reparacion: Boolean(item.reparacion)
  }));
};

export const saveFicha = async (ficha: FichaTecnica): Promise<void> => {
  const fichaData = {
    numero_boleta: ficha.numeroBoleta,
    fecha_ingreso: ficha.fechaIngreso.toISOString(),
    fecha_reparacion: ficha.fechaReparacion?.toISOString() || null,
    fecha_entrega: ficha.fechaEntrega?.toISOString() || null,
    cliente_nombre: ficha.cliente.nombre,
    cliente_telefono: ficha.cliente.telefono,
    modelo_maquina: ficha.modeloMaquina,
    numero_serie: ficha.numeroSerie,
    mecanico: ficha.tecnico,
    repuestos: JSON.parse(JSON.stringify(ficha.repuestos)) as Json,
    servicios: JSON.parse(JSON.stringify(ficha.servicios)) as Json,
    observaciones: ficha.tipoAveria,
  };

  // Check if ficha exists
  const { data: existing } = await supabase
    .from('fichas')
    .select('id')
    .eq('id', ficha.id)
    .maybeSingle();

  let error;
  if (existing) {
    const result = await supabase
      .from('fichas')
      .update(fichaData)
      .eq('id', ficha.id);
    error = result.error;
  } else {
    const insertData = { ...fichaData } as Record<string, unknown>;
    insertData.id = ficha.id;
    const result = await supabase
      .from('fichas')
      .insert(insertData as never);
    error = result.error;
  }
  
  if (error) {
    console.error('Error saving ficha:', error);
    throw error;
  }
};

export const deleteFicha = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('fichas')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting ficha:', error);
    throw error;
  }
};

// Contador
export const getNextNumero = async (): Promise<number> => {
  const { data, error } = await supabase
    .from('contador')
    .select('valor')
    .eq('id', 'boleta')
    .single();
  
  if (error) {
    console.error('Error fetching contador:', error);
    return 1;
  }
  
  return (data?.valor || 0) + 1;
};

export const incrementContador = async (): Promise<void> => {
  const nextValue = await getNextNumero();
  
  const { error } = await supabase
    .from('contador')
    .update({ valor: nextValue })
    .eq('id', 'boleta');
  
  if (error) {
    console.error('Error incrementing contador:', error);
    throw error;
  }
};

// Generate ID helper removed (duplicate)


export const getNextFolio = async (): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('fichas')
      .select('numero_boleta')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching last folio:', error);
      return '';
    }

    if (data && data.length > 0) {
      const lastBoleta = data[0].numero_boleta;
      // Try to extract the last sequence of digits
      const match = lastBoleta.match(/(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        return (num + 1).toString();
      }
      // If it's a number but parsed simply
      const simpleNum = parseInt(lastBoleta, 10);
      if (!isNaN(simpleNum)) {
        return (simpleNum + 1).toString();
      }
    }
    
    return '1';
  } catch (error) {
    console.error('Error in getNextFolio:', error);
    return '';
  }
};
