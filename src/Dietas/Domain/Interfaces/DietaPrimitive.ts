export interface DietaPrimitive {
  id?: string;
  id_cliente: number;
  id_empleado: number;
  fecha_creacion: Date; // Formato ISO 8601 "YYYY-MM-DD"
  peso_kilogramos: number;
  estatura_centimetros: number;
  cuello_pulgadas: number;
  cintura_pulgadas: number;
  cadera_pulgadas: number;
  objetivo: string; // Ejemplo: "Recomposición corporal"
  factor_actividad: string; // Ejemplo: "Sedentario"
  platillos: PlatillosPrimitive;
}

export interface PlatillosPrimitive {
  desayuno: PlatilloPrimitive;
  snack_1: PlatilloPrimitive;
  comida: PlatilloPrimitive;
  snack_2: PlatilloPrimitive;
  cena: PlatilloPrimitive;
}

export interface PlatilloPrimitive {
  comentario: string; // Ejemplo: "Omelet de queso y licuado de fresa"
  alimentos: AlimentoDietaPrimitive[];
}

export interface AlimentoDietaPrimitive {
  id_alimento: string;
  cantidad: number; // Cantidad en la unidad correspondiente
}