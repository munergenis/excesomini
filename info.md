# Información y lógica para el cálculo de exceso en reservas de aparcamiento

Esta aplicación calcula el exceso de importe en una reserva de aparcamiento, comparando los datos de la reserva original con los datos reales de uso. A continuación se detallan los datos necesarios y la lógica general:

## Datos requeridos para el cálculo

1. **Fecha y hora de inicio de la reserva**
2. **Fecha y hora de fin de la reserva**
3. **Fecha y hora real de entrada al aparcamiento**
4. **Fecha y hora real de salida del aparcamiento** (por defecto, será la hora actual al solicitar el cálculo)
5. **Precio original de la reserva**
6. **Tarifas planas** (opcional): Si existen, deben ser consideradas en el cálculo del exceso.
7. **Tipo de reserva (prepago/postpago)**: Flag que indica si la reserva es prepago o postpago. Esto afecta al cálculo y presentación del precio final.

## Lógica general del cálculo

1. Comparar el periodo reservado con el periodo real de uso:
   - Si la estancia real es mayor que la reservada, calcular el tiempo excedido.
2. Calcular el importe correspondiente al exceso de tiempo:
   - Determinar la tarifa aplicable para el tiempo excedido (puede ser tarifa estándar u otra, según reglas del aparcamiento).
   - Si existen tarifas planas y el exceso entra dentro de alguna, aplicar la tarifa plana correspondiente.
3. Sumar el importe original de la reserva y el importe del exceso para obtener el total a pagar.
4. Mostrar el importe del exceso y el total actualizado.

### Consideración según tipo de reserva

- **Prepago:** En el precio final solo se muestra el importe del exceso (si lo hay), ya que el importe original ya ha sido abonado.
- **Postpago:** En el precio final se muestra el importe original de la reserva más el exceso (si lo hay).

## Ejemplo de uso (aplicando las reglas de negocio)

- Reserva: 10:00 a 12:00, precio 5€
- Entrada real: 08:30 (1,5h antes de la reserva)
- Salida real: 14:00 (2h después de la reserva)
- Margen de cortesía: Entrada permitida desde 08:00 (2h antes) y salida permitida hasta 14:00 (2h después)
- En este caso, tanto la entrada como la salida están dentro del margen de cortesía, por lo que **no hay exceso**.
- Importe exceso: 0€
- Total a pagar: 5€

### Ejemplo con exceso

- Reserva: 10:00 a 12:00, precio 5€
- Entrada real: 07:30 (2,5h antes de la reserva)
- Salida real: 15:00 (3h después de la reserva)
- Margen de cortesía: Entrada permitida desde 08:00 y salida permitida hasta 14:00
- Exceso de entrada: 0,5h (de 07:30 a 08:00)
- Exceso de salida: 1h (de 14:00 a 15:00)
- Importe exceso: Por determinar
- Total a pagar: 5€ + exceso

### Ejemplo con tarifa plana

- Reserva: 10 días, precio 50€, tarifa plana activada
- Entrada y salida fuera de los márgenes de cortesía
- Como la reserva está entre 7 y 21 días y la tarifa plana está activada, **no se aplica exceso**
- Importe exceso: 0€
- Total a pagar: 50€

## Reglas adicionales de la lógica

1. **Margen de cortesía:**
   - Se permiten hasta 2 horas de margen tanto para la entrada anticipada como para la salida tardía.
   - Es decir, se puede entrar hasta 2 horas antes de la hora de inicio de la reserva y salir hasta 2 horas después de la hora de fin de la reserva sin que se aplique exceso. Si se supera alguno de estos márgenes, se calculará el exceso solo por el tiempo que exceda el margen.
2. **Tarifas planas:**
   - Si está activada la opción de tarifas planas y la reserva tiene una duración entre 7 y 21 días (ambos inclusive), no se aplicará ningún exceso, independientemente de la hora real de entrada o salida.
3. **Cálculo del exceso:**
   - El coste del exceso queda pendiente de determinar y se implementará más adelante.

---

Esta lógica servirá como base para implementar la funcionalidad en la aplicación.