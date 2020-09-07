/**
 * This is a custom logger which is better for Metro's console log on Windows.
 */
const logger = store => next => action => {
  console.log('ACTION: ' + JSON.stringify(action));
  let result = next(action);

  const state = store.getState();
  const modifiedState = {
    ...state,
    multilanguage: {
      currentLanguageCode: state.multilanguage.currentLanguageCode,
      languages: '...',
    },
  };
  console.log('STATE:' + JSON.stringify(modifiedState));
  console.log(' ');
  console.log(' ');
  return result;
};

export default logger;
