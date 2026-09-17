import Toast from 'react-native-toast-message';

// Vos configurations d'erreurs
type ERROR_MESSAGE = {
  keyword: string;
  message: string;
};

/**
 * Handle API errors and display Toast
 * @param {string} apiMessage - Le message d'erreur renvoyé par l'API (ex: response.message)
 * @param {Array} errorRules - Liste des mots-clés et messages associés
 * @param {string} defaultTitle - Le titre principal du Toast (ex: 'Registration failed')
 */
export const handleApiError = (
  apiMessage: string,
  errorRules: ERROR_MESSAGE[] = [],
  defaultTitle: string = 'Error',
) => {
  // Recherche si le message contient l'un des mots-clés configurés
  const matchedRule = errorRules.find((rule) =>
    apiMessage?.includes(rule.keyword),
  );

  // Utilise le message personnalisé s'il existe, sinon le message brut de l'API
  const finalMessage = matchedRule ? matchedRule.message : apiMessage;

  Toast.show({
    type: 'error',
    text1: defaultTitle,
    text2: finalMessage || 'An unknown error occurred',
  });
};
