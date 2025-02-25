import { BadRequest } from '@/src/Shared/Domain/Exceptions/BadRequest';
import {
  RECUPERACION_HISTORICA,
  RecuperacionHistoricaType,
} from '../../Interfaces/RecuperacionHistorica';

export class RecuperacionHistorica {
  public value: string;
  private campo = 'recuperacion_historica';

  public constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }
  private ensureIsValid(value: string): void {
    if (!value) {
      throw new BadRequest({
        message:
          'Favor de Seleccionar una opción para recuperacion_historica: PRESENTA DOLOR POR HASTA 3 DIAS DESPUES DEL ENTRENAMIENTO, PRESENTA DOLOR POR HASTA 2 DIAS DESPUES DEL ENTRENAMIENTO, PRESENTA DOLOR POR HASTA 1 DIA DESPUES DEL ENTRENAMIENTO, RARAMENTE SE PRESENTA DOLOR POR MAS DE 1 DIA DESPUES DEL ENTRENAMIENTO o RARAMENTE SE PRESENTA DOLOR POR MAS DE 1 DIA DESPUES DEL ENTRENAMIENTO Y RESPONDE A CARGAS DE TRABAJO ALTAS',
        campo: this.campo,
      });
    }
    if (!RECUPERACION_HISTORICA.includes(value as RecuperacionHistoricaType)) {
      throw new BadRequest({
        message:
          'No a seleccionado uno válido, favor de seleccionar un valor válido para recuperacion_historica: PRESENTA DOLOR POR HASTA 3 DIAS DESPUES DEL ENTRENAMIENTO, PRESENTA DOLOR POR HASTA 2 DIAS DESPUES DEL ENTRENAMIENTO, PRESENTA DOLOR POR HASTA 1 DIA DESPUES DEL ENTRENAMIENTO, RARAMENTE SE PRESENTA DOLOR POR MAS DE 1 DIA DESPUES DEL ENTRENAMIENTO o RARAMENTE SE PRESENTA DOLOR POR MAS DE 1 DIA DESPUES DEL ENTRENAMIENTO Y RESPONDE A CARGAS DE TRABAJO ALTAS',
        campo: this.campo,
        data: value,
      });
    }
  }
}
