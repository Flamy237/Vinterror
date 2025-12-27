# Web AR Setup Guide

## 📍 Fichiers requis

### 1. Modèle 3D (GLB)
- **Emplacement:** `public/models/bottle.glb`
- **Format:** glTF 2.0 (.glb)
- **Taille recommandée:** < 5 MB (pour mobile)
- **Obtention:**
  - Exportez depuis Blender/3DS Max/Maya en format glTF 2.0
  - Ou convertissez depuis un autre format sur https://products.aspose.app/3d/conversion

### 2. Fichier Marker (targets.mind)
- **Emplacement:** `public/models/targets.mind`
- **Génération:** Utilisez MindAR Trainer
  1. Allez sur https://mindart.github.io/
  2. Uploadez une image marqueur (étiquette, logo, etc.)
  3. Téléchargez le fichier `.mind` généré
  4. Placez-le dans `public/models/targets.mind`

**Important:** Sans ce fichier, la détection de marqueur ne fonctionnera pas.

## 🚀 Démarrage

```bash
npm run dev
```

Puis ouvrez `http://localhost:3000/ar` sur un appareil mobile (HTTPS requis en production).

## 📱 Test sur mobile

- **Localhost en local:** Fonctionne sur Android/iOS
- **En production:** HTTPS obligatoire (les caméras sur navigateur requièrent HTTPS)
- **Test via Vercel/Netlify:** Déployez et testez directement

## ⚙️ Personnalisation

- **Scale bouteille:** Modifiez `scale="0.5 0.5 0.5"` dans `app/ar/page.tsx`
- **Position:** Changez `position="0 0 0"`
- **Rotation animation:** Editez `animation` pour plus/moins rapide

## 🔧 Troubleshooting

- **Caméra ne démarre pas:** Vérifiez les permissions (popup "Autoriser la caméra")
- **Marqueur non détecté:** Assurez que `targets.mind` est présent et correct
- **Modèle 3D absent:** Vérifiez `bottle.glb` dans `public/models/`
