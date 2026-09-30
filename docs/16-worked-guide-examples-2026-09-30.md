# Ejemplos utilizables en las guías — 30 de septiembre de 2026

## Estado

Candidato local en `codex/sleeplike-guide-examples-20260930`, iniciado desde
`origin/main` `5909ad5f8834ff1a877ed63a3adf7033cf4d2c7d`. Render local verificado;
publicación pendiente. A las 10:17 UTC, el sitio vivo sigue en `dpl_7Aoet3noXc37UwUuW2UCs2TRRZ5f`
y su commit `6b631dc446f1f0ffd55a13e5ddc327057310e623`, con el mismo árbol que
esa integración a main. Se comprueba otra vez antes de cada release.

## Utilidad y alcance

Ocho guías existentes de ciclos, duración, latencia y horarios, en ES/EN,
reciben doce tarjetas con ejemplos que se pueden abrir y variar en la
calculadora local. No se crean rutas ni páginas masivas. Las tarjetas
complementan la explicación existente con una acción para probar la cuenta.

Los enlaces transmiten solamente valores ilustrativos en el fragmento local,
sin query del servidor. La calculadora los restaura, selecciona un despertar
futuro y limpia la URL. No hay backend, archivo de usuario, almacenamiento de
horarios o evento nuevo. Analítica y anuncios mantienen sus gates actuales.

Todos los ejemplos suponen cinco ciclos de 90 minutos y un día sin cambio
horario. Separan 450 minutos estimados de sueño del margen de 15 o 30 minutos
en cama. No predicen etapas, no ofrecen una recomendación individual y se
pueden ajustar hora, fecha y margen. Se mantiene la explicación educativa y
los límites de las guías, incluido priorizar suficiente sueño.

## Evidencia

- Test focal: un caso recorre las doce tarjetas usando el parser de enlaces,
  `nextLocalTime` y el motor real, sin mocks. Comprueba idioma y ruta del
  destino, sección de inserción, hora mostrada y duración. Pasó antes de
  implementar la interfaz.
- Fermat dio **GO de contenido**, comprobando las cuentas, los ocho anchors,
  el alcance educativo y la ausencia de nueva captura. Su observación menor
  sobre la duración en inglés se resolvió con “7 hours 30 minutes”.
- Claude Code terminó la interfaz con `claude-opus-5-5` por la suscripción
  Max existente: empezó 09:50:30 UTC y terminó 09:53:25 UTC, después del
  reinicio de cuota y del recibo exitoso de la tarea del Hub. Recibo local
  `output/miniapps-guides-20260930/guide-opus-receipt.json`; no se usó API de pago.
- Las fechas de modificación cambian sólo en las ocho guías; las otras
  dieciséis páginas conservan su fecha. Se validan fechas y pares ES/EN.
- Gate raíz: typecheck, lint, test y build PASS; **29 pruebas unitarias**.
  `make verify` PASS, incluidos **108 casos de navegador** en Chromium,
  WebKit y sus perfiles móviles. Los dos viajes nuevos fallaron contra el
  export anterior y pasan con el cambio: guía → ejemplo de 30 minutos →
  despertar futuro → resultados → modificación a 15 minutos, en ES/EN.
- Render final a 320, 390 y 1440 px: sin desbordamiento horizontal, enlaces
  de al menos 44 px, cero errores de página/consola y cero solicitudes de
  anuncios o captura. Capturas y recibo `visual-proof.json` fuera de Git.
  Fermat dio GO independiente de código y de esas capturas.

## Aceptación pendiente

Staged sin dominio, smoke del artefacto exacto, revisión independiente de su
evidencia y promoción manual con rollback. Conservar las 24 URLs,
canonical/hreflang y publicidad apagada. El flag `autoAssignCustomDomains`
se verificó en `false` antes de preparar la publicación.

No hay un informe de indexación nuevo ni datos de tráfico o ingresos que
atribuyan una mejora a este candidato. Publicarlo e indexarlo son hitos
separados.
