const { getDefaultConfig } = require('@expo/metro-config'); // Omit if not using Expo

const config = getDefaultConfig(__dirname); // Omit if not using Expo

// Add 'mjs' to the source extensions list
config.resolver.sourceExts.push('mjs');

module.exports = config;
