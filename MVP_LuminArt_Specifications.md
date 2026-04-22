# 📱 Document de Spécifications MVP - LuminArt

Ce document décrit le Produit Minimum Viable (MVP) de l'application LuminArt. Il est prêt à être transmis à l'équipe de développement (ou pour le montage d'un prototype IA / no-code / Figma). 

---

## 0. Vision rapide du MVP
**Objectif :** Créer une app de contrôle d'éclairage intelligent qui permet à un foyer de :
- Créer des ambiances et des routines Réveil/Coucher simples.
- Avoir un premier niveau de suivi d'énergie (sans matériel supplémentaire).
- Démarrer un coach bien-être orienté sommeil et lumière.
- Préparer la V1 (énergie avancée, intégrations écosystèmes, santé).

**Blocs du prototype cliquable :**
1. Gestion des pièces & lumières (base)
2. Scènes & ambiances
3. Routines Réveil / Coucher (simple + coach règles métiers)
4. Multi-utilisateurs & foyer (simple)
5. Énergie – suivi de base + écran jour
6. Mode Éco auto

*(Note : L'architecture doit prévoir les points de branchements futurs pour HP/HC, Santé, Écosystèmes, etc.)*

---

## 🎨 Spécifications UI/UX (Design System)

L'application doit proposer une interface premium, fluide et proposer les deux modes (Sombre et Clair).

**Palette de Couleurs :**
- **Primaire :** `rgb(250, 251, 99)` (Jaune lumineux)
- **Secondaire :** `rgb(107, 255, 247)` (Cyan/Aqua vif)
- **Background (Dark Mode) :** `rgb(0, 0, 0)` (Noir pur)
- **Dégradés :** Possibilité d'utiliser des dégradés mélangeant la couleur principale et secondaire pour les éléments de mise en avant (ex: boutons d'action, tuiles actives, indicateurs de routines).
- **Mode Clair :** Le système de design doit s'adapter de manière élégante à un thème clair (fonds clairs, contrastes ajustés sur le texte tout en gardant les touches primaires/secondaires).

---

## 1. Onboarding & Foyer

### 1.1. Création de compte & foyer
**Parcours utilisateur :**
1. L'utilisateur ouvre l'app et choisit : "Créer un foyer" ou "Rejoindre un foyer".
2. **S'il crée un foyer :**
   - Renseigne un nom de foyer (ex. "Famille Dupont").
   - Accepte les CGU / politique de données.
3. Un profil utilisateur (Parent par défaut pour le MVP) lui est créé.

**Fonctionnalités & Dev :**
- [Ticket lié] Création de foyer.
- [Ticket lié] Création de profil utilisateur.
- [Ticket lié] Association profil ↔ foyer (Architecture à prévoir pour les droits avancés multi-utilisateurs de la V1).

---

## 2. Gestion des pièces & lumières

### 2.1. Création / gestion des pièces
**Parcours utilisateur :**
1. Après l'onboarding, affichage de l'écran "Pièces" avec un bouton "Ajouter une pièce".
2. L'utilisateur ajoute ses pièces (nom, icône : salon, lit, cuisine, etc.).

**Fonctionnalités & Dev :**
- [Ticket lié] CRUD pièce (créer, lire, renommer, supprimer).
- [Ticket lié] Associer des lumières physiques aux pièces (Pour le MVP/Prototype : possibilité de simuler des lampes ou des groupes de lampes).

---

## 3. Scènes & ambiances (MVP "Light")
*Note V1 : La version "intelligente" avec suggestions selon le temps de la journée viendra plus tard. Le MVP se concentre sur la création manuelle par pièce.*

### 3.1. Création de scène par pièce
**Parcours utilisateur :**
1. L'utilisateur ouvre une pièce (ex. "Salon").
2. Il a accès aux contrôles basiques (intensité, couleur si supportée) et à un bloc "Scènes".
3. Au clic sur "Créer une scène" :
   - Choix du nom (ex. "Lecture").
   - Choix de l'intensité (ex. 60%).
   - Choix de la couleur / température (ex. chaud 2700K).
   - *Optionnel :* Durée de transition (ex. 5s).
4. Sauvegarde : la scène apparaît sous forme de tuile cliquable.

**Fonctionnalités & Dev :**
- [Ticket lié] CRUD scène par pièce.
- [Ticket lié] Moteur d'application de scène : Envoyer les paramètres à toutes les lampes de la pièce simultanément.

---

## 4. Routines Réveil / Coucher (MVP)
*Note V1 : Les raffinements (jours semaine/week-end, durées multiples, coach qui ajuste) arriveront en V1. Le dev doit toutefois poser l'architecture.*

### 4.1. Création d'une routine Réveil
**Parcours utilisateur :**
1. Navigation vers l'onglet "Routines" ou via une bannière d'action "Créer ma routine de réveil".
2. Configuration :
   - Type : "Réveil".
   - Pièce principale : "Chambre".
   - Heure : "7h00".
   - Durée : 30 min (fixe ou choix simple pour le MVP).
   - Logique lumière : Début très faible ➔ montée progressive vers intensité jour (ex. 80%) ➔ passage de chaud à plus neutre.
3. Activation de la routine.

**Comportement attendu :** 
À 7h00, allumage très doux pour atteindre le niveau final à 7h30. Possibilité pour l'utilisateur de mettre en pause ou désactiver.

### 4.2. Routine Coucher
Similaire au Réveil :
- Type : "Coucher".
- Logique lumière : Descente progressive de l'intensité, température qui se réchauffe.
- Fin de routine : Possibilité d'extinction complète.

**Fonctionnalités & Dev :**
- [Ticket lié] Création et gestion des routines (Heure, Pièce, Durée, Paramètres d'évolution).
- [Ticket lié] Moteur temporel : exécuter les transitions lumineuses sur la durée impartie.

---

## 5. Coach Bien-être (MVP)
*Note V1 : Intégrations Apple Health / Google Fit. Le MVP utilise des règles métiers simples basées sur l'usage.*

### 5.1. Comportement du coach
**Règles métiers (à simuler pour le prototype) :**
- *Règle 1 :* Si l'utilisateur crée une routine Réveil mais l'interrompt souvent avant la fin ➔ Suggestion : *"Souhaitez-vous décaler votre réveil ?"*
- *Règle 2 :* Si la routine Coucher est très tardive et qu'une scène "Lecture" est souvent activée après ➔ Suggestion : *"Et si on avançait un peu votre routine de coucher ?"*

**UI/UX :** Afficher des cartes de suggestions non intrusives (ex: sur un onglet "Coach" ou intégrées dans la page Routine).

**Fonctionnalités & Dev :**
- [Ticket lié] Moteur de règles basiques (événements d'usage ➔ affichage d'une carte de suggestion).

---

## 6. Multi-utilisateurs & Foyer (MVP)
*Version basique pour préparer la V1 (où il y aura des rôles et droits spécifiques).*

### 6.1. Inviter un second utilisateur
**Parcours utilisateur :**
1. Depuis les paramètres du foyer : "Inviter quelqu'un".
2. Saisie d'un e-mail ou génération d'un lien.
3. Le second utilisateur rejoint le foyer avec un profil par défaut (mêmes droits dans le MVP).

**Fonctionnalités & Dev :**
- [Ticket lié] Système d'invitation (génération de lien / e-mail).
- [Ticket lié] Gérer les profils multiples rattachés à un même `foyer_id`.

---

## 7. Énergie (MVP)
*Objectif : Poser les bases du suivi sans ajout de matériel (via estimation).*

### 7.1. Logging technique & Estimation
**Concept & Calculs :**
- Suivi de l'état (ON/OFF) et de l'intensité de chaque lampe.
- **Formule d'estimation :** `(puissance nominale (W) × durée (h) × intensité moyenne) / 1000 = Conso (kWh)`.
- Agrégation des données par pièce, par foyer et par jour.

**Fonctionnalités & Dev :**
- [Ticket lié] **Logging & estimation de consommation** : Enregistrement de l'historique des plages d'allumage par lampe.

### 7.2. Écran Énergie – Vue Jour
**Parcours utilisateur :**
1. Ouverture de l'onglet "Énergie".
2. Affichage des données du jour courant :
   - Total du foyer (kWh estimé).
   - Liste simple des pièces avec leur consommation estimée (chiffres ou petites barres, pas de graphique complexe au MVP).
   - Statut "Données insuffisantes" si la pièce n'a pas encore de data.

**Fonctionnalités & Dev :**
- [Ticket lié] **Écran énergie vue jour** : UI d'affichage des statistiques calculées (prêt à accueillir les vues Semaine/Mois en V1).

---

## 8. Mode Éco Auto (MVP)

### 8.1. Activation et Fonctionnement
**Parcours utilisateur :**
1. Depuis les paramètres ou l'onglet Énergie : activation du "Mode Éco auto".
2. Paramétrage : Heure de début (ex. 22h) et périmètre (Toute la maison ou pièces spécifiques).

**Comportement attendu :**
- À partir de l'heure définie (ex. 22h), l'intensité maximale est plafonnée (ex. 70%).
- Si l'utilisateur essaie de monter l'intensité manuellement au-delà :
  - L'action est bridée à 70%.
  - Un message toast non intrusif informe : *"Mode Éco actif : intensité limitée pour économiser de l'énergie"*.

**Fonctionnalités & Dev :**
- [Ticket lié] **Plafond intensité après une certaine heure** : Implémenter un "middleware" / couche de contrôle centralisée qui intercepte les commandes d'intensité et applique les limites du Mode Éco avant d'envoyer la commande à la lampe.

---
*Fin du document.*
