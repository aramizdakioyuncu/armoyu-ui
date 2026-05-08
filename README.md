# 🎨 ARMOYU UI Component Library

[![NPM Version](https://img.shields.io/npm/v/@armoyu/ui?style=flat-square&color=pink)](https://www.npmjs.com/package/@armoyu/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**ARMOYU UI** is a premium React component library designed for the ARMOYU ecosystem. It provides high-quality, themeable, and ready-to-use components integrated with the `@armoyu/core` SDK.

---

## ✨ Features

- **💎 Premium Design**: Modern, glassmorphic, and highly interactive UI elements.
- **🔌 SDK Integrated**: Native support for `@armoyu/core` services.
- **🛠️ Fully Configurable**: Built-in support for Proxy modes, Mock data, and custom themes.
- **📱 Responsive**: Mobile-first design for all community features (Chat, Social, Profiles).

---

## 📦 Installation

```bash
npm install @armoyu/ui @armoyu/core
```

---

## 🚀 Quick Start

Wrap your application with the `ArmoyuProvider` (usually in `Providers.tsx` or `layout.tsx`).

```tsx
import { ARMOYUCore } from "@armoyu/core";
import { ArmoyuUI, ArmoyuProvider } from "@armoyu/ui";

const api = ARMOYUCore.initForProxy("/api/proxy");
const ui = new ArmoyuUI(api);

export function AppProviders({ children }) {
  return (
    <ArmoyuProvider ui={ui}>
      {children}
    </ArmoyuProvider>
  );
}
```

---

## 🛠️ Components Included

- **Social**: `PostCard`, `Stories`, `NewMembersWidget`, `TrendingWidget`
- **Identity**: `AuthModal` (Login/Register), `UserProfileHeader`
- **Communication**: `ChatWidget`, `SocketProvider`
- **Commerce**: `CartProvider`, `ProductCard`
- **Core**: `ThemeProvider`, `LayoutProvider`, `DevTools`

---

## 📄 License

MIT © [ARMOYU](https://armoyu.com)
