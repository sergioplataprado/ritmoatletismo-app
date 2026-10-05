# App instalada de RitmoAtletismo (Android / iPhone)

La app instalada abre la misma web (https://ritmoatletismo.netlify.app), así que **cada vez que subes la web a Netlify la app se actualiza sola**. Lo único que añade es el permiso para leer **Health Connect** (Android) o **Salud** (iPhone).

## Descarga directa (Android)
Cada vez que cambia algo en este repositorio, GitHub compila la app sola y la publica aquí:
**https://github.com/sergioplataprado/ritmoatletismo-app/releases/latest/download/RitmoAtletismo.apk**

## Android: conseguir el APK sin instalar nada (GitHub)
1. Crea una cuenta gratis en github.com y un repositorio nuevo (privado vale).
2. Sube el contenido de esta carpeta `native` (incluida la carpeta oculta `.github`).
3. Pestaña **Actions** → **APK Android** → **Run workflow**. Tarda unos 5–8 minutos.
4. Al terminar, en el resultado descarga **RitmoAtletismo-android** (un .zip con `app-debug.apk`).
5. Pasa el APK al móvil y ábrelo (Android pedirá permitir «instalar apps de origen desconocido»).

## Android con Android Studio (alternativa)
```
npm install
npm run android:prepare
npm run android:apk
```
El APK queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

## iPhone
Necesita un Mac con Xcode y una cuenta de Apple Developer (99 €/año):
```
npm install
npm run ios:prepare
```
En Xcode: activa la capacidad **HealthKit** y añade en Info.plist `NSHealthShareUsageDescription` («Para rellenar tu diario de salud y tus entrenos del club»).

## Requisitos del móvil
- Android 8 o superior con **Health Connect** (viene de serie en Android 14; en anteriores se instala desde Google Play).
- Samsung Health, Google Fit, Garmin Connect, Polar Flow, Coros, Huawei Health… deben tener activado «compartir con Health Connect».
