export class ValidationMessagesList {
   static readonly messages = {
        'distance': [
            { type: 'required', message: 'La distancia es obligatoria.'},
          ],
        'material': [
            { type: 'required', message: 'El material es obligatorio.'}
        ],
        'time': [
            { type: 'required', message: 'El tiempo es obligatorio.'},
            { type: 'format', message: 'Formato inválido. Use HH:MM:SS.'}
        ],
        'usePercentage': [
            { type: 'required', message: 'El % de uso es obligatorio.'},
            { type: 'max', message: 'El valor máximo permitido es 100.'},
            { type: 'min', message: 'El valor mínimo permitido es 1.'}
        ]
      }
}