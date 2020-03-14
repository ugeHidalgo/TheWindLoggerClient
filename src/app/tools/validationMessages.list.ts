export class ValidationMessagesList {

    static readonly messages = {
        'date': [
            { type: 'required', message: 'Campo obligatorio.'},
        ],
        'description': [
            { type: 'maxlength', message: 'Longitud maxima permitida: 100.'},
        ],
        'distance': [
            { type: 'required', message: 'Campo obligatorio.'},
            { type: 'max', message: 'Valor máximo permitido: 9999.'},
            { type: 'min', message: 'Valor mínimo permitido: 0.'}
        ],
        'effort': [
            { type: 'max', message: 'Valor máximo permitido: 10.'},
            { type: 'min', message: 'Valor mínimo permitido: 1.'}
        ],
        'name': [
            { type: 'required', message: 'Campo obligatorio.'},
            { type: 'maxlength', message: 'Longitud maxima permitida: 50.'}
        ],
        'material': [
            { type: 'required', message: 'Campo obligatorio.'}
        ],
        'maxPower': [
            { type: 'max', message: 'Valor máximo permitido: 9999.'},
            { type: 'min', message: 'Valor mínimo permitido: 0.'}
        ],
        'maxSpeed': [
            { type: 'max', message: 'Valor máximo permitido: 200.'},
            { type: 'min', message: 'Valor mínimo permitido: 0.'}
        ],
        'medPower': [
            { type: 'max', message: 'Valor máximo permitido: 9999.'},
            { type: 'min', message: 'Valor mínimo permitido: 0.'}
        ],
        'sport': [
            { type: 'required', message: 'Campo obligatorio.'},
        ],
        'spot': [
            { type: 'required', message: 'Campo obligatorio.'},
        ],
        'time': [
            { type: 'required', message: 'Campo obligatorio.'},
            { type: 'format', message: 'Formato inválido.'}
        ],
        'usePercentage': [
            { type: 'required', message: 'Campo obligatorio.'},
            { type: 'max', message: 'Valor máximo permitido: 100.'},
            { type: 'min', message: 'Valor mínimo permitido: 1.'}
        ],
        'value': [
            { type: 'max', message: 'Valor máximo permitido: 10.'},
            { type: 'min', message: 'Valor mínimo permitido: 1.'}
        ]
      }
}