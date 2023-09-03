// app/providers.tsx
"use client";

import ChakraTheme from "@/lib/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={ChakraTheme.initialColorMode} />
      <ChakraProvider resetCSS theme={ChakraTheme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
