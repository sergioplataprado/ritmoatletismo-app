// Añade a la app Android los permisos de lectura de Health Connect, la pantalla de
// «por qué pedimos estos permisos» (obligatoria) y el SDK mínimo 26.
import fs from "node:fs";
const MAN = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(MAN, "utf8");
const perms = ["READ_SLEEP","READ_RESTING_HEART_RATE","READ_HEART_RATE_VARIABILITY","READ_HEART_RATE","READ_STEPS","READ_DISTANCE","READ_EXERCISE","READ_ACTIVE_CALORIES_BURNED","READ_TOTAL_CALORIES_BURNED"]
  .map(p=>`    <uses-permission android:name="android.permission.health.${p}" />`).join("\n");
if(!m.includes("health.READ_SLEEP")) m = m.replace(/<application/, `${perms}\n    <queries><package android:name="com.google.android.apps.healthdata" /></queries>\n\n    <application`);
const rationale = `
        <!-- Health Connect: explica por qué pedimos los permisos (Android 13 y anteriores) -->
        <activity-alias android:name="ViewPermissionUsageActivity" android:exported="true" android:targetActivity=".MainActivity" android:permission="android.permission.START_VIEW_PERMISSION_USAGE">
            <intent-filter>
                <action android:name="android.intent.action.VIEW_PERMISSION_USAGE" />
                <category android:name="android.intent.category.HEALTH_PERMISSIONS" />
            </intent-filter>
        </activity-alias>`;
if(!m.includes("VIEW_PERMISSION_USAGE")) m = m.replace(/<\/application>/, `${rationale}\n    </application>`);
// Android 14+: la acción de rationale dentro de MainActivity
if(!m.includes("ACTION_SHOW_PERMISSIONS_RATIONALE")) m = m.replace(/(<activity[^>]*\.MainActivity"[\s\S]*?)(\s*<\/activity>)/, `$1
            <intent-filter>
                <action android:name="androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE" />
            </intent-filter>$2`);
fs.writeFileSync(MAN, m);
// SDK mínimo 26 (requisito de Health Connect)
const VG = "android/variables.gradle";
if(fs.existsSync(VG)){ let v=fs.readFileSync(VG,"utf8"); v=v.replace(/minSdkVersion\s*=\s*\d+/, m0=>{ const n=+m0.match(/\d+/)[0]; return n<26?"minSdkVersion = 26":m0; }); fs.writeFileSync(VG,v); }
// Política de privacidad (Health Connect la enseña al usuario)
const STR = "android/app/src/main/res/values/strings.xml";
let s = fs.readFileSync(STR, "utf8");
if(!s.includes("health_connect_privacy_policy_url")) s = s.replace(/<\/resources>/, `    <string name="health_connect_privacy_policy_url">https://ritmoatletismo.netlify.app/privacidad.html</string>\n</resources>`);
fs.writeFileSync(STR, s);
console.log("Android preparado para Health Connect");
