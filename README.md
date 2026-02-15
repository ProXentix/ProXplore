# Proxplore Mobile App

Proxplore is a modern, feature-rich mobile application built with **React Native** and **Expo**. It provides a seamless user experience for exploring, searching, and managing personal content, utilizing **NativeWind** for beautiful, responsive styling.

## 🚀 Features

-   **Intuitive Navigation**: Custom Bottom Tab Navigation with a central floating "Scan" button.
-   **Explore & Search**: Advanced search capabilities with personalization options.
-   **QR/Barcode Scanning**: Integrated camera functionality for scanning.
-   **Personal Dashboard**: Profile management, saved items, and settings.
-   **Rich UI/UX**: Smooth animations and a polished design system using Tailwind CSS (NativeWind).
-   **Additional Utilities**:
    -   Weather updates
    -   Notifications system
    -   Multi-language support
    -   Help & Support section
    -   Image expansion/viewing

## 🛠 Tech Stack

-   **Core**: [React Native](https://reactnative.dev/), [Expo](https://expo.dev/)
-   **Language**: JavaScript (ES6+)
-   **Styling**: [NativeWind (Tailwind CSS)](https://www.nativewind.dev/)
-   **Navigation**: [React Navigation](https://reactnavigation.org/) (Stack & Bottom Tabs)
-   **Icons**: [Lucide React Native](https://lucide.dev/), [Expo Vector Icons](https://icons.expo.fyi/)
-   **Device Features**: Expo Camera, Expo Haptics, Expo Secure Store, Expo Local Authentication

## 📱 Screenshots

*(Add screenshots of your app here)*

## 📦 Installation & Setup

Follow these steps to set up the project locally:

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   **Expo Go** app on your iOS/Android device (for testing)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/proxplore.git
    cd proxplore
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on Usage:**
    -   **Android:** Scan the QR code with the Expo Go app.
    -   **iOS:** Scan the QR code with the Camera app (requires Expo Go).
    -   **Emulator:** Press `a` for Android Emulator or `i` for iOS Simulator.

## 📂 Project Structure

```
Proxplore/
├── assets/             # Images and static assets
├── components/         # Reusable UI components
├── screens/            # Application screens (Home, Profile, Scan, etc.)
├── App.js              # Main application entry point
├── app.json            # Expo configuration
├── babel.config.js     # Babel configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
