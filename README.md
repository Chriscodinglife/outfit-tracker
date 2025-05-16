# 👚 Outfit Tracker

A small web app that helps you track your daily outfits and moods! Perfect for fashion enthusiasts who want to remember their favorite combinations and how they felt wearing them. Made for the wife

## ✨ Features

- 📅 Calendar-based outfit tracking
- 👗 Select multiple clothing items per day
- 😊 Track your mood with each outfit
- 🔐 Secure Google authentication
- 💾 Cloud storage with Firebase
- 🎨 Clean, modern UI

## 🚀 Getting Started

### Prerequisites

- fnm (Fast Node Manager)
- npm or yarn
- A Firebase account

### 🛠️ Setup

1. Install fnm if you haven't already:

```bash
# macOS with Homebrew
brew install fnm

# Add to your ~/.zshrc or ~/.bashrc:
eval "$(fnm env --use-on-cd)"
```

2. Install and use Node.js with fnm:

```bash
# Install Node.js LTS
fnm install 20
fnm use 20

# Verify installation
node --version # Should show v20.x.x
```

3. Clone the repository:

```bash
git clone https://github.com/yourusername/outfit-tracker-app.git
cd outfit-tracker-app
```

4. Install dependencies:

```bash
npm install
# or
yarn install
```

5. Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FB_API_KEY=your_api_key
VITE_FB_AUTH_DOM=your_auth_domain
VITE_FB_PROJECT_ID=your_project_id
VITE_FB_STORAGE_BUCKET=your_storage_bucket
VITE_FB_MESSAGE_SENDER_ID=your_message_sender_id
VITE_FB_APP_ID=your_app_id
VITE_FB_MEASURE_ID=your_measurement_id
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
```

7. Open your browser and navigate to `http://localhost:5173`

## 💡 How to Use

1. Sign in with your Google account
2. Click on any date in the calendar
3. Select the clothes you wore that day
4. Choose how you felt wearing them
5. Save and view your outfit history!

## 🛠️ Built With

- React + TypeScript
- Vite
- Firebase (Authentication & Firestore)
- FullCalendar
- TailwindCSS
